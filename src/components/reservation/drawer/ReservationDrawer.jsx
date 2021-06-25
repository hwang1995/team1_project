import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePage, chaneInputVal } from "redux/features/reservation/reservationSlice";
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

  const page = useSelector((state) => state.reservation.pageStatus);
  const dispatch = useDispatch();

  const { breakpoint } = useWindowSize();
    const [patientInfo, setPatient] = useState({
      patient_id: '',
      patient_name: '',
      patient_gender: '',
      patient_birth: '',
    });

  const [checkChange, setCheckChange] = useState(false);

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpened(open);
  };

  const handleChangeCloseClick = () => {
    setOpened(false);
    dispatch(changePage('INFO'));
  }


   useEffect(() => {
     setPatient({
       patient_id: '',
       patient_name: '',
       patient_gender: '',
       patient_birth: '',
     });
     //setPage("INFO")
   }, [isOpened]);

  const setPatientInfo = (patient) => {
    setPatient({
      patient_id: patient.patient_id,
      patient_name: patient.patient_name,
      patient_gender: patient.patient_gender,
      patient_birth: patient.patient_birth,
    });
  };

  const setSearchVal = (inputVal) => {
    dispatch(changePage("SEARCH_INFO"));
    dispatch(chaneInputVal(inputVal));
  }


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
                onClick={handleChangeCloseClick}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </DrawerHeader>
          {checkChange === false ? (
            <SearchBox
              setSearchVal={setSearchVal}
              placeholder="환자 이름을 입력해주세요."
            />
          ) : (
            <div style={{ display: 'flex', alignItems: "center" }}>
              <div style={{ flex: 2, }}>
                <img
                  src="/assets/image/question.jpeg"
                  width="100%"
                  alt="confirmPicture"
                />
              </div>
              <div
                style={{
                  flex: 3,
                  alignItems: 'center',
                  marginLeft:"1em"
                }}
              >
                <div style={{fontWeight:"bold"}}>
                  <h1>접수 내용이 </h1>
                  <h1>다음과 같습니까? </h1>
                </div>
              </div>
            </div>
          )}

          {page === 'INFO' ? (
            <ReservationInfoContainer
              reservationTime={reservationTime}
              doctorInfo={doctorInfo}
              patientInfo={patientInfo}
              setOpened={setOpened}
              setCheckChange={setCheckChange}
            />
          ) : (
            <ReservationPatientListContainer setPatientInfo={setPatientInfo} />
          )}
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default ReservationDrawer;
