import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from "redux/features/reservation/reservationSlice";
import { SwipeableDrawer } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import SearchBox from 'components/common/search/SearchBox';
import PatientInfoListItem from './PatientInfoListItem';
import ReservationInfoListContainer from './ReservationInfoListContainer';

const SearchReservation = ({
  searchOpened,
  setSearchOpened,
}) => {
  const page = useSelector((state) => state.reservation.pageStatus);
  const patinetReservationInfo = useSelector(
    (state) => state.reservation.reservationInfo,
  );
  const [searchResults, setResult] = useState([]);
  const [readOpened, setReadOpened] = useState(false);
  const [readPatient, setReadPatient] = useState();
  

  const dispatch = useDispatch();

  const { breakpoint } = useWindowSize();
  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setSearchOpened(open);
  };

  const handleChangeCloseClick = () => {
    setSearchOpened(false);
    setReadOpened(false);
    setResult([]);
  }

  useEffect(() => {
    setResult([]);
  }, [readOpened]);



  const setSearchVal = (inputVal) => {
    console.log("keyword", inputVal);
    const result = patinetReservationInfo.filter((info) => {
      if(info.title === inputVal){
        return true;
      }
      return false;
    })
    setResult(result);
    setReadOpened(false);
  }

  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={searchOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <ResponsiveContainer breakpoint={breakpoint}>
          <DrawerHeader breakpoint={breakpoint}>
            <h1>예약 환자 검색</h1>
            <div>
              <AiOutlineClose
                size={32}
                onClick={handleChangeCloseClick}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </DrawerHeader>
          <SearchBox
            setSearchVal={setSearchVal}
            placeholder="환자 이름을 입력해주세요."
          />
          <div style={{ marginTop: '2em' }}>
            {readOpened === false ? (
              <PatientInfoListItem
                searchResults={searchResults}
                setReadOpened={setReadOpened}
                setReadPatient={setReadPatient}
              />
            ) : (
              <ReservationInfoListContainer
                setReadOpened={setReadOpened}
                readPatient={readPatient}
              />
            )}
          </div>
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default SearchReservation;