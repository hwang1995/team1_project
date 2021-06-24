import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReservationTime } from 'redux/features/reservation/reservationSlice';
import { Grid } from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import StyledInputBase from 'components/common/input/StyledInputBase';
import StyledButton from 'components/common/button/StyledButton';

const ReservationInfoContainer = ({
  reservationTime,
  doctorInfo,
  patientInfo,
  setOpened,
}) => {
  const [visitReason, setReason] = useState('');
 const reserve_Info = useSelector(
   (state) => state.reservation.reservationInfo,
 );
  const dispatch = useDispatch();
  const handleReservationClick = () => {
    if (patientInfo.patient_name === '' && patientInfo.patient_birth === '') {
      alert('환자를 선택해주세요');
    } else {
      if (visitReason === '') {
        alert('내원 사유를 적어주세요');
      } else {
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
          color: "white",
          drOpinion: visitReason,
          patientId: patientInfo.patient_id,
          memberId: doctorInfo.member_id,
          memberName: doctorInfo.member_name,
          drRoom: doctorInfo.doctor_room,
        };
        console.log('reservationInfo', reserve_Info.length);
        dispatch(setReservationTime(reservationInfo));
        
        setOpened(false);
      }
    }
  };

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
      <Grid item xs={12} style={{ textAlign: 'center', marginTop: '1.5em' }}>
        <StyledButton
          width="80%"
          bgColor="rgb(30, 51, 71)"
          color="white"
          onClick={handleReservationClick}
        >
          진료예약
        </StyledButton>
      </Grid>
    </Grid>
  );
};

export default ReservationInfoContainer;
