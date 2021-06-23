import React, { Fragment, useEffect, useState } from 'react';
import { SwipeableDrawer, Grid, Divider, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import {
  setDiagnosticDrawer,
  addDiagnosticGroupItem,
  setSearchDiagnosticInfo,
} from 'redux/features/diagnosis/diagnosisSlice';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import SearchBox from 'components/common/search/SearchBox';
import diagnosticData from 'pages/dashboard/diagnosis/csvjson.json';
import StyledTypography from 'components/common/typography/StyledTypography';
import Spinner from 'components/common/spinner/Spinner';
import DiagnosticItem from '../container/DiagnosticItem';
const DiagnosticDrawer = () => {
  const { breakpoint } = useWindowSize();
  const [searchVal, setSearchVal] = useState('');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isOpened = useSelector(
    (state) => state.diagnosis.drawerStatus.diagnostic,
  );

  const diagnosticInfo = useSelector((state) => state.diagnosis.diagnosticInfo);

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    dispatch(setDiagnosticDrawer(open));
  };

  useEffect(() => {
    if (searchVal === '') {
      return;
    }
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
      const filteredData = diagnosticData.filter(({ bundle_name }) => {
        return bundle_name.includes(searchVal);
      });
      dispatch(setSearchDiagnosticInfo(filteredData));
    }, 1000);
    console.log('검색 창에서 searchVal의 값이 변경되었습니다.', searchVal);
  }, [searchVal, dispatch]);

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
                      src="/assets/image/searchinfo.png"
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
                    <Spinner />
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
                    {diagnosticData
                      .filter(({ bundle_name }) =>
                        bundle_name.includes(searchVal),
                      )
                      .map((data) => (
                        <Fragment key={data.diag_inspection_id}>
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
                      [임시] 여기에는 추가된 진단 검사 목록이 나타납니다.
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
