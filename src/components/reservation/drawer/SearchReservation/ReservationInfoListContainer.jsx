import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Content from "./Content";
import UpdateQuestion from './Content/UpdateQuestion';
import DeleteQuestion from './Content/DeleteQuestion';
import {
  upateReservationTime,
  removeReservationTime,
} from 'redux/features/reservation/reservationSlice';
import moment from 'moment';

/*
  해당 컴포넌트는 환자 데이터 정보를 가져와 볼 수 있는 컴포넌트이다.
  1) setReadOpened -> DeleteQuestion과 UpdateQuestion 에 props로 전달해 준다. 
     false -> 검색어가 없다라고 띄우는 컴포넌트
     true -> 검색결과 내용을 담아 띄우는 컴포넌트
  2) readPatient는 환자 데이터 이다. Content 컴포넌트에 props로 전달하여 데이터를 세팅해 준다
  3) setVisible ->SearchBox를 보여주냐 보여주지 않냐에 대한 여부
  4) setPageResult
     예약환자를 검색하는 컴포넌트 (PatientListItem)에서 
     pageResult = true -> 검색어를 입력해세요 라는 내용이 세팅
                  false -> 검색결과가 없습니다 라는 내용이 세팅
*/ 
const ReservationInfoListContainer = ({
  setReadOpened,
  readPatient,
  setVisible,
  setPageResult,
}) => {
  const dispatch = useDispatch();
  /*
    '': => Content 컴포넌트 (환자의 정보를 보여주는 컴포넌트)
    'Update': => 수정이 완료되었다는 내용
    'Remove': => 삭제가 완료되었다는 내용
  */
  const [checkPage, setCheckPage] = useState('');
  
  // 의사 소견
  const [visitReason, setReason] = useState(readPatient.drOpinion);

  // 예약시간 데이터
  const [reservationTime, setReservationTime] = useState({
    day: '',
    startTime: '',
    endTime: '',
  });

  // 의사 소견에 대한 값을 setReason에 세팅
  const visitReasonHandleChange = (event) => {
    setReason(event.target.value);
  };

  /*
    readPatient 값이 바뀔때 마다 
    props를 통해 갖고온 readPatient 데이터를 reservationTime에 세팅 해준다
  */
  useEffect(() => {
      console.log("detail 컴포넌트")
    setReservationTime({
      day: moment(readPatient.start).format('YYYY년 MM월 DD일'),
      startTime: moment(readPatient.start).format('LT'),
      endTime: moment(readPatient.end).format('LT'),
    });
  }, [readPatient]);

  // 수정관련 클릭 이벤트
  const updateReservationInfo = (id, changeVisitReason) => {
    if (visitReason === readPatient.drOpinion) {
      alert('수정된 내용을 입력해주세요');
    } else {
      const updateInfo = {
        id: id,
        drOpinion: changeVisitReason,
      };
      dispatch(upateReservationTime(updateInfo));

      setCheckPage('UPDATE');
      setVisible(true);
    }
  };

  // 예약 취소 눌렀을 떄 일어나는 클릭 이벤트
  const removeReservationInfo = (id) => {
    dispatch(removeReservationTime(id));
    
    setCheckPage('REMOVE');
    setVisible(true);
  };

  return (
    <div>
      {checkPage === '' && (
        <Content
          readPatient={readPatient}
          reservationTime={reservationTime}
          updateReservationInfo={updateReservationInfo}
          visitReasonHandleChange={visitReasonHandleChange}
          removeReservationInfo={removeReservationInfo}
          visitReason={visitReason}
        />
      )}
      {checkPage === 'UPDATE' && (
        <UpdateQuestion
          setCheckPage={setCheckPage}
          setVisible={setVisible}
          setReadOpened={setReadOpened}
          setPageResult={setPageResult}
        />
      )}
      {checkPage === 'REMOVE' && (
        <DeleteQuestion
          setCheckPage={setCheckPage}
          setVisible={setVisible}
          setReadOpened={setReadOpened}
          setPageResult={setPageResult}
        />
      )}
    </div>
  );
};

export default ReservationInfoListContainer;
