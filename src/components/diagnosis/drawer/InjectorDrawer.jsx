import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { SwipeableDrawer, Grid, Divider, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
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
import Spinner from 'components/common/spinner/Spinner';
import SearchItem from '../container/SearchItem';
import injectorData from 'pages/dashboard/diagnosis/injector.json';
import MedicineItem from '../container/MedicineItem';

const InjectorDrawer = () => {
  const { breakpoint } = useWindowSize();
  const [searchVal, setSearchVal] = useState('');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (searchVal === '') {
      return;
    }
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
    console.log('검색 창에서 searchVal이 변경되었습니다', searchVal);
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
                    {injectorData
                      .filter(({ medicine_name }) =>
                        medicine_name.includes(searchVal),
                      )
                      .map((data) => (
                        <Fragment key={data.medicine_name}>
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
