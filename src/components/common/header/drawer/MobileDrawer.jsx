import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Drawer, IconButton, Container, Collapse } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { setHeaderInfo } from 'redux/features/common/commonSlice';
import PageTransition from 'components/common/transition/PageTransition';
import clsx from 'clsx';

const MobileContainer = styled(Container)`
  width: 100%;
  height: 100vh;
  background-color: #000;
  padding-top: 1.2rem;
  display: flex;
  flex-direction: column;
  color: white;
  font-family: --apple-system, BlinkMacSystemFont, 'Spoqa Han Sans Neo', 'Lato';
  .header-area {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
  }
  .content-area {
    display: flex;
    width: 100vw;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 1rem;
    font-weight: 700;
    font-size: 1.75rem;
    text-decoration: underline;
    text-underline-offset: 12px;
    opacity: 0.7;
    &:hover {
      opacity: 1;
      transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
  }

  .collapsed-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 1.5rem;
    .collapsed-item {
      display: flex;
      margin-top: 1rem;
      margin-bottom: 1rem;
      align-items: center;
      opacity: 0.7;
      span {
        margin-left: 1rem;
        font-size: 1.3rem;
        font-weight: 500;
      }

      .text-bold {
        opacity: 1;
        font-weight: 700;
      }

      &:hover {
        opacity: 1;
        transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
      }
    }

    * {
      cursor: pointer;
    }
  }

  .selected-item {
    opacity: 1;
  }

  .text-underline {
    text-decoration: underline;
    text-underline-offset: 12px;
  }
`;

const MobileDrawer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isOpened = useSelector((state) => state.common.headerInfo.drawer);

  const [collapseInfo, setCollapseInfo] = useState({
    diagnosis: false,
    member: false,
    patient: false,
  });

  const { diagnosis, member, patient } = collapseInfo;

  const pathnames = location.pathname.split('/');
  const specificPath = pathnames[pathnames.length - 1];
  const isDiagnosis =
    specificPath === 'reservation' ||
    specificPath === 'diagnosis' ||
    specificPath === 'diagnostic' ||
    specificPath === 'diagnosis-history';

  const isPatient = specificPath === 'patient';
  const isMember = specificPath === 'member';

  const handleClose = () => {
    dispatch(
      setHeaderInfo({
        name: 'drawer',
        status: false,
      }),
    );
  };

  const goPage = (page) => {
    dispatch(
      setHeaderInfo({
        name: 'drawer',
        status: false,
      }),
    );
    history.push(page);
  };

  const handleHeaderCollapse = (data) => {
    const { name, value } = data;
    setCollapseInfo({
      ...collapseInfo,
      [name]: value,
    });
  };
  return (
    <Fragment>
      <Drawer anchor="top" open={isOpened}>
        <MobileContainer>
          <div onClick={handleClose} className="header-area">
            <IconButton type="button">
              <AiOutlineClose size={24} color="white" />
            </IconButton>
          </div>
          <PageTransition>
            <div
              className={clsx('content-area', {
                'selected-item': isDiagnosis,
              })}
              onClick={() =>
                handleHeaderCollapse({
                  name: 'diagnosis',
                  value: !diagnosis,
                })
              }
            >
              진료
            </div>
            <Collapse in={diagnosis}>
              <div className="collapsed-container">
                <div
                  className={clsx('collapsed-item', {
                    'text-underline': specificPath === 'reservation',
                  })}
                  onClick={() => goPage('/dashboard/reservation')}
                >
                  <span>진료 접수</span>
                </div>
                <div
                  className={clsx('collapsed-item', {
                    'text-underline': specificPath === 'diagnosis',
                  })}
                  onClick={() => goPage('/dashboard/diagnosis')}
                >
                  <span>진료 등록</span>
                </div>
                <div
                  className={clsx('collapsed-item', {
                    'text-underline': specificPath === 'diagnostic',
                  })}
                  onClick={() => goPage('/dashboard/diagnostic')}
                >
                  <span>진료 검사 보기</span>
                </div>
                <div
                  className={clsx('collapsed-item', {
                    'text-underline': specificPath === 'diagnosis-history',
                  })}
                  onClick={() => goPage('/dashboard/diagnosis-history')}
                >
                  <span>진료 기록 보기</span>
                </div>
              </div>
            </Collapse>
            <div
              className={clsx('content-area', {
                'selected-item': isPatient,
              })}
              onClick={() =>
                handleHeaderCollapse({
                  name: 'patient',
                  value: !patient,
                })
              }
            >
              환자
            </div>
            <Collapse in={patient}>
              <div className="collapsed-container">
                <div
                  className={clsx('collapsed-item', {
                    'text-underline': specificPath === 'patient',
                  })}
                  onClick={() => goPage('/dashboard/patient')}
                >
                  <span>환자 관리</span>
                </div>
              </div>
            </Collapse>
            <div
              className={clsx('content-area', {
                'selected-item': isMember,
              })}
              onClick={() =>
                handleHeaderCollapse({
                  name: 'member',
                  value: !member,
                })
              }
            >
              임직원
            </div>
            <Collapse in={member}>
              <div className="collapsed-container">
                <div
                  className={clsx('collapsed-item', {
                    'text-underline': specificPath === 'member',
                  })}
                  onClick={() => goPage('/dashboard/member')}
                >
                  <span>임직원 관리</span>
                </div>
              </div>
            </Collapse>

            <div
              className="content-area"
              onClick={() =>
                dispatch(
                  setHeaderInfo({
                    name: 'notification',
                    status: true,
                  }),
                )
              }
            >
              알림 리스트
            </div>
          </PageTransition>
        </MobileContainer>
      </Drawer>
    </Fragment>
  );
};

export default MobileDrawer;
