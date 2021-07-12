import React, { Fragment, useEffect, useCallback, useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import Paho from 'paho-mqtt';
import DiagnosisPage from './diagnosis';
import DiagnosisHistoryPage from './diagnosis-history';
import DiagnosticPage from './diagnostic';
import FrontPage from './front';
import MemberPage from './member';
import PatientPage from './patient';
import ReservationPage from './reservation';
import TutorialPage from './tutorial';

/**
 * Dashboard 컴포넌트의 페이지를 정의하고
 * 해당하는 경로의 해당 컴포넌트를 보여주기 위한 Dashboard 컴포넌트
 * 주소 정의
 * * /dashboard => 대쉬보드의 메인 페이지 (공지사항도 포함)
 * * /dashboard/diagnosis => 대쉬보드의 진료 페이지
 * * /dashboard/diagnosis-history => 대쉬보드의 진료 기록 보기 페이지
 * * /dashboard/diagnostic => 대쉬보드의 진단 검사 페이지
 * * /dashboard/member => 대쉬보드의 임직원 관리 페이지
 * * /dashboard/patient => 대쉬보드의 환자 관리 페이지
 * * /dashboard/reservation => 대쉬보드의 진료 예약 페이지
 */
const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const userInfo = useSelector((state) => state.common.loginInfo);
  const handleAlert = useCallback(
    (variant, message) => {
      enqueueSnackbar(message, {
        variant,
      });
    },
    [enqueueSnackbar],
  );

  useEffect(() => {
    if (sessionStorage.getItem('authToken') === null) {
      handleAlert('error', '인가되지 않은 요청입니다...');
      history.push('/');
    }
    // 나중에 권한 별로 들어가지 말라고 할 떄에 사용
    const parseJSON = JSON.parse(sessionStorage.getItem('userInfo'));
    // console.log(parseJSON);
  }, [handleAlert, history]);

  // MQTT 정의
  const { REACT_APP_MQTT_HOSTNAME, REACT_APP_MQTT_PORT } = process.env;
  let client = useRef(null);
  const connectMqttBroker = () => {
    client.current = new Paho.Client(
      REACT_APP_MQTT_HOSTNAME,
      Number.parseInt(REACT_APP_MQTT_PORT),
      'client-' + new Date().getTime(),
    );
    client.current.onConnectionLost = () => {
      console.log('접속 끊김');
    };
    client.current.onMessageArrived = (msg) => {
      const parseMsg = JSON.parse(msg.payloadString);
      const { priority, message } = parseMsg;
      handleAlert(priority, message);
      // console.log(message);
    };
    client.current.connect({
      onSuccess: () => {
        const { memberAuthority, hospitalCode } = userInfo;
        // client.current.subscribe('/ABC_001');
        console.log(memberAuthority);

        if (memberAuthority === 'ROLE_DEVELOP') {
          client.current.subscribe(`/${hospitalCode}`); // 모든 유저에게 보냄.
          client.current.subscribe(`/${hospitalCode}/#`);
        }

        if (memberAuthority === 'ROLE_DIRECTOR') {
          client.current.subscribe(`/${hospitalCode}/director`);
        } else if (memberAuthority === 'ROLE_DOCTOR') {
          client.current.subscribe(`/${hospitalCode}/doctor`);
        } else if (memberAuthority === 'ROLE_NURSE') {
          client.current.subscribe(`/${hospitalCode}/nurse`);
        } else if (memberAuthority === 'ROLE_INSPECTOR') {
          client.current.subscribe(`/${hospitalCode}/inspector`);
        }

        console.log('성공 했습니다.');
      },
    });
  };

  const disconnectMqttBroker = () => {
    client.current.disconnect();
  };

  useEffect(() => {
    connectMqttBroker();
    return () => {
      disconnectMqttBroker();
    };
  }, []);

  return (
    <Fragment>
      <Switch>
        <Route path="/dashboard" exact component={FrontPage} />
        <Route path="/dashboard/diagnosis" component={DiagnosisPage} />
        <Route
          path="/dashboard/diagnosis-history"
          component={DiagnosisHistoryPage}
        />
        <Route path="/dashboard/diagnostic" component={DiagnosticPage} />
        <Route path="/dashboard/member" component={MemberPage} />
        <Route path="/dashboard/patient" component={PatientPage} />
        <Route path="/dashboard/reservation" component={ReservationPage} />
        <Route path="/dashboard/tutorial" component={TutorialPage} />
      </Switch>
    </Fragment>
  );
};

export default Dashboard;
