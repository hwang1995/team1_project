import Calendar from '@toast-ui/react-calendar';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import InformationButton from '../InformationButton';
import MainDrawer from "../DrawerComponent/MainDrawer"
import JsonData from "../json/doctorJson.json"
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {FormControlComponent} from "../DrawerComponent/ComponentItems";
import moment from 'moment';

function CalendarCom() {
  const calendarRef = useRef(null);
  //달력 인스턴스 상태 데이터
  const [calInstance, setCalInstance] = useState(null);
  //드로어 오픈여부 상태 데이터
  const [isOpened, setOpened] = useState(false);
  // 예약시간 관리한는 상태 데이터
  const [reservationTime,setReservationTime] = useState({
     date: "",
     startTime: "",
     endTime: "",
  });
  //select 관련 데이터
  const [id, setId] = useState("");
  //의사에 대한 정보 관리
  const [doctorInfo, setDoctorInfo] = useState({
    member_id: "",
    member_name: "",
    doctor_room: "",
  });

  // 캘린더 헤더 부분에 위클리 데이트세팅
  const now = new Date();
  const weekNum = moment(now, "MM-DD-YYYY").week();
  const initStartDate = moment().day("Sunday").week(weekNum).toDate();
  const initEndDate = moment().day("Saturday").week(weekNum).toDate();
  
  // 캘린더 헤더 부분 위클리 상태 데이터 
  const [titleDate, setTitleDate] = useState({
    startDate: moment(initStartDate).format('YYYY년 MM월 DD일'),
    endDate: moment(initEndDate).format('YYYY년 MM월 DD일'),
  });

  // 렌더링시 캘린더 컴포넌트가 생성이되면 calInstance 상태데이터에 캘린더 인스턴스 세팅
  useEffect(() => {
    
    console.log('json',JsonData);
    if (calInstance === null) {
      setCalInstance(calendarRef.current.getInstance());
    } 
  }, [calInstance]);

 

  //드로어 닫기, 자식에서 props통해 적용
  const isClosed = () => {
    setOpened(false);
  };
  // 캘린더 주단위로 넘기는 버튼(1주후)
  const handleNextClick = () => {
    calInstance.next();
    const startDate = moment(calInstance.getDateRangeStart().toDate()).format(
      'YYYY년 MM월 DD일',
    );
    const endDate = moment(calInstance.getDateRangeEnd().toDate()).format(
      'YYYY년 MM월 DD일',
    );
    setTitleDate({
      ...titleDate,
      startDate: startDate,
      endDate: endDate,
    });
  };
  // 캘린더 주단위 넘기는 버튼 (1주전)
  const handlePrevClick = () => {
    calInstance.prev();
    const startDate = moment(calInstance.getDateRangeStart().toDate()).format(
      'YYYY년 MM월 DD일',
    );
    const endDate = moment(calInstance.getDateRangeEnd().toDate()).format(
      'YYYY년 MM월 DD일',
    );
    setTitleDate({
      ...titleDate,
      startDate: startDate,
      endDate: endDate,
    });
  }
  // select에서 의사 선택할시 변하는 값
  const doctorChange = (event) => {
      setId(event.target.value);
  }
  // select 의사 이름을 클릭시 상태 데이터에 의사 정보 세팅
  const doctorOnClick = (drId, drRoom, drName) => {
    console.log("ddd", drId);
    setDoctorInfo({
      ...doctorInfo,
      member_id: drId,
      member_name: drName,
      doctor_room: drRoom,
    });
  }

 
  // 스케쥴 생성하기 위한 버튼 -> 드로어 오픈이 된다
   const onBeforeCreateSchedule = useCallback((ev) => {
     setReservationTime({
       ...reservationTime,
       date: ev.start.getFullYear()+"년 " +ev.start.getMonth()+"월 " +ev.start.getDate() + "일",
       startTime: ev.start.getHours()+"시 "+ev.start.getMinutes()+"분 ",
       endTime: ev.end.getHours() + "시 " + ev.end.getMinutes() +"분 "
     })
     console.log("what?", doctorInfo);
     if(doctorInfo.member_id !== "")
      {setOpened(true);}
      else{
        console.log("의사세팅")
      }
   }, [doctorInfo]);
  return (
    <>
      <div style={{ margin: '1em' }}>
        <h2>진료 | 진료접수</h2>
      </div>
      <div style={{ textAlign: 'left', margin: '2em', display: 'flex' }}>
        <div style={{ flex: 4, textAlign: 'left' }}>
          <InformationButton
            textname="black"
            bordervalue="true"
            onClick={handlePrevClick}
          >
            <IoIosArrowBack />
          </InformationButton>
          <span
            style={{ marginLeft: '1em', marginRight: '1em', fontWeight: '700' }}
          >
            {titleDate.startDate} ~ {titleDate.endDate}
          </span>
          <InformationButton
            textname="black"
            bordervalue="true"
            onClick={handleNextClick}
          >
            <IoIosArrowForward />
          </InformationButton>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <FormControlComponent variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Doctor
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={id}
              onChange={doctorChange}
              label="Doctor"
            >
              {JsonData.map((item) => (
              <MenuItem key={item.member_id} value={item.member_id} onClick={()=> doctorOnClick(item.member_id,item.doctor_room, item.member_name)}>
                  {item.member_name}
                </MenuItem>))} 
            </Select>
          </FormControlComponent>
        </div>
      </div>

 
      <div style={{ width: '100%' }}>
        <Calendar
          height="1000px"
          view="week"
          ref={calendarRef}
          onBeforeCreateSchedule={onBeforeCreateSchedule}
        />
        <MainDrawer
          isOpened = {isOpened}
          isClosed = {isClosed}
          reservationTime = {reservationTime}
          doctorInfo = {doctorInfo}
        />
      </div>
    </>
  );
}

export default CalendarCom;
