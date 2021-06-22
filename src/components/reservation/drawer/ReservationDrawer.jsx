import React, { Fragment, useEffect, useState } from 'react';
import { SwipeableDrawer, Grid } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import SearchBox from 'components/common/search/SearchBox';
import ReservationInfoContainer from './ReservationInfoContainer';
import ReservationPatientListContainer from "./ReservationPatientListContainer"
const ReservationDrawer = ({
  isOpened,
  setOpened,
  reservationTime,
  doctorInfo,
}) => {
  const { breakpoint } = useWindowSize();
  const [searchVal, setSearchVal] = useState('');
  const [page, setPage] = useState('INFO');
    const [patientInfo, setPatient] = useState({
      patient_id: '',
      patient_name: '',
      patient_gender: '',
      patient_birth: '',
    });

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpened(open);
  };

  const closeClick = () => {
    setPage("INFO");
  }

  useEffect(() => {

    if (searchVal !== '') {
     
      console.log("검색", page)
    }else{
       console.log('검색 no');
    }

  }, [searchVal]);

   useEffect(() => {
     setPatient({
       patient_id: '',
       patient_name: '',
       patient_gender: '',
       patient_birth: '',
     });
     setPage("INFO")
   }, [isOpened]);

   useEffect(() => {
     console.log("page : ", page);
   }, [])

   useEffect(() => {
     console.log('searchVal', searchVal);
     if (searchVal !== '') {
       setPage('SEARCH_INFO');
     } else {
       setPage('INFO');
     }
   }, [searchVal]);


  const setPatientInfo = (patient) => {
    setPatient({
      patient_id: patient.patient_id,
      patient_name: patient.patient_name,
      patient_gender: patient.patient_gender,
      patient_birth: patient.patient_birth,
    });
  };


  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={isOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <ResponsiveContainer breakpoint={breakpoint}>
          <DrawerHeader breakpoint={breakpoint}>
            <h1>진료 접수</h1>
            <div>
              <AiOutlineClose
                size={32}
                onClick={() => setOpened(false)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </DrawerHeader>

          <SearchBox
            setSearchVal={setSearchVal}
            placeholder="환자 이름을 입력해주세요."
          />

          {page === 'INFO' ? (
            <ReservationInfoContainer
              reservationTime={reservationTime}
              doctorInfo={doctorInfo}
              patientInfo={patientInfo}
            />
          ) : (
            <ReservationPatientListContainer
              closeClick={closeClick}
              searchVal={searchVal}
              setPatientInfo={setPatientInfo}
              setSearchVal={setSearchVal}
            />
          )}
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default ReservationDrawer;
