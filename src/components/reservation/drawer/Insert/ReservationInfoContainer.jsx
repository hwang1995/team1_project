import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReservationTime } from 'redux/features/reservation/reservationSlice';
import { Grid } from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import StyledInputBase from 'components/common/input/StyledInputBase';
import StyledButton from 'components/common/button/StyledButton';


/*
  예약정보 (환자정보, 의사정보, 예약시간, 내원사유)를 입력하고 
  데이터를 추가하는 컴포넌트
  reservationTime: 예약시간 데이터 (날짜, 예약시작시간, 예약마감시간), ReservationDrawer에서 props로 받은 데이터를
                   바로 해당 컴포넌트에 바로 props로 보내준다
  doctorInfo: 의사 데이터, ReservationDrawer에서 props로 받은 데이터를 바로 해당 컴포넌트에 바로 props로 보내준다
  patientInfo: ReservationDrawer의 setPatient 상태함수를 ReservationPatientListContainer 컴포넌트로 보내
               환자정보를 가져온다. 그러면 patientInfo는 환자정보로 채워진다.
               환자정보로 채워진 데이터를 해당 컴포넌트에 props로 전해준다.
  setCheckChange: false-> 검색어 (SearchBox) true-> 해당내용이 맞습니까? 상태에 따라 컴포넌트 구성도가 달라짐
                  해당 컴포넌트에서 true로 세팅 해주어 컴포넌트 구성도를 다르게 만들어준다
*/

/*
  검색:

*/
const ReservationInfoContainer = ({
  reservationTime,
  doctorInfo,
  patientInfo,
  setOpened,
  setCheckChange,
}) => {
  /*
    내원사유를 세팅하기 위한 상태 데이터

    검색: 
  */
  const [visitReason, setReason] = useState('');

  // 진료예약,true -> (진료예약 + 이전으로돌아가기 버튼),false
  const [buttonChange, setButtonChange] = useState(false);

  // 진료예약 상태 데이터를 가지고 있다
  const reserve_Info = useSelector(
    (state) => state.reservation.reservationInfo,
  );
  const dispatch = useDispatch();

  /*
    컴포넌트 바뀌기 전, 진료예약 버튼 클릭시 발생하는 클릭 이벤트
    1) 환자이름과 생년월일이 안젹혀있을 때
    2) 내원사유를 적지 않았을때
    3) 1),2)의 조건을 충족을 하면, 
       컴포넌트가 바뀐다 (이전으로 돌아가기 + 진료예약 버튼) -> setButtonChange
       검색입력박스가 이미지로 바뀐다 -> setCheckChange

    검색: 
  */
  const handleReservationClick = () => {
    //1)
    if (patientInfo.patient_name === '' && patientInfo.patient_birth === '') {
      alert('환자를 선택해주세요');
    } else {
      //2)
      if (visitReason === '') {
        alert('내원 사유를 적어주세요');
      } else {
        //3)
        setCheckChange(true);
        setButtonChange(true);
      }
    }
  };
  /*
    버튼 컴포넌트가 바뀐 후의 진료예약 버튼 클릭시 발생하는 클릭 이벤트
    reservationInfo 객체에 props(reservationTime, patientInfo,doctorInfo) 
    가 세팅, 상태데이터 (visitReason)을 세팅한다
    객체 형식은 ui toast calendar에서 추가할 때 쓰이는 객체형식과 섞어서 구성하였다
    1) 리덕스에 reservationInfo데이터를 저장하기 위해 dispatch를 이용
    2) 검색입력박스가 이미지로 바뀐다 -> setCheckChange
    3) 컴포넌트가 바뀐다 (이전으로 돌아가기 + 진료예약 버튼) -> setButtonChange

    검색: 
  */
  const handleInsertInfoClick = () => {
    const reservationInfo = {
      id: reserve_Info.length + 1,
      calendarId: reservationTime.weekNum,
      title: patientInfo.patient_name,
      birth: patientInfo.patient_birth,
      category: 'time',
      body: visitReason,
      start: reservationTime.scheduleStart,
      end: reservationTime.scheduleEnd,
      bgColor: 'blue',
      color: 'white',
      drOpinion: visitReason,
      patientId: patientInfo.patient_id,
      memberId: doctorInfo.member_id,
      memberName: doctorInfo.member_name,
      drRoom: doctorInfo.doctor_room,
    };
    //1)
    dispatch(setReservationTime(reservationInfo));
    //2)
    setCheckChange(false);
    //3)
    setButtonChange(false);
    setOpened(false);
  };
  /*
    내원사유 데이터를 세팅하기 위해 함수

    검색: 
  */
  const visitReasonHandleChange = (event) => {
    setReason(event.target.value);
  };

  return (
    <Grid
      container
      spacing={2}
      style={{
        padding: '2rem',
      }}
    >
      <Grid
        item
        xs={3}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StyledTypography variant="h6" component="h5" weight={5}>
          이름
        </StyledTypography>
      </Grid>
      <Grid item xs={9}>
        <StyledInputBase readOnly value={patientInfo.patient_name} />
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StyledTypography variant="h6" component="h5" weight={5}>
          생년월일
        </StyledTypography>
      </Grid>
      <Grid item xs={9}>
        <StyledInputBase readOnly value={patientInfo.patient_birth} />
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StyledTypography variant="h6" component="h5" weight={5}>
          예약 날짜
        </StyledTypography>
      </Grid>
      <Grid item xs={9}>
        <StyledInputBase readOnly value={reservationTime.date} />
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StyledTypography variant="h6" component="h5" weight={5}>
          예약 시작
        </StyledTypography>
      </Grid>
      <Grid item xs={9}>
        <StyledInputBase readOnly value={reservationTime.startTime} />
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StyledTypography variant="h6" component="h5" weight={5}>
          예약 종료
        </StyledTypography>
      </Grid>
      <Grid item xs={9}>
        <StyledInputBase readOnly value={reservationTime.endTime} />
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StyledTypography variant="h6" component="h5" weight={5}>
          진료실
        </StyledTypography>
      </Grid>
      <Grid item xs={9}>
        <StyledInputBase readOnly value={doctorInfo.doctor_room} />
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StyledTypography variant="h6" component="h5" weight={5}>
          의사
        </StyledTypography>
      </Grid>
      <Grid item xs={9}>
        <StyledInputBase readOnly value={doctorInfo.member_name} />
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StyledTypography variant="h6" component="h5" weight={5}>
          내원 사유
        </StyledTypography>
      </Grid>
      <Grid item xs={9}>
        <StyledInputBase
          onChange={visitReasonHandleChange}
          value={visitReason}
        />
      </Grid>
      {buttonChange === false ? (
        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '1.5em' }}>
          <StyledButton
            width="80%"
            onClick={handleReservationClick}
            style={{ backgroundColor: 'rgb(30, 51, 71)', color: 'white' }}
          >
            진료예약
          </StyledButton>
        </Grid>
      ) : (
        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '1.5em' }}>
          <div style={{ marginBottom: '1em' }}>
            <StyledButton
              width="80%"
              style={{
                backgroundColor: '#a9e34b',
                color: 'white',
              }}
              onClick={() => {
                setCheckChange(false);
                setButtonChange(false);
              }}
            >
              이전으로 돌아가기
            </StyledButton>
          </div>
          <div>
            <StyledButton
              width="80%"
              style={{
                backgroundColor: 'rgb(30, 51, 71)',
                color: 'white',
              }}
              onClick={handleInsertInfoClick}
            >
              진료예약
            </StyledButton>
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default ReservationInfoContainer;
