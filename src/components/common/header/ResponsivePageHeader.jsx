import React, { Fragment } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Grid, Hidden } from '@material-ui/core';
import { MdLocalHospital } from 'react-icons/md';

import clsx from 'clsx';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 50px;
  background-color: #000;
  /* background-color: rgb(54, 54, 54); */
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
`;

const ResponsivePageHeader = () => {
  const location = useLocation();
  const history = useHistory();
  const pathnames = location.pathname.split('/');
  const specificPath = pathnames[pathnames.length - 1];

  const isDiagnosis =
    specificPath === 'reservation' ||
    specificPath === 'diagnosis' ||
    specificPath === 'diagnostic' ||
    specificPath === 'diagnosis-history';

  const goPage = (page) => {
    history.push(page);
  };
  return (
    <Fragment>
      {/* 상위 헤더  */}
      <PageContainer>
        <Hidden xsDown>
          {' '}
          <Container maxWidth="lg">
            <Grid container spacing={1}>
              <Grid
                item
                xs={1}
                className="common-grid"
                style={{ justifyContent: 'flex-start' }}
                onClick={() => goPage('/dashboard')}
              >
                <MdLocalHospital size={24} color="white" />
              </Grid>
              <Grid
                item
                xs={1}
                className="common-grid"
                onClick={() => goPage('/dashboard/reservation')}
              >
                <span>진료</span>
              </Grid>
              <Grid
                item
                xs={1}
                className="common-grid"
                onClick={() => goPage('/dashboard/patient')}
              >
                <span>환자</span>
              </Grid>
            </Grid>
          </Container>
        </Hidden>
      </PageContainer>

      {/* 하위 헤더 */}
      <SidebarContainer>
        <Hidden xsDown>
          {specificPath === 'reservation'}
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
        </Hidden>
      </SidebarContainer>
    </Fragment>
  );
};

export default ResponsivePageHeader;
