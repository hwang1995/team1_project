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
    id: 1,
    title: '종현이 멋죠요.',
    createDate: new Date().toLocaleDateString(),
    author: 'Dr. Hong',
  },
  {
    id: 2,
    title: '가즈아.',
    createDate: new Date().toLocaleDateString(),
    author: 'Dr. Hong',
  },
];

const FrontPage = () => {
  const { breakpoint } = useWindowSize();
  const [isOpened, setOpened] = useState(false);
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
                      <NoticeItem key={data.id} data={data} />
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
                </Grid>
              </Grid>
              <NoticeDrawer isOpened={isOpened} setOpened={setOpened} />
            </ContentContainer>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default FrontPage;
