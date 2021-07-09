import React, { Fragment, useEffect, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import DiagnosisPage from './diagnosis';
import DiagnosisHistoryPage from './diagnosis-history';
import DiagnosticPage from './diagnostic';
import FrontPage from './front';
import MemberPage from './member';
import PatientPage from './patient';
import ReservationPage from './reservation';
import TutorialPage from './tutorial';
import { useSnackbar } from 'notistack';

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
    console.log(parseJSON);
  }, [handleAlert, history]);
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
