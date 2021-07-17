import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePage, chaneInputVal } from "redux/features/reservation/reservationSlice";
import { SwipeableDrawer } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import SearchBox from 'components/common/search/SearchBox';
import ReservationInfoContainer from './ReservationInfoContainer';
import ReservationPatientListContainer from "./ReservationPatientListContainer"

/*
예약환자를 추가하는 컴포넌트이다
isOpened : 해당 컴포넌트를 여는 상태 데이터이다
setOpened : 해당 컴포넌트를 여는 상태 데이터에 대한 함수이다.
reservationTime : 년월일, 예약 시작시간과 마감시간 관한 데이터이다.
doctorInfo: 의사에 관한 데이터이다
*/
/*
검색
1) changePage -> (데이터 입력 컴포넌트 -> 검색리스트 보여주는 컴포넌트로 변경)
2) checkChange -> (검색어 입력창 -> 이미지(추가하시겠습니까?)뷰로 변경)
3) patientInfoSetting -> patientInfo 상태 데이터에 데이터 추가
4) keywordSetting -> 환자 검색에 입력한 키워드
*/
const ReservationDrawer = ({
  isOpened,
  setOpened,
  setClosed,
  reservationTime,
  doctorInfo,
  registerPageResult,
  setAddDisplay
}, props) => {
  /*
  컴포넌트 변경 부분이다. 완료버튼을 누르면 다시 한번 확인하는 화면이 나타난다
  검색: changePage
  */
  const page = useSelector((state) => state.reservation.pageStatus);
  const dispatch = useDispatch();

  const { breakpoint } = useWindowSize();

  

  /*
  환자의 정보를 세팅하는 상태 데이터
  검색: patientInfoSetting
  */
  const [patientInfo, setPatient] = useState({
    patient_id: '',
    patient_name: '',
    patient_gender: '',
    patient_birth: '',
  });
 
  /*
    false: 검색어 (SearchBox) true: 해당내용이 맞습니까? 상태에 따라 컴포넌트 구성도가 달라짐
    검색: checkChange
  */
  const [checkChange, setCheckChange] = useState(false);
 
  // drawer 오픈에 관한 메소드
  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    if (!open) {
      dispatch(changePage('INFO'));
    }
    setClosed(true);
    setOpened(open);
  };

  /*
    x 버튼 클릭시 drawer가 닫힌다
    dispatch를 통해 changePage에 INFO 문자를 세팅
    page가 info일 때는 진료예약 버튼 아닐떄는 (이전으로 돌아가기 + 진료예약 버튼)으로 구성되어 있는 컴포넌트가 세팅
    
    검색: changePage
  */
  const handleChangeCloseClick = () => {
    setOpened(false);
    setClosed(true);
    dispatch(changePage('INFO'));
  };

  /*
    해당 Drawer(ReservationDrawer)가 열거나 닫게되면 (상태데이터가 바뀌면)
    checkChange 값을 원상태(false)로 바꿔준다.
    patientInfo 값도 초기화 시켜준다.
    --> 닫고 열었을 때, 전 상태값을 초기화 시키고 새로운 값을 얻기 위해

    검색: patientInfoSetting, checkChange
  */
  useEffect(() => {
    setCheckChange(false);
    setPatient({
      patient_id: '',
      patient_name: '',
      patient_gender: '',
      patient_birth: '',
    });
  }, [isOpened]);

  /*
    환자의 정보를 가져오기 위한 함수
    환자 이름을 검색 한 후, 검색을 통해 나온 환자데이터를 
    patientInfo에 세팅 시켜 준다.

    검색: patientInfoSetting
  */
  const setPatientInfo = (patient) => {
    const [year, month, date ] = patient.patientBirth;
     setPatient({
      patientId: patient.patientId,
      patientName: patient.patientName,
      patientGender: patient.patientGender,
      patientBirth: patient.patientBirth,
      patientBirthContent: year+"년 " + month+"월 " + date +"일"
    });
  };

  /*
    SearchBox에 입력된 검색어를 갖고오는 함수
    redux에 dispatch를 이용하여 검색어값을 세팅한다
    세팅된 검색어는 ReservationPatientListContainer에서 사용한다
    SEARCH_INFO를 세팅하므로써 
    ReservationInfoContainer -> ReservationPatientListContainer 컴포넌트로 바꿀수 있도록 한다.

    검색: keywordSetting, changePage
  */
  const setSearchVal = async(inputVal) => {
    dispatch(changePage('SEARCH_INFO'));
    dispatch(chaneInputVal(inputVal));
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
                // 검색: changePage
                onClick={handleChangeCloseClick}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </DrawerHeader>
          {checkChange === false ? (
            // 검색: keywordSetting
            <SearchBox
              setSearchVal={setSearchVal}
              placeholder="환자 이름을 입력해주세요."
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 2 }}>
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
                  marginLeft: '1em',
                }}
              >
                <div style={{ fontWeight: 'bold' }}>
                  <h1>접수 내용이 </h1>
                  <h1>다음과 같습니까? </h1>
                </div>
              </div>
            </div>
          )}
          {/* changePage */}
          {page === 'INFO' && (
            //예약정보를 세팅하는 컴포넌트
            <ReservationInfoContainer
              reservationTime={reservationTime}
              doctorInfo={doctorInfo}
              patientInfo={patientInfo}
              setOpened={setOpened}
              setCheckChange={setCheckChange}
              setClosed={setClosed}
              setAddDisplay={setAddDisplay}
            />
          ) }
          {page === 'SEARCH_INFO' && (
            // 환자 정보를 검색하는 컴포넌트 (검색: patientInfoSetting)
          
            <ReservationPatientListContainer setPatientInfo={setPatientInfo} registerPageResult={registerPageResult}/> 
            
          )}
          


        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default ReservationDrawer;
