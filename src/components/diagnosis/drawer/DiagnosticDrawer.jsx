import React, { Fragment, useEffect, useState } from 'react';
import { SwipeableDrawer, Grid, Divider, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import { setDiagnosticDrawer } from 'redux/features/diagnosis/diagnosisSlice';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import SearchBox from 'components/common/search/SearchBox';
import StyledTypography from 'components/common/typography/StyledTypography';

import DiagnosticItem from '../container/DiagnosticItem';
import { searchDiagnosticList } from 'apis/searchAPI';
import HashSpinner from 'components/common/spinner/HashSpinner';

/**
 * * 목표 : 진단 검사 Drawer 컴포넌트
 * @returns {JSX.Element} view
 * @author SUNG WOOK HWANG
 */
const DiagnosticDrawer = () => {
  // 해상도 Breakpoint를 가져오기 위한 Custom Hook
  const { breakpoint } = useWindowSize();

  // 검색어를 저장하기 위한 상태
  const [searchVal, setSearchVal] = useState('');

  // Spinner를 띄울지 결정하는 상태
  const [isLoading, setLoading] = useState(false);

  // 검색 결과 저장하기 위한 상태
  const [searchData, setSearchData] = useState([]);
  const dispatch = useDispatch();

  // 진단 검사 Drawer의 상태
  const isOpened = useSelector(
    (state) => state.diagnosis.drawerStatus.diagnostic,
  );

  // 진단 검사의 상태
  const diagnosticInfo = useSelector((state) => state.diagnosis.diagnosticInfo);

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    dispatch(setDiagnosticDrawer(open));
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  useEffect(() => {
    if (searchVal === '') {
      return;
    }
    setLoading(false);

    // 진단 검사를 가져오기 위한 함수
    async function getDiagnosticList(searchVal) {
      try {
        const result = await searchDiagnosticList(searchVal);
        setSearchData(result);
        setLoading(true);
      } catch (error) {
        const { message } = error.response.data;
        handleAlert('error', message);
        setLoading(true);
      }
    }
    getDiagnosticList(searchVal);

    console.log('검색 창에서 searchVal의 값이 변경되었습니다.', searchVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal, dispatch]);

  const { REACT_APP_BUCKET_PATH } = process.env;
  const IMAGE_PATH = '/assets/image/';
  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={isOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <ResponsiveContainer>
          <DrawerHeader breakpoint={breakpoint} style={{ padding: '0.5rem' }}>
            <h1>진단 검사 추가하기</h1>
            <div>
              <IconButton>
                <AiOutlineClose
                  size={32}
                  onClick={() => dispatch(setDiagnosticDrawer(false))}
                />
              </IconButton>
            </div>
          </DrawerHeader>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} style={{ padding: '1rem' }}>
              <div
                style={{
                  border: '1px solid rgba(0,0,0,0.12)',
                  padding: '1rem',
                }}
              >
                <SearchBox
                  setSearchVal={setSearchVal}
                  placeholder="진단 검사 그룹 명을 입력해주세요."
                  noRemove
                />
                {searchVal === '' && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <img
                      src={
                        REACT_APP_BUCKET_PATH + IMAGE_PATH + 'searchInfo.png'
                      }
                      width="100%"
                      alt="search"
                    />
                    <StyledTypography variant="h4" component="h5" weight={9}>
                      먼저 검색을 해주세요!
                    </StyledTypography>
                  </div>
                )}

                {searchVal !== '' && !isLoading && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100vh',
                    }}
                  >
                    <HashSpinner />
                  </div>
                )}

                {searchVal !== '' && isLoading && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginTop: '1rem',
                      width: '100%',
                      height: '70vh',
                      overflowY: 'scroll',
                    }}
                  >
                    <Divider />
                    {searchData.map((data) => (
                      <Fragment key={data.diagInspectionId}>
                        <Divider />
                        <DiagnosticItem data={data} />
                        {/* <SearchItem data={data} addMedicine={addMedicine} /> */}
                      </Fragment>
                    ))}
                  </div>
                )}
              </div>
            </Grid>

            <Grid item xs={12} sm={6} style={{ padding: '1rem' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '80vh',
                  overflowY: 'scroll',
                  border: '1px solid rgba(0,0,0,0.12)',
                  padding: '1rem',
                }}
              >
                {diagnosticInfo.length === 0 && (
                  <Fragment>
                    <StyledTypography variant="h5" component="h5" weight={9}>
                      여기에는 추가된 진단 검사 목록이 나타납니다.
                    </StyledTypography>
                  </Fragment>
                )}
                {diagnosticInfo.length !== 0 &&
                  diagnosticInfo.map((data, index) => (
                    <Fragment key={index + 'diagnostic'}>
                      <Divider />
                      <DiagnosticItem data={data} isRemove />
                    </Fragment>
                  ))}
              </div>
            </Grid>
          </Grid>
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default DiagnosticDrawer;
