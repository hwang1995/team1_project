import React, { useState, useCallback, useRef, useEffect } from 'react';
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

/**
 * 이 페이지 컴포넌트는 진료 에약(접수) 페이지를 작성하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * 진료 예약(접수) - Toast UI Calendar, ReservationDrawer
 * @returns {JSX.Element}
 */
const ReservationPage = () => {
  const { breakpoint } = useWindowSize();

  // Calendar DOM을 가져오기 위해 설정하는 Ref
  const calendarRef = useRef(null);

  // Calendar DOM을 가져와 Instance를 설정하기 위한 State
  const [calInstance, setCalInstance] = useState(null);

  // Drawer 여부를 확인하기 위한 State
  const [isOpened, setOpened] = useState(false);

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
  });

  // 캘린더 헤더 부분에 위클리 데이트세팅
  const now = new Date();
  const weekNum = moment(now, 'MM-DD-YYYY').week();
  const initStartDate = moment().day('Sunday').week(weekNum).toDate();
  const initEndDate = moment().day('Saturday').week(weekNum).toDate();

  const [titleDate, setTitleDate] = useState({
    startDate: moment(initStartDate).format('YYYY년 MM월 DD일'),
    endDate: moment(initEndDate).format('YYYY년 MM월 DD일'),
  });

  useEffect(() => {
    if (calInstance === null) {
      setCalInstance(calendarRef.current.getInstance());
    }
  }, [calInstance]);

  // doctorInfo 임의로 설정하기 위한 코드
  useEffect(() => {
    const { member_id, member_name, doctor_room } = doctorJson[0];
    setDoctorInfo({
      member_id,
      member_name,
      doctor_room,
    });
  }, []);

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
    const startDate = moment(calInstance.getDateRangeStart().toDate()).format(
      'YYYY년 MM월 DD일',
    );
    const endDate = moment(calInstance.getDateRangeEnd().toDate()).format(
      'YYYY년 MM월 DD일',
    );

    setTitleDate({ startDate, endDate });
  };

  const onBeforeCreateSchedule = (e) => {
    const start = e.start;
    const end = e.end;
    const date =
      start.getFullYear() +
      '년 ' +
      start.getMonth() +
      '월 ' +
      start.getDate() +
      '일';
    const startTime = start.getHours() + '시 ' + start.getMinutes() + '분 ';
    const endTime = end.getHours() + '시 ' + end.getMinutes() + '분 ';

    setReservationTime({
      date,
      startTime,
      endTime,
    });
    setOpened(true);
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
        <PageHeader />
        <Divider />
      </header>
      <main>
        <Grid container>
          <Grid item sm={4} md={3} lg={2}>
            <Hidden xsDown>
              <MenuSidebar />
            </Hidden>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10}>
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
                />
              </div>

              <ReservationDrawer
                isOpened={isOpened}
                setOpened={setOpened}
                reservationTime={reservationTime}
                doctorInfo={doctorInfo}
              />
            </ContentContainer>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default ReservationPage;
