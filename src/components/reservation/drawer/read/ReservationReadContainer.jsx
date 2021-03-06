import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  modifyReservationInfo,
  removeReservationInfo,
} from 'apis/reservationAPI';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import StyledTypography from 'components/common/typography/StyledTypography';
import StyledInputBase from 'components/common/input/StyledInputBase';
import StyledButton from 'components/common/button/StyledButton';
import { sendMqttMessage } from 'apis/pushAPI';

/**
 * * 목적 : 예약 상태를 보여주기 위한 컨테이너
 * 캘린더에 추가된 데이터를 클릭했을 때 나오는 ReservationDrawer에 세팅되는 컨텐트 부분이다.
 * readPatient: 예약된 환자 정보 객체 데이터이다.
 * @param {object} state hello world
 * @returns {JSX.Element} view
 */

const ReservationReadContainer = ({
  setReadOpened,
  readPatient,
  setAddDisplay,
}) => {
  // 로그인한 유저의 정보를 가져오기 위한 데이터
  const loginInfo = useSelector((state) => state.common.loginInfo);

  const { enqueueSnackbar } = useSnackbar();
  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  // 내원사유를 관리하는 상태 데이터, readPatient.drOpinion을 세팅하여 수정할 수 있도록 한다
  const [visitReason, setReason] = useState(readPatient.visitPurpose);
  // 수정, 삭제 완료되었을떄에 따라 컴포넌트를 세팅하기 위한 상태 데이터
  const [checkPage, setCheckPage] = useState('');
  // 예약시간 부분을 커스텀하여 세팅하는 상태 데이터
  const [reservationTime, setReservationTime] = useState({
    day: '',
    startTime: '',
    endTime: '',
  });

  /* 
    내원사유에 대한 값을 받아 세팅 하는 부분
    검색: checkPage
  */
  const visitReasonHandleChange = (event) => {
    setReason(event.target.value);
  };

  /*
    readPatient(props)값이 변할 떄마다 실행이 된다.
    여기에서 readPatient에 있는 예약 시간 데이터를 통해 커스텀하여 데이터 세팅
    reservationTime에 데이터를 세팅한다.
    검색: reservationTime
  */
  useEffect(() => {
    const day = moment(readPatient.start).format('YYYY년 MM월 DD일');
    const startTime = moment(readPatient.start).format('LT');
    const endTime = moment(readPatient.end).format('LT');
    setReservationTime({ day, startTime, endTime });
  }, [readPatient]);

  /*
    예약수정 버튼을 클릭했을 때, 실행되는 클릭 이벤트 함수
    1) 수정된 값이 없을 때
    2) 수정된 값을 상태 데이터에 세팅
    3) 컴포넌트 변화 (업데이트 완료) 
  */
  const updateReservationInfo = (id, changeVisitReason) => {
    //1)
    if (visitReason === readPatient.visitPurpose) {
      handleAlert('error', '수정된 내용을 입력해주세요');
    } else {
      //2)
      try {
        const updateInfo = {
          diagId: id,
          patientId: readPatient.patientId,
          memberId: readPatient.memberId,
          hospitalCode: loginInfo.hospitalCode,
          visitPurpose: changeVisitReason,
        };
        //3)
        const { data } = modifyReservationInfo(updateInfo);

        handleAlert('success', '내용이 변경되었습니다.');

        setCheckPage('UPDATE');
      } catch (error) {
        const { message } = error.response.data;
        handleAlert('error', message);
      }
    }
  };
  /*
    예약 취소 버튼을 눌렀을 때, 실행 되는 함수
    1) 값을 삭제하기 위한 부분
    2) 컴포넌트 변화 (삭제 완료)
  */
  const deleteReservationInfo = async (id) => {
    //1)
    try {
      const { data } = await removeReservationInfo(id);
      handleAlert('success', '예약이 취소되었습니다.');

      const sendPushMessage = {
        topic: `/${loginInfo.hospitalCode}/doctor`,
        priority: 'info',
        message: `${readPatient.patientName} 환자가 진료가 취소되었습니다.`,
      };

      await sendMqttMessage(sendPushMessage);
    } catch (error) {
      const { message } = error.response.data;
      handleAlert('error', message);
      console.log('error', error);
    }
    //2)
    setCheckPage('REMOVE');
  };

  /*
    예약 수정을 나타내는 컴포넌트
    1) 값을 수정하기 위한 부분
    2) 컴포넌트 변화 (수정 완료)
  */
  const resultUpdate = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          <img src="/assets/image/accept.png" alt="accept" />
        </div>
        <div>
          <h1 style={{ fontWeight: 'bold', marginBottom: '2em' }}>
            수정이 완료되었습니다.
          </h1>
        </div>
        <div>
          <StyledButton
            width="60%"
            bgColor="#DDB892"
            color="white"
            onClick={() => {
              setAddDisplay(true);
              setReadOpened(false);
              setCheckPage('');
            }}
          >
            메인으로 돌아가기
          </StyledButton>
        </div>
      </div>
    );
  };
  /*
    예약 취소를 나타내는 컴포넌트
    1) 값을 삭제하기 위한 부분
    2) 컴포넌트 변화 (삭제 완료)
  */
  const resultDelete = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          <img src="/assets/image/accept.png" alt="accept" />
        </div>
        <div>
          <h1 style={{ fontWeight: 'bold', marginBottom: '2em' }}>
            예약이 취소되었습니다.
          </h1>
        </div>
        <div>
          <StyledButton
            width="60%"
            bgColor="#DDB892"
            color="white"
            onClick={() => {
              setAddDisplay(true);
              setReadOpened(false);
              setCheckPage('');
            }}
          >
            메인으로 돌아가기
          </StyledButton>
        </div>
      </div>
    );
  };
  // 예약된 정보를 보여주는 컴포넌트
  const mainContent = () => {
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
          <StyledInputBase
            readOnly
            value={moment(readPatient.patientBirth).format('yyyy년 MM월 DD일')}
          />
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
          <StyledInputBase readOnly value={readPatient.doctorRoom} />
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
          <StyledInputBase readOnly value={readPatient.doctorName} />
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
            bgColor="#fb8500"
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
            bgColor="#d90429"
            color="white"
            onClick={() => {
              deleteReservationInfo(readPatient.id);
            }}
          >
            예약취소
          </StyledButton>
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      {/* checkPage 값에 따라 예약된 정보를 나타내거나, 업데이트 컴포넌트, 삭제 컴포넌트를 보여준다 */}
      {checkPage === '' && mainContent()}
      {checkPage === 'UPDATE' && resultUpdate()}
      {checkPage === 'REMOVE' && resultDelete()}
    </div>
  );
};

export default ReservationReadContainer;
