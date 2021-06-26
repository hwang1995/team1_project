import React, { useState, useEffect, Fragment } from 'react';
import { Divider, Grid, Hidden, List, ListItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useWindowSize from 'hooks/useWindowSize';
import NoticeItem from 'components/dashboard/NoticeItem';
import PageHeader from 'components/common/header/PageHeader';
import MenuSidebar from 'components/common/sidebar/MenuSidebar';
import ContentContainer from 'components/common/container/ContentContainer';
import StyledContainer from 'components/common/container/StyledContainer';
import StyledTypography from 'components/common/typography/StyledTypography';
import StyledButton from 'components/common/button/StyledButton';
import NoticeDrawer from 'components/notice/drawer/NoticeDrawer';
import EmergencyDrawer from 'components/notice/drawer/EmergencyDrawer';
// import noticeData from 'components/notice/notice'
/**
 * 이 페이지 컴포넌트는 대쉬보드의 메인을 보여주기 위해 작성하는 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * - Sider
 * - Header
 * - 공지사항
 * - Calendar
 * - ColoredContainer
 * @returns {JSX.Element}
 */

const noticeItems = [
  {
    notice_id: 1,
    notice_title: '6월 25일은 공휴일입니다.',
    notice_date: '6월 21일',
    notice_author: '홍종현',
  },
  {
    notice_id: 2,
    notice_title: '7월 정기 휴뮤일 안내',
    notice_date: '6월 24일',
    notice_author: '홍종현',
  },
];

const FrontPage = () => {
  const { breakpoint } = useWindowSize();
  const [isOpened, setOpened] = useState(false);
  const [emergencyOpened, setEmergencyOpened] = useState(false);
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    console.log('변화가 일어났어요.', isOpened);
  }, [isOpened]);
  return (
    <div>
      <header style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>
        <PageHeader />
        <Divider />
      </header>
      <main>
        <Grid container>
          <Grid item xs={false} sm={4} md={3} lg={2}>
            {breakpoint !== 'xs' ? <MenuSidebar /> : ''}
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <ContentContainer>
              <Grid container>
                <Grid item xs={12} sm={8}>
                  <StyledContainer
                    bgColor="#EAF2FE"
                    padding="1.5"
                    style={{
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        flex: 3,
                      }}
                    >
                      <StyledTypography
                        variant="h4"
                        component="h4"
                        weight={9}
                        color="primary"
                      >
                        ABC Hospital
                      </StyledTypography>

                      <StyledTypography
                        variant="h6"
                        component="h6"
                        weight={7}
                        style={{
                          marginTop: '1rem',
                        }}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Rerum eveniet nulla impedit ipsam, totam iusto officiis
                        autem maiores necessitatibus molestias fugit ut ab
                        pariatur aspernatur. Dolorum esse et nulla voluptas.
                      </StyledTypography>
                    </div>

                    <img
                      src="/assets/image/dashboard_1.png"
                      width="10%"
                      alt="Dashboard"
                      style={{
                        flex: 1,
                      }}
                    />
                  </StyledContainer>
                  <div style={{ marginTop: '3rem', display: 'flex' }}>
                    <div style={{ flex: 4 }}>
                      <StyledTypography variant="h4" component="h4" weight={7}>
                        공지사항
                      </StyledTypography>
                    </div>
                    <div style={{ flex: 1 }}>
                      <StyledButton
                        bgColor="white"
                        onClick={() => setOpened((prevState) => !prevState)}
                      >
                        <AddIcon />더 보기
                      </StyledButton>
                    </div>
                  </div>
                  <List component="nav">
                    {noticeItems.map((data) => (
                      <NoticeItem key={data.notice_id} data={data} />
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Hidden xsDown>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Calendar onChange={onChange} value={value} />
                    </div>
                  </Hidden>

                  <StyledContainer bgColor="rgb(234,242,254)" style={{ marginTop: '11rem', marginLeft: '1rem'}}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ flex: 3.5 }}>
                      <StyledTypography color="rgb(63,81,181)" variant="h4" component="h4" weight={7}>
                        비상연락망
                      </StyledTypography>
                    </div>
                    <div style={{ flex: 1.5 }}>
                      <StyledButton
                        bgColor="rgb(234,242,254)"
                        onClick={() => setEmergencyOpened((prevState) => !prevState)}
                      >
                        <AddIcon />추가
                      </StyledButton>
                    </div>
                  </div >
                  <div style={{ marginTop: '2rem', marginLeft: '0.5rem'}}>
                  <StyledTypography variant="h5" component="h5" weight={4} ><li>송파구 소방서  :  010-212-8282</li></StyledTypography>
                  <StyledTypography variant="h5" component="h5" weight={4} ><li>더존병원 응급실  :  02-721-8282</li></StyledTypography>
                  <StyledTypography variant="h5" component="h5" weight={4} ><li>더존병원 홍길동 교수님  :  010-9993-8282</li></StyledTypography>
                  <StyledTypography variant="h5" component="h5" weight={4} ><li>더존병원 구급대원  :  010-2132-8282</li></StyledTypography>
                  <StyledTypography variant="h5" component="h5" weight={4} ><li>더존제약 영업사원  :  010-2112-8282</li></StyledTypography>
                  <StyledTypography variant="h5" component="h5" weight={4} ><li>더존헬스케어 영업사원  :  010-1234-8282</li></StyledTypography>
                  </div>
                  
                  </StyledContainer>

                </Grid>
              </Grid>
              <EmergencyDrawer emergencyOpened={emergencyOpened} setEmergencyOpened={setEmergencyOpened} />
              <NoticeDrawer isOpened={isOpened} setOpened={setOpened} />
            </ContentContainer>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default FrontPage;
