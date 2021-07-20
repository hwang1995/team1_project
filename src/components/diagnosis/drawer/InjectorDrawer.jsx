import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { SwipeableDrawer, Grid, Divider, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import {
  addInjectorInfo,
  removeInjectorInfo,
  setInjectorDrawer,
} from 'redux/features/diagnosis/diagnosisSlice';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import SearchBox from 'components/common/search/SearchBox';
import StyledTypography from 'components/common/typography/StyledTypography';
import SearchItem from '../container/SearchItem';
import MedicineItem from '../container/MedicineItem';
import { searchInjectorList } from 'apis/searchAPI';
import HashSpinner from 'components/common/spinner/HashSpinner';

/**
 * * 기능 : 진료 등록에서 의사가 진료를 진행시에 주사약을 추가할 때 보여줄 템플릿 컴포넌트
 * @returns {JSX.Element} view
 * @author SUNG WOOK HWANG
 */
const InjectorDrawer = () => {
  // 해상도의 breakpoint를 알기 위한 Custom Hook
  const { breakpoint } = useWindowSize();

  // 검색어의 상태 저장
  const [searchVal, setSearchVal] = useState('');

  // 검색 결과를 저장하기 위한 상태
  const [searchData, setSearchData] = useState([]);

  // Ajax시 Spinner를 보여주기 위한 상태
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Redux store에 저장되어 있는 주사약 정보 (추가 시에 저장하여 진료를 서버에 보낼 시에 사용할 정보)
  const injectorInfo = useSelector((state) => state.diagnosis.injectorInfo);
  const isOpened = useSelector(
    (state) => state.diagnosis.drawerStatus.injector,
  );

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    dispatch(setInjectorDrawer(open));
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  // 검색어가 바뀌는 effect 발동 시에 약품의 정보를 가져오기 위한 side-effect
  useEffect(() => {
    if (searchVal === '') {
      return;
    }
    setLoading(false);
    async function getMedicineList(searchVal) {
      try {
        const result = await searchInjectorList(searchVal);
        setSearchData(result);
        setLoading(true);
      } catch (error) {
        const { message } = error.response.data;
        handleAlert('error', message);
        setLoading(true);
      }
    }
    getMedicineList(searchVal);

    setTimeout(() => {
      setLoading(true);
    }, 1000);
    console.log('검색 창에서 searchVal이 변경되었습니다', searchVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal]);

  const addInjector = useCallback(
    (data) => {
      dispatch(addInjectorInfo(data));
    },
    [dispatch],
  );

  const removeInjector = useCallback(
    (data) => {
      dispatch(removeInjectorInfo(data));
    },
    [dispatch],
  );

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
            <h1>주사 처방 하기</h1>
            <div>
              <IconButton>
                <AiOutlineClose
                  size={32}
                  onClick={() => dispatch(setInjectorDrawer(false))}
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
                  placeholder="주사 이름을 입력해주세요"
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
                        REACT_APP_BUCKET_PATH + IMAGE_PATH + 'searchinfo.png'
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
                      <Fragment key={data.medicineName}>
                        <Divider />
                        <SearchItem data={data} addMedicine={addInjector} />
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
                {injectorInfo.length === 0 && (
                  <Fragment>
                    <StyledTypography variant="h5" component="h5" weight={9}>
                      여기에는 추가된 주사 목록들이 나타납니다.
                    </StyledTypography>
                  </Fragment>
                )}

                {injectorInfo.length !== 0 &&
                  injectorInfo.map((data, index) => (
                    <Fragment key={index + 'injector'}>
                      <Divider />
                      <MedicineItem
                        data={data}
                        removeMedicine={removeInjector}
                      />
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

export default InjectorDrawer;
