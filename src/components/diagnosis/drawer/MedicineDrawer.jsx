import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { SwipeableDrawer, Grid, Divider } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import SearchItem from '../container/SearchItem';
import MedicineData from '../../../pages/dashboard/diagnosis/medicine';
import useWindowSize from 'hooks/useWindowSize';
import Spinner from 'components/common/spinner/Spinner';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import SearchBox from 'components/common/search/SearchBox';
import MedicineItem from '../container/MedicineItem';

const MedicineDrawer = ({ isOpened, setOpened, setMedData }) => {
  const { breakpoint } = useWindowSize();
  const [searchVal, setSearchVal] = useState('');
  const [selectedMed, setSelectedMed] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpened(open);
  };

  useEffect(() => {
    if (searchVal === '') {
      return;
    }

    setLoading(false);
    // 임시로 딜레이 부여
    setTimeout(() => {
      setLoading(true);
    }, 1000);

    console.log('검색 창에서 searchVal이 변경되었습니다', searchVal);
  }, [searchVal]);

  const addMedicine = useCallback((data) => {
    const findItem = (element) => {
      if (element.medicine_id === data.medicine_id) {
        return true;
      }
    };

    setSelectedMed((prevState) => {
      const newState = prevState;
      // 중복 체크
      const isDuplicatedItem = newState.find(findItem);

      if (isDuplicatedItem) {
        return prevState;
      } else {
        return [...newState, data];
      }
    });
  }, []);

  const removeMedicine = useCallback((data) => {
    setSelectedMed((prevState) => {
      const newState = prevState.filter((dataInfo) => {
        if (dataInfo.medicine_id === data.medicine_id) {
          return false;
        }
        return true;
      });
      return newState;
    });
  }, []);

  const passStateToContainer = useCallback(
    (medInfo) => {
      setMedData(medInfo);
      setOpened(false);
      // console.log(medInfo);
    },
    [setMedData, setOpened],
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
          <DrawerHeader breakpoint={breakpoint}>
            <h1>약 처방 하기</h1>
            <div>
              <AiOutlineClose size={32} onClick={() => setOpened(false)} />
            </div>
          </DrawerHeader>

          <Grid container>
            <Grid item xs={12} sm={6} style={{ padding: '1rem' }}>
              <SearchBox
                setSearchVal={setSearchVal}
                placeholder="약 이름을 입력해주세요"
              />
              {searchVal === '' && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src="/assets/image/searchinfo.png"
                    width="70%"
                    alt="search"
                  />
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
                  {MedicineData.filter(({ medicine_name }) =>
                    medicine_name.includes(searchVal),
                  ).map((data) => (
                    <Fragment key={data.medicine_name}>
                      <Divider />
                      <SearchItem data={data} addMedicine={addMedicine} />
                    </Fragment>
                  ))}
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={6} style={{ padding: '1rem' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '1rem',
                  height: '90vh',
                  overflowY: 'scroll',
                }}
              >
                {selectedMed.map((data) => (
                  <Fragment>
                    <Divider />
                    <MedicineItem data={data} removeMedicine={removeMedicine} />
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
