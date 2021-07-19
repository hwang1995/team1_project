import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { SwipeableDrawer, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import {
  addMedicineInfo,
  removeMedicineInfo,
  setMedicineDrawer,
} from 'redux/features/diagnosis/diagnosisSlice';
import SearchItem from '../container/SearchItem';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import SearchBox from 'components/common/search/SearchBox';
import MedicineItem from '../container/MedicineItem';
import StyledTypography from 'components/common/typography/StyledTypography';
import { searchMedicineList } from 'apis/searchAPI';
import HashSpinner from 'components/common/spinner/HashSpinner';

const MedicineDrawer = () => {
  const { breakpoint } = useWindowSize();
  const [searchVal, setSearchVal] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const medicineInfo = useSelector((state) => state.diagnosis.medicineInfo);
  const isOpened = useSelector(
    (state) => state.diagnosis.drawerStatus.medicine,
  );

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    dispatch(setMedicineDrawer(open));
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
    async function getMedicineList(searchVal) {
      try {
        const result = await searchMedicineList(searchVal);
        setSearchData(result);

        setLoading(true);
      } catch (error) {
        const { message } = error.response.data;

        handleAlert('error', message);
        setLoading(true);
      }
    }
    getMedicineList(searchVal);

    // 임시로 딜레이 부여

    console.log('검색 창에서 searchVal이 변경되었습니다', searchVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal]);

  const addMedicine = useCallback(
    (data) => {
      dispatch(addMedicineInfo(data));
    },
    [dispatch],
  );

  const removeMedicine = useCallback(
    (data) => {
      dispatch(removeMedicineInfo(data));
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
            <h1>약 처방 하기</h1>
            <div>
              <AiOutlineClose
                size={32}
                onClick={() => dispatch(setMedicineDrawer(false))}
              />
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
                  placeholder="약 이름을 입력해주세요"
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
                        <SearchItem data={data} addMedicine={addMedicine} />
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
                {medicineInfo.length === 0 && (
                  <Fragment>
                    <StyledTypography variant="h5" component="h5" weight={7}>
                      여기에는 추가된 약 목록들이 나타납니다.
                    </StyledTypography>
                  </Fragment>
                )}
                {medicineInfo.length !== 0 &&
                  medicineInfo.map((data, index) => (
                    <Fragment key={index + 'medicine'}>
                      <Divider />
                      <MedicineItem
                        data={data}
                        removeMedicine={removeMedicine}
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

export default MedicineDrawer;
