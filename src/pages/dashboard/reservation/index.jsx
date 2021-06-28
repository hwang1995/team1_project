import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PageHeader from 'components/common/header/PageHeader';
import {
  Divider,
  Grid,
  Hidden,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RiUserSearchFill } from 'react-icons/ri';
import useWindowSize from 'hooks/useWindowSize';

// Toast UI Calendar Library & monent.js
import Calendar from '@toast-ui/react-calendar';
import moment from 'moment';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

// Custom Components by Team1
import MenuSidebar from 'components/common/sidebar/MenuSidebar';
import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';
import doctorJson from '../../../pages/temporary/sihyun/json/doctorJson';
import ReservationDrawer from 'components/reservation/drawer/ReservationDrawer';
import ReservationReadDrawer from 'components/reservation/drawer/read/ReservationReadDrawer';
import SearchReservation from 'components/reservation/drawer/SearchReservation';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';
import PageTransition from 'components/common/transition/PageTransition';

/**
 * 이 페이지 컴포넌트는 진료 에약(접수) 페이지를 작성하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * 진료 예약(접수) - Toast UI Calendar, ReservationDrawer
 * @returns {JSX.Element}
 */
const ReservationPage = () => {
  const reservationInfo = useSelector(
    (state) => state.reservation.reservationInfo,
  );
  const { breakpoint } = useWindowSize();

  // Calendar DOM을 가져오기 위해 설정하는 Ref
  const calendarRef = useRef(null);

  // Calendar DOM을 가져와 Instance를 설정하기 위한 State
  const [calInstance, setCalInstance] = useState(null);

  // Drawer 여부를 확인하기 위한 State
  const [isOpened, setOpened] = useState(false);
  const [readOpened, setReadOpened] = useState(false);
  const [searchOpened, setSearchOpened] = useState(false);

  // Select ID를 선택하기 위한 State
  const [selectId, setSelectId] = useState(1);

  // 의사 정보를 설정하기 위한 State
  const [doctorInfo, setDoctorInfo] = useState({
    member_id: '',
    member_name: '',
    doctor_room: '',
  });

  const [reservationTime, setReservationTime] = useState({
    date: '',
    startTime: '',
    endTime: '',
    scheduleStart: '',
    scheduleEnd: '',
    weekNum: '',
  });

  const [readPatient, setReadPatient] = useState();

  const [addSchedule, setSchdule] = useState([]);

  // 캘린더 헤더 부분에 위클리 데이트세팅
  const now = new Date();
  const weekNum = moment(now, 'MM-DD-YYYY').week();
  const initStartDate = moment().day('Sunday').week(weekNum).toDate();
  const initEndDate = moment().day('Saturday').week(weekNum).toDate();
  //console.log(now);
  const [titleDate, setTitleDate] = useState({
    startDate: moment(initStartDate).format('YYYY년 MM월 DD일'),
    endDate: moment(initEndDate).format('YYYY년 MM월 DD일'),
  });

  useEffect(() => {
    if (calInstance === null) {
      console.log(
        'calInstance가 렌더링 null 값이므로 아직 캘린더에 대한 인스턴스는 받지 못했습니다.',
      );
      setCalInstance(calendarRef.current.getInstance());
      //calInstance.createSchedules(addSchedule);
      // }else {
      //   console.log("rendering");
      //   calInstance.createSchedules(addSchedule);
    }
  }, [calInstance]);

  // doctorInfo 임의로 설정하기 위한 코드
  useEffect(() => {
    console.log('캘린더 index.jsx 파일이 렌더링 되었습니다.');
    const { member_id, member_name, doctor_room } = doctorJson[0];
    setDoctorInfo({
      member_id,
      member_name,
      doctor_room,
    });
  }, []);

  useEffect(() => {
    console.log('rendering');
    if (calInstance !== null) {
      calInstance.clear();
      const result = reservationInfo.filter(
        (resInfo) => selectId === resInfo.memberId,
      );
      console.log('addSchedule', result);
      calInstance.createSchedules(result);
      calInstance.render();
    }
  }, [reservationInfo, selectId, calInstance]);

  // useEffect(() => {
  //   console.log('select 의사 실행', reservationInfo);
  //   console.log("의사 num", selectId);
  //   const result = reservationInfo.filter((resInfo) => selectId === resInfo.memberId);
  //   console.log("index result" , result);
  //   calInstance.createSchedules(result);
  // }, [selectId]);

  const handleMenuItemClick = useCallback(
    ({ member_id, member_name, doctor_room }) => {
      setDoctorInfo({
        member_id,
        member_name,
        doctor_room,
      });
    },
    [],
  );

  const handlePrevClick = () => {
    calInstance.prev();
    const startDate = moment(calInstance.getDateRangeStart().toDate()).format(
      'YYYY년 MM월 DD일',
    );
    const endDate = moment(calInstance.getDateRangeEnd().toDate()).format(
      'YYYY년 MM월 DD일',
    );

    setTitleDate({ startDate, endDate });
  };

  const handleNextClick = () => {
    calInstance.next();
    console.log(calInstance.getDateRangeEnd().toDate());
    const startDate = moment(calInstance.getDateRangeStart().toDate()).format(
      'YYYY년 MM월 DD일',
    );
    const endDate = moment(calInstance.getDateRangeEnd().toDate()).format(
      'YYYY년 MM월 DD일',
    );

    setTitleDate({ startDate, endDate });
  };

  const onBeforeCreateSchedule = (e) => {
    console.log('시작시간', moment(e.start.toDate()).format());
    console.log('엔드시간', moment(e.end.toDate()).format());
    console.log('dataeeee', moment(e.start.toDate()).format('LT'));
    const weekNum = moment(e.start.toDate(), 'MM-DD-YYYY').week();
    const start = e.start;
    const end = e.end;
    const date =
      start.getFullYear() +
      '년 ' +
      start.getMonth() +
      '월 ' +
      start.getDate() +
      '일';
    const startTime = moment(start.toDate()).format('LT');
    const endTime = moment(end.toDate()).format('LT');

    const scheduleStart = moment(start.toDate()).format();
    const scheduleEnd = moment(end.toDate()).format();

    setReservationTime({
      date,
      startTime,
      endTime,
      scheduleStart,
      scheduleEnd,
      weekNum,
    });
    setOpened(true);
  };

  const onClickSchedule = (event) => {
    const result = reservationInfo.filter(
      (reservationInfo) => reservationInfo.id === event.schedule.id,
    );
    setReadPatient(result[0]);
    console.log('result', result[0]);
    setReadOpened(true);
  };

  const handeSearchOpenClick = () => {
    setSearchOpened(true);
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
        <Grid container>
          <Grid item xs={12}>
            <PageTransition>
              <ContentContainer>
                <TitleHeader>
                  <div style={{ flex: 4 }}>
                    <span>진료 | </span>
                    <span>진료 접수</span>
                  </div>

                  <FormControl
                    variant="standard"
                    style={{ width: '100%', flex: 1 }}
                  >
                    <InputLabel id="label-id">Doctor</InputLabel>
                    <Select
                      labelId="label-id"
                      id="select-id"
                      value={selectId}
                      onChange={(e) => setSelectId(e.target.value)}
                      label="Doctor"
                    >
                      {doctorJson.map((item) => (
                        <MenuItem
                          key={item.member_id}
                          value={item.member_id}
                          onClick={() => handleMenuItemClick(item)}
                        >
                          {item.member_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TitleHeader>
                <div
                  className="icon-area"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
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

                <div className="calendar-area" style={{ marginTop: '1rem' }}>
                  <Calendar
                    height="100%"
                    view="week"
                    ref={calendarRef}
                    onBeforeCreateSchedule={onBeforeCreateSchedule}
                    onClickSchedule={onClickSchedule}
                  />
                </div>

                <ReservationDrawer
                  isOpened={isOpened}
                  setOpened={setOpened}
                  reservationTime={reservationTime}
                  doctorInfo={doctorInfo}
                />
                <ReservationReadDrawer
                  readOpened={readOpened}
                  setReadOpened={setReadOpened}
                  readPatient={readPatient}
                />
                <SearchReservation
                  searchOpened={searchOpened}
                  setSearchOpened={setSearchOpened}
                />
              </ContentContainer>
            </PageTransition>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default ReservationPage;
