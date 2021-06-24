import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  upateReservationTime,
  removeReservationTime,
} from 'redux/features/reservation/reservationSlice';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import StyledInputBase from 'components/common/input/StyledInputBase';
import StyledButton from 'components/common/button/StyledButton';

const ReservationInfoListContainer = ({ setReadOpened, readPatient }) => {
  const dispatch = useDispatch();

  const [visitReason, setReason] = useState(readPatient.drOpinion);
  const [reservationTime, setReservationTime] = useState({
    day: '',
    startTime: '',
    endTime: '',
  });
  const visitReasonHandleChange = (event) => {
    setReason(event.target.value);
  };
  useEffect(() => {
    console.log('reservationreadcontainer 실행');
    const day = moment(readPatient.start).format('YYYY년 MM월 DD일');
    const startTime = moment(readPatient.start).format('LT');
    const endTime = moment(readPatient.end).format('LT');
    setReservationTime({ day, startTime, endTime });
  }, []);

  const updateReservationInfo = (id, changeVisitReason) => {
    if (visitReason === readPatient.drOpinion) {
      alert('수정된 내용을 입력해주세요');
    } else {
      console.log('id', id);
      console.log('changeVisitReason', changeVisitReason);
      const updateInfo = {
        id: id,
        drOpinion: changeVisitReason,
      };
      dispatch(upateReservationTime(updateInfo));
      ///나중에 수정이 완료되었다는 컴포넌트 작성해서 여기다 작성하기!
      setReadOpened(false);
    }
  };

  const removeReservationInfo = (id) => {
    dispatch(removeReservationTime(id));
    ///나중에 삭제가 완료되면 컴포넌트 작성해서 여기다 작성하기!
    setReadOpened(false);
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
        <StyledInputBase readOnly value={readPatient.title} />
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
        <StyledInputBase readOnly value={readPatient.birth} />
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
        <StyledInputBase readOnly value={reservationTime.day} />
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
        <StyledInputBase readOnly value={readPatient.drRoom} />
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
        <StyledInputBase readOnly value={readPatient.memberName} />
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
      <Grid item xs={6} style={{ textAlign: 'center', marginTop: '1.5em' }}>
        <StyledButton
          width="80%"
          bgColor="#99582a"
          color="white"
          onClick={() => {
            updateReservationInfo(readPatient.id, visitReason);
          }}
        >
          예약수정
        </StyledButton>
      </Grid>
      <Grid item xs={6} style={{ textAlign: 'center', marginTop: '1.5em' }}>
        <StyledButton
          width="80%"
          bgColor="#DDB892"
          color="white"
          onClick={() => {
            removeReservationInfo(readPatient.id);
          }}
        >
          예약취소
        </StyledButton>
      </Grid>
    </Grid>
  );
};

export default ReservationInfoListContainer;