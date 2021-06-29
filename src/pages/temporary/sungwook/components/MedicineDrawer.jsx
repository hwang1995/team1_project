import React, { Fragment, useEffect, useState, useCallback } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Container from '@material-ui/core/Container';
import { AiOutlineClose } from 'react-icons/ai';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import MedicineItem from '../../../../components/diagnosis/container/MedicineItem';
import useWindowSize from '../../../../hooks/useWindowSize';
import DrawerHeader from '../../../../components/common/drawer/DrawerHeader';
import SearchBox from '../../../../components/common/search/SearchBox';
import Spinner from '../../../../components/common/spinner/Spinner';
import SearchItem from '../../../../components/diagnosis/container/SearchItem';
import MedicineData from '../medicine.json';
import ClrButton from 'components/diagnosis/container/ClrButton';

const MedicineDrawer = ({ isOpened, setOpened, setMedData }) => {
  const { breakpoint } = useWindowSize();
  const [searchVal, setSearchVal] = useState('');
  const [selectedMed, setSelectedMed] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (breakpoint === undefined) {
      return;
    }
    console.log('current width is', breakpoint);
  }, [breakpoint]);

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

  useEffect(() => {
    if (selectedMed === []) {
      return;
    }
    console.log('add', selectedMed);
  }, [selectedMed]);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpened(open);
    // setLoading(false);
    // setSearchVal('');
    // setSelectedMed([]);
  };

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
        <Container maxWidth="md">
          <DrawerHeader breakpoint={breakpoint}>
            <h1>약 처방하기</h1>
            <div>
              <AiOutlineClose size={32} onClick={() => setOpened(false)} />
            </div>
          </DrawerHeader>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <SearchBox
                setSearchVal={setSearchVal}
                placeholder="약 이름을 입력해주세요."
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
                    height: '90vh',
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
            <Grid item xs={12} sm={6}>
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
        </Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: '1rem',
          }}
        >
          <ClrButton
            setcolor="aliceblue"
            onClick={() => passStateToContainer(selectedMed)}
          >
            추가
          </ClrButton>
        </div>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default MedicineDrawer;
