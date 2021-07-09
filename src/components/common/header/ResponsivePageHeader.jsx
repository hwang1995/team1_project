import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Grid, Hidden } from '@material-ui/core';
import { MdLocalHospital } from 'react-icons/md';
import { AiOutlineQuestion } from 'react-icons/ai';
import { IoLogIn, IoLogOut, IoNotificationsOutline } from 'react-icons/io5';
import { HiOutlineViewList } from 'react-icons/hi';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import useWindowSize from 'hooks/useWindowSize';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAuthToken,
  setHeaderInfo,
  setLoginInfo,
} from 'redux/features/common/commonSlice';
import MobileDrawer from './drawer/MobileDrawer';

import NotificationDrawer from './drawer/NotificationDrawer';
import AuthModal from 'components/auth/modal/AuthModal';
import { removeAuthHeader } from 'apis/axiosConfig';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 50px;
  background-color: #000;
  display: flex;
  font-family: --apple-system, BlinkMacSystemFont, 'Spoqa Han Sans Neo', 'Lato';
  .common-grid {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    color: white;
    font-weight: 400;
    letter-spacing: -0.5px;
    opacity: 0.7;

    &:hover {
      opacity: 1;
      transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
  }

  * {
    cursor: pointer;
  }
`;

const SidebarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 50px;
  background-color: rgb(28, 28, 28);
  font-family: --apple-system, BlinkMacSystemFont, 'Spoqa Han Sans Neo', 'Lato';
  .common-grid {
    display: flex;
    align-items: center;
    height: 50px;
    color: #f5f5f7;

    .big-text {
      font-size: 1.35rem;

      &:hover {
        opacity: 1;
        transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
      }
    }

    .small-text {
      font-size: 1rem;
      font-weight: 400;
      opacity: 0.7;
      &:hover {
        opacity: 1;
        transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
      }
    }

    .selected-item {
      text-decoration: underline;
      text-underline-offset: 5px;
      opacity: 1;
      font-weight: 700;
    }

    .bold {
      font-weight: 700;
    }
  }

  .right-align {
    justify-content: flex-end;
    span {
      margin-left: 0.5rem;
    }
  }

  * {
    cursor: pointer;
  }
`;

const ResponsivePageHeader = () => {
  const { breakpoint } = useWindowSize();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const authInfo = useSelector((state) => state.common.loginInfo);

  const [isLogined, setLogined] = useState(false);

  useEffect(() => {
    if (authInfo.memberEmail !== '') {
      setLogined(true);
    }
  }, [authInfo]);

  const pathnames = location.pathname
    .split('/')
    .filter((data) => (data !== '' ? true : false));
  const specificPath = pathnames[pathnames.length - 1];

  const isDiagnosis =
    specificPath === 'reservation' ||
    specificPath === 'diagnosis' ||
    specificPath === 'diagnostic' ||
    specificPath === 'diagnosis-history';

  const isPatient = specificPath === 'patient';
  const isMember = specificPath === 'member';
  const isDashboard = specificPath === 'dashboard';
  const isTutorial = specificPath === 'tutorial';
  const isMainPage = pathnames.length === 0;

  const goPage = useCallback(
    (page) => {
      history.replace(page);
    },
    [history],
  );

  const handleLogin = () => {
    dispatch(
      setHeaderInfo({
        name: 'auth',
        status: true,
      }),
    );
  };

  const handleLogout = () => {
    removeAuthHeader();

    dispatch(setLoginInfo(''));
    dispatch(setAuthToken(''));

    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('authToken');

    setLogined(false);
    window.location.href = '/';
  };

  const handleOpen = () => {
    dispatch(
      setHeaderInfo({
        name: 'drawer',
        status: true,
      }),
    );
  };

  const getMobileNotLoginedHeader = () => {
    return (
      <Container>
        <Grid container spacing={1}>
          <Grid
            item
            xs={2}
            className="common-grid"
            style={{ justifyContent: 'flex-start' }}
            onClick={handleOpen}
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <HiOutlineViewList size={24} color="white" />
            </motion.div>

            {/* Full Screen Drawer를 보여줄 수 있는 Button을 넣는다. */}
          </Grid>
          <Grid item xs={8} className="common-grid">
            <MdLocalHospital size={24} color="white" />
          </Grid>
          <Grid
            item
            xs={2}
            className="common-grid"
            style={{ justifyContent: 'flex-end' }}
            onClick={handleLogin}
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <IoLogIn color="white" size={24} />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    );
  };

  const getMobileTopHeader = () => {
    return (
      <Container>
        <Grid container spacing={1}>
          <Grid
            item
            xs={2}
            className="common-grid"
            style={{ justifyContent: 'flex-start' }}
            onClick={handleOpen}
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <HiOutlineViewList size={24} color="white" />
            </motion.div>

            {/* Full Screen Drawer를 보여줄 수 있는 Button을 넣는다. */}
          </Grid>
          <Grid item xs={8} className="common-grid">
            <MdLocalHospital size={24} color="white" />
          </Grid>
          <Grid
            item
            xs={2}
            className="common-grid"
            style={{ justifyContent: 'flex-end' }}
            onClick={handleLogout}
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <IoLogOut color="white" size={24} />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    );
  };

  // Desktop Header
  const getNotLoginedHeader = () => {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid
            item
            sm={2}
            md={1}
            className="common-grid"
            style={{ justifyContent: 'flex-start' }}
            onClick={() => goPage('/')}
          >
            <MdLocalHospital size={24} color="white" />
          </Grid>
          <Grid item sm={8} md={10} className="common-grid"></Grid>
          <Grid
            item
            sm={2}
            md={1}
            className="common-grid"
            style={{ justifyContent: 'flex-end' }}
            onClick={handleLogin}
          >
            <IoLogIn color="white" size={24} />
          </Grid>
        </Grid>
      </Container>
    );
  };

  const getTopHeader = () => {
    if (
      isDiagnosis ||
      isPatient ||
      isMember ||
      isDashboard ||
      isTutorial ||
      isMainPage
    ) {
      return (
        <Container maxWidth="lg">
          <Grid container spacing={1}>
            <Grid
              item
              sm={2}
              md={1}
              className="common-grid"
              style={{ justifyContent: 'flex-start' }}
              onClick={() => history.push('/dashboard')}
            >
              <MdLocalHospital size={24} color="white" />
            </Grid>
            <Grid
              item
              sm={2}
              md={1}
              className="common-grid"
              onClick={() => history.push('/dashboard/reservation')}
            >
              <span>진료</span>
            </Grid>
            <Grid
              item
              sm={2}
              md={1}
              className="common-grid"
              onClick={() => goPage('/dashboard/patient')}
            >
              <span>환자</span>
            </Grid>

            <Grid
              item
              sm={2}
              md={1}
              className="common-grid"
              onClick={() => goPage('/dashboard/member')}
            >
              <span>임직원</span>
            </Grid>
            <Grid
              item
              sm={2}
              md={6}
              className="common-grid"
              onClick={() => goPage('/dashboard/tutorial')}
              style={{
                justifyContent: 'flex-end',
              }}
            >
              <AiOutlineQuestion size={24} color="white" />
            </Grid>
            <Grid
              item
              sm={1}
              md={1}
              className="common-grid"
              style={{
                justifyContent: 'flex-end',
              }}
              onClick={() =>
                dispatch(
                  setHeaderInfo({
                    name: 'notification',
                    status: true,
                  }),
                )
              }
            >
              <IoNotificationsOutline size={24} color="white" />
            </Grid>

            <Grid
              item
              sm={1}
              md={1}
              className="common-grid"
              style={{
                justifyContent: 'flex-end',
              }}
              onClick={handleLogout}
            >
              <IoLogOut color="white" size={24} />
            </Grid>
          </Grid>
        </Container>
      );
    }
    return <Container></Container>;
  };

  const getBottomContent = () => {
    if (isDiagnosis) {
      return (
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={2} className="common-grid">
              <span className={clsx('big-text', 'bold')}>진료</span>
            </Grid>
            <Grid item xs={10} className={clsx('common-grid', 'right-align')}>
              <span
                className={clsx('small-text', {
                  'selected-item': specificPath === 'reservation',
                })}
                onClick={() => goPage('/dashboard/reservation')}
              >
                진료 접수
              </span>
              <span
                className={clsx('small-text', {
                  'selected-item': specificPath === 'diagnosis',
                })}
                onClick={() => goPage('/dashboard/diagnosis')}
              >
                진료 등록
              </span>
              <span
                className={clsx('small-text', {
                  'selected-item': specificPath === 'diagnostic',
                })}
                onClick={() => goPage('/dashboard/diagnostic')}
              >
                진료 검사 보기
              </span>
              <span
                className={clsx('small-text', {
                  'selected-item': specificPath === 'diagnosis-history',
                })}
                onClick={() => goPage('/dashboard/diagnosis-history')}
              >
                진료 기록 보기
              </span>
            </Grid>
          </Grid>
        </Container>
      );
    }

    if (isPatient) {
      return (
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={2} className="common-grid">
              <span className={clsx('big-text', 'bold')}>환자</span>
            </Grid>
            <Grid item xs={10} className={clsx('common-grid', 'right-align')}>
              <span
                className={clsx('small-text', {
                  'selected-item': specificPath === 'patient',
                })}
                onClick={() => goPage('/dashboard/patient')}
              >
                환자 관리
              </span>
            </Grid>
          </Grid>
        </Container>
      );
    }

    if (isMember) {
      return (
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={2} className="common-grid">
              <span className={clsx('big-text', 'bold')}>병원</span>
            </Grid>
            <Grid item xs={10} className={clsx('common-grid', 'right-align')}>
              <span
                className={clsx('small-text', {
                  'selected-item': specificPath === 'member',
                })}
                onClick={() => goPage('/dashboard/member')}
              >
                임직원 관리
              </span>
            </Grid>
          </Grid>
        </Container>
      );
    }

    if (isDashboard) {
      return <Container maxWidth="lg"></Container>;
    }

    return <Container></Container>;
  };
  return (
    <Fragment>
      {/* 상위 헤더  */}

      <PageContainer>
        {breakpoint === 'xs' && (
          <Hidden smUp>
            {!isLogined ? getMobileNotLoginedHeader() : getMobileTopHeader()}
          </Hidden>
        )}
        {breakpoint !== 'xs' && (
          <Hidden xsDown>
            {!isLogined ? getNotLoginedHeader() : getTopHeader()}
          </Hidden>
        )}
      </PageContainer>

      {/* 하위 헤더 */}
      <SidebarContainer>
        {breakpoint !== 'xs' && <Hidden xsDown>{getBottomContent()}</Hidden>}
      </SidebarContainer>

      {breakpoint === 'xs' && <MobileDrawer />}

      <NotificationDrawer />
      <AuthModal />
    </Fragment>
  );
};

export default ResponsivePageHeader;
