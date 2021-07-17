import React, { useState, useRef, useEffect } from 'react';
import { getDoctorInfo, getReservationInfo } from 'apis/reservationAPI';
import { useSelector } from 'react-redux';
import {
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RiUserSearchFill } from 'react-icons/ri';
//import useWindowSize from 'hooks/useWindowSize';

// Toast UI Calendar Library & monent.js
import Calendar from '@toast-ui/react-calendar';
import moment from 'moment';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

// Custom Components by Team1
import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';
import ReservationDrawer from 'components/reservation/drawer/Insert/ReservationDrawer';
import ReservationReadDrawer from 'components/reservation/drawer/read/ReservationReadDrawer';
import SearchReservation from 'components/reservation/drawer/SearchReservation';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';
import PageTransition from 'components/common/transition/PageTransition';
import { useSnackbar } from 'notistack';
import ClockSpinner from 'components/common/spinner/ClockSpinner';




/**
 * 이 페이지 컴포넌트는 진료 에약(접수) 페이지를 작성하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * 진료 예약(접수) - Toast UI Calendar, ReservationDrawer
 * @returns {JSX.Element}
 */
const ReservationPage = () => {
  /*
   검색
   1) callendarDom
   2) Drawer-search
   3) Drawer-add
   4) Drawer-update
   5) selectDoctor
   6) reservationData (예약데이터 추가, 리덕스)
   7) readReservationData (예약데이터 읽기)
  */

  /*
    알림 설정 부분
   */
  const { enqueueSnackbar } = useSnackbar();

  /*
  리덕스에 있는 예약 정보관련 데이터 상태를 갖고 오는 부분
  검색: reservationData
  */

  // const { breakpoint } = useWindowSize();

  /*
  리덕스에 있는 로그인 정보를 가져오는 부분
  */
  const loginInfo = useSelector((state) => state.common.loginInfo);

  /*
  Calendar DOM을 가져오기 위해 설정하는 Ref
  검색: callendarDom
  */
  const calendarRef = useRef();

  /* 
  Calendar DOM을 가져와 Instance를 설정하기 위한 State
  검색: callendarDom
  */
  const [calInstance, setCalInstance] = useState(null);

  // Drawer 여부를 확인하기 위한 State

  // 검색: Drawer-add
  const [isOpened, setOpened] = useState(false);
  const [isClosed, setClosed] = useState(false);
  // 검색: Drawer-update
  const [readOpened, setReadOpened] = useState(false);
  // 검색: Drawer-search
  const [searchOpened, setSearchOpened] = useState(false);

  // clockSpinner
  const [isLoading, setLoading] = useState(true);

  // errorText
  const [errorText, setError] = useState(false);

  const [addDisplay, setAddDisplay] = useState(false);

  /*
  Select ID를 선택하기 위한 State 
  검색: selectDoctor
  */
  const [selectId, setSelectId] = useState('');

  /* 의사 정보를 설정하기 위한 State (select)
  검색: selectDoctor
  */
  const [doctorInfo, setDoctorInfo] = useState({
    member_id: '',
    member_name: '',
    doctor_room: '',
  });
  /*
    resetvationData를 설정하기 위한 State
  */
  const [reservationDataList, setReservationData] = useState([]);

  /*
   의사 정보 리스트를 저장하기 위한 State
  */
  const [doctorListInfo, setDoctorListInfo] = useState([]);

  /*
   예약시간 세팅을 위한 상태 데이터 (onBeforeCreateSchedule)
   검색: reservationData
   */
  const [reservationTime, setReservationTime] = useState({
    date: '',
    startTime: '',
    endTime: '',
    scheduleStart: '',
    scheduleEnd: '',
    weekNum: '',
  });

  /* 
  특정 예약데이터를 읽어 updateDrawer에 넘겨주는 부분
  검색: readReservationData
  */
  const [readPatient, setReadPatient] = useState({});

  /*
    수정, 삭제, 추가, 클릭에 대한 식별 상태
  */
 

  // 캘린더 헤더 부분에 위클리 데이트세팅, 초기값 세팅부분
  const now = new Date();
  const weekNum = moment(now, 'MM-DD-YYYY').week();
  const initStartDate = moment(moment().startOf('week').toDate()).format(
    'YYYY년 MM월 DD일',
  );
  const initEndDate = moment(moment().endOf('week').toDate()).format(
    'YYYY년 MM월 DD일',
  );

  /*
  handlePrevClick과 handleNextClick 클릭시 주단위로
  캘린더가 넘어간다
  넘어갈떄의 시작 날짜와, 끝 날짜를 세팅하는 부분이다
  검색: callendarDom
  */
  const [titleDate, setTitleDate] = useState({
    weekNo: moment(now, 'MM-DD-YYYY').week(),
    startDate: initStartDate,
    endDate: initEndDate,
  });

  

 
  useEffect(() => {
    setCalInstance(calendarRef.current.getInstance());
  }, [calendarRef])

 

 
  /*
  의사에 대한 정보를 불러오기 위해 useEffect 사용
  */

  useEffect(() => {
    const reservationListData = async (memberId) => {
      try {
        const { data } = await getReservationInfo({
          weekNo: weekNum,
          memberId,
          hospitalCode: loginInfo.hospitalCode,
        });
        setReservationData(data.data);
      } catch (error) {
        const { message } = error.response.data;
      }
    };
    const doctorData = async () => {
      try {
        const { data } = await getDoctorInfo(loginInfo.hospitalCode);

        setDoctorInfo({
          memberId: data.data[0].memberId,
          memberName: data.data[0].memberName,
          doctorRoom: data.data[0].doctorRoom,
        });
        setDoctorListInfo(data.data);
        selectOnChange(data.data[0].memberId);
        reservationListData(data.data[0].memberId);
      } catch (error) {
        const { message } = error.response.data;
      } 
    };
 
      doctorData();
     
    
  }, [loginInfo.hospitalCode, weekNum]);
  


  useEffect(() => {
  
      const reservationListData = async () => {
      try {
        const { data } = await getReservationInfo({
          weekNo: titleDate.weekNo,
          memberId: doctorInfo.memberId,
          hospitalCode: loginInfo.hospitalCode,
        });
        setReservationData(data.data);
      } catch (error) {
        const { message } = error.response.data;
      }
    };

    if(addDisplay){
      setLoading(true);
      setAddDisplay(false);
      reservationListData();
    }
  }, [addDisplay,titleDate,doctorInfo, loginInfo])
  
  useEffect(() => {
    if(reservationDataList.length >0 ){
      calInstance.clear();
      calInstance.createSchedules(reservationDataList);
      calInstance.render();
      setLoading(false);
    }
  }, [reservationDataList, calInstance]);





  /*
    reservationInfo -> 리덕스에서 정의한 상태데이터
    값이 변경될 때마다
    select에 있는 의사이름이 변경될 때마다
    calInstance 값이 변경될때 (그리고 null값이 아닐때)
    1) clear()를 통해 캘린더에 있는 데이터들을 삭제한다.
    2) 의사 정보(id)에 해당한 예약 데이터를 가져와 세팅한다
    3) render()를 통해 세팅된 데이터를 화면에 보여준다
    검색: reservationData
  */
 

  /*
  select 부분이다.
  select 안에 있는 메뉴 아이템 부분을 클릭할 때마다
  setDoctorInfo에 데이터들을 세팅한다
  검색: selectDoctor
  */
  const handleMenuItemClick = async (item) => {
    setLoading(true);
    selectOnChange(item.memberId);
    const reservationInfo = async (mId) => {
      const weekNo = Number.parseInt(titleDate.weekNo);
      const memberId = Number.parseInt(mId);
      try {
        const { data } = await getReservationInfo({
          weekNo,
          memberId,
          hospitalCode: loginInfo.hospitalCode,
        });
        setReservationData(data.data);
        
      } catch (error) {
        const { message } = error.response.data;
        setReservationData([]);
        calInstance.clear();
        setLoading(false);
      }
    };
    const data = {
      memberId: item.memberId,
      memberName: item.memberName,
      doctorRoom: item.doctorRoom,
    };
    setDoctorInfo(data);

    reservationInfo(item.memberId);
  };

  // 캘린더 주단위를 넘기기 위한 부분 (+)
  const handlePrevClick = () => {
    setLoading(true);
    calInstance.prev();

    const weekNo = moment(
      calInstance.getDateRangeStart().toDate(),
      'MM-DD-YYYY',
    ).week();
    const startDate = moment(calInstance.getDateRangeStart().toDate()).format(
      'YYYY년 MM월 DD일',
    );
    const endDate = moment(calInstance.getDateRangeEnd().toDate()).format(
      'YYYY년 MM월 DD일',
    );
   
    const reservationInfo = async (mId) => {
      try {
        setTitleDate({ weekNo, startDate, endDate });
        const { data } = await getReservationInfo({
          weekNo,
          memberId: mId,
          hospitalCode: loginInfo.hospitalCode,
        });
         setReservationData(data.data);
      } catch (error) {
        const { message } = error.response.data;
         setReservationData([]);
        calInstance.clear();
        setLoading(false);
      }
    };
    reservationInfo(doctorInfo.memberId);

  };

  // 캘린더 주단위를 넘기기 위한 부분 (-)
  const handleNextClick = async() => {
    setLoading(true);
    calInstance.next();
    const weekNo = moment(
      calInstance.getDateRangeStart().toDate(),
      'MM-DD-YYYY',
    ).week();

    const startDate = moment(calInstance.getDateRangeStart().toDate()).format(
      'YYYY년 MM월 DD일',
    );
    const endDate = moment(calInstance.getDateRangeEnd().toDate()).format(
      'YYYY년 MM월 DD일',
    );
  

    const reservationInfo = async (mId) => {
      try {
         setTitleDate({ weekNo, startDate, endDate });
        const { data } = await getReservationInfo({
          weekNo,
          memberId: mId,
          hospitalCode: loginInfo.hospitalCode,
        });
         setReservationData(data.data);
      } catch (error) {
        const { message } = error.response.data;
         setReservationData([]);
        calInstance.clear();
        setLoading(false);
      }
    };
    reservationInfo(doctorInfo.memberId);
  };

  /*
  달력 스케줄 클릭시 발생되는 이벤트
  1) 캘린더에서 년월일, 예약시작 시간, 예약 끝 시간을 얻는다
  2) 얻은 데이터를 통해 상태 데이터(reservationTime)에 세팅한다
  3) drawer오픈한다
  검색: readReservationData
  */
  const onBeforeCreateSchedule = (e) => {
    // 1)
    const start = e.start;
    const end = e.end;
    const date =
      moment(start).format('YYYY') +
      '년 ' +
      moment(start).format('M') +
      '월 ' +
      moment(start).format('D')+
      '일';
    const startTime = moment(start.toDate()).format('LT');
    const endTime = moment(end.toDate()).format('LT');

    const scheduleStart = moment(start.toDate()).format();
    const scheduleEnd = moment(end.toDate()).format();

    //2)
    setReservationTime({
      date,
      start,
      end,
      startTime,
      endTime,
      scheduleStart,
      scheduleEnd,
      weekNum: titleDate.weekNo,
    });

    /*
    3)
    검색: Drawer-add
    */
    setOpened(true);
  };

  /*
  캘린더에 세팅된 예약 데이터들을 클릭할때 일어나는 클릭 이벤트
  1) 세팅 되어 있는 예약 데이터에는 고유의 id를 통해 데이터 객체를 얻어낸다
  2) setReadPatient에 데이터를 세팅한다 -> 세팅된 데이터는 PatientUpdateDrawer에 전달 해준다
  3) PatientUpdateDrawer를 오픈한다
  4) 검색: readReservationData
  */
  const onClickSchedule = (event) => {
    //1)
    const result = reservationDataList.filter(
      (schedule) => schedule.id === event.schedule.id,
    );
    const birthDay =
      result[0].patientBirth[0] +
      '/' +
      result[0].patientBirth[1] +
      '/' +
      result[0].patientBirth[2];
    result[0].patientBirth = birthDay;
    /*
    2)
    검색: readReservationData
    */
    console.log(result[0]);
    setReadPatient(result[0]);
    /*
    3)
    검색: Drawer-update
    */
    setReadOpened(true);
  };

  const selectOnChange = (value) => {
    setSelectId(value);
  };

  // 예약된 환자를 검색할 수 있는 Drawer를 오픈하는 부분
  const handeSearchOpenClick = () => {
    // 검색: Drawer-search
    setSearchOpened(true);
  };

  const calendar = () => {
    return (
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12}>
          <PageTransition>
            <ContentContainer>
              <TitleHeader
                style={{
                  visibility: `${!isLoading ? 'visible' : 'hidden'}`,
                }}
              >
                <div style={{ flex: 4 }}>
                  <span>진료 | </span>
                  <span>진료 접수</span>
                </div>

                {/* selectDoctor */}
                <FormControl
                  variant="standard"
                  style={{ width: '100%', flex: 1 }}
                >
                  <InputLabel id="label-id">Doctor</InputLabel>
                  <Select
                    labelId="label-id"
                    id="select-id"
                    value={selectId}
                    //onChange={(e) => selectOnChange(e.target.value)}
                    label="Doctor"
                  >
                    {doctorListInfo.map((item) => (
                      <MenuItem
                        key={item.memberId}
                        value={item.memberId}
                        onClick={() => handleMenuItemClick(item)}
                      >
                        {item.memberName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* /selectDoctor */}
              </TitleHeader>
              <ClockSpinner
                isLoading={isLoading}
                style={{ backgroundColor: 'black' }}
              />
              <div
                className="icon-area"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  visibility: `${!isLoading ? 'visible' : 'hidden'}`,
                }}
              >
                <IconButton
                  type="button"
                  size="small"
                  style={{
                    border: '1px solid rgba(0,0,0,0.12)',
                    marginLeft: '0.5rem',
                    marginRight: '1rem',
                    padding: '0.5rem',
                  }}
                  //Drawer-search
                  onClick={handeSearchOpenClick}
                >
                  <RiUserSearchFill />
                </IconButton>
                <IconButton
                  type="button"
                  size="small"
                  style={{
                    border: '1px solid rgba(0,0,0,0.12)',
                    marginRight: '0.5rem',
                    padding: '0.5rem',
                  }}
                  onClick={handlePrevClick}
                >
                  <IoIosArrowBack />
                </IconButton>

                <IconButton
                  type="button"
                  size="small"
                  style={{
                    border: '1px solid rgba(0,0,0,0.12)',
                    marginLeft: '0.5rem',
                    marginRight: '1rem',
                    padding: '0.5rem',
                  }}
                  onClick={handleNextClick}
                >
                  <IoIosArrowForward />
                </IconButton>

                <span>
                  {titleDate.startDate} ~ {titleDate.endDate}
                </span>
              </div>

              <div
                className="calendar-area"
                style={{
                  marginTop: '1rem',
                  visibility: `${!isLoading ? 'visible' : 'hidden'}`,
                }}
              >
                <Calendar
                  height="100%"
                  view="week"
                  ref={calendarRef}
                  //reservationData
                  onBeforeCreateSchedule={onBeforeCreateSchedule}
                  //readReservationData

                  onClickSchedule={onClickSchedule}
                />
              </div>
              {/* Drawer-add */}
              <ReservationDrawer
                isOpened={isOpened}
                setClosed={setClosed}
                setOpened={setOpened}
                reservationTime={reservationTime}
                doctorInfo={doctorInfo}
                setAddDisplay={setAddDisplay}
              />
              {/* Drawer-update */}
              <ReservationReadDrawer
                readOpened={readOpened}
                setReadOpened={setReadOpened}
                readPatient={readPatient}
                setAddDisplay={setAddDisplay}
              />
              {/* Drawer-search */}
              <SearchReservation
                searchOpened={searchOpened}
                setSearchOpened={setSearchOpened}
                setAddDisplay={setAddDisplay}
              />
            </ContentContainer>
          </PageTransition>
        </Grid>
      </Grid>
    );
  };

 

  const errorPage = () => {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>error!</h1>
      </div>
    );
  };

  return (
    <div>
      <header
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1,
        }}
      >
        <ResponsivePageHeader />
        <Divider />
      </header>
      <main>
        {calendar()}
        {errorText && errorPage()}
        
      </main>
    </div>
  );
};

export default ReservationPage;
