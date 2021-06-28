import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Grid, Hidden, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { GrPowerReset } from 'react-icons/gr';

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
import SearchBox from 'components/common/search/SearchBox';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';
import PageTransition from 'components/common/transition/PageTransition';
import { DatePicker } from '@material-ui/pickers';

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
  const [date, changeDate] = useState(new Date());
  const [searchVal, setSearchVal] = useState('');

  const emergencyItem = useSelector((state) => state.emergency.emergencyItem);

  useEffect(() => {
    console.log('변화가 일어났어요.', isOpened);
  }, [isOpened]);

  const handleChange = (e) => {
    setSearchVal(e.target.value);
    console.log(e.target.value);
  };

  const matchData = emergencyItem.filter((data) =>
    data.emergency_name.includes(searchVal),
  );

  const showAll = (event) => {
    setSearchVal('');
  };

  return (
    <div>
      <header
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 2,
        }}
      >
        <ResponsivePageHeader />
      </header>
      <main>
        <Grid container>
          <Grid item xs={12}>
            <PageTransition>
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
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Rerum eveniet nulla impedit ipsam, totam iusto
                          officiis autem maiores necessitatibus molestias fugit
                          ut ab pariatur aspernatur. Dolorum esse et nulla
                          voluptas.
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
                        <StyledTypography
                          variant="h4"
                          component="h4"
                          weight={7}
                        >
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
                          alignItems: 'center',
                          minHeight: '400px',
                        }}
                      >
                        <DatePicker
                          autoOk
                          color="secondary"
                          orientation="landscape"
                          variant="static"
                          openTo="date"
                          value={date}
                          onChange={changeDate}
                        />
                      </div>
                    </Hidden>

                    <StyledContainer
                      bgColor="rgb(234,242,254)"
                      style={{ marginTop: '4.3rem', marginLeft: '0.7rem' }}
                    >
                      <div style={{ display: 'flex', padding: '1rem' }}>
                        <div style={{ flex: 3.5 }}>
                          <StyledTypography
                            color="rgb(63,81,181)"
                            variant="h4"
                            component="h4"
                            weight={8}
                          >
                            전화번호부
                          </StyledTypography>
                        </div>
                        <div style={{ flex: 1.5 }}>
                          <StyledButton
                            bgColor="rgb(234,242,254)"
                            onClick={() =>
                              setEmergencyOpened((prevState) => !prevState)
                            }
                          >
                            <AddIcon />더 보기
                          </StyledButton>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          marginTop: '15px',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ flex: 9 }}>
                          <SearchBox
                            onChange={handleChange}
                            setSearchVal={setSearchVal}
                            placeholder="이름을 입력해주세요."
                          />
                        </div>
                        <div
                          style={{
                            paddingLeft: '0.5rem',
                          }}
                        >
                          <GrPowerReset
                            size={20}
                            style={{ marginLeft: '10px' }}
                            onClick={showAll}
                          />
                        </div>
                      </div>
                      <div style={{ marginLeft: '0.3rem' }}>
                        {matchData
                          .filter((data, index) => {
                            if (index < 6) {
                              return true;
                            }
                            return false;
                          })
                          .map((data) => (
                            <div style={{ display: 'flex', padding: '0.5rem' }}>
                              <StyledTypography
                                variant="h6"
                                component="h6"
                                weight={6}
                                style={{ flex: 1.5 }}
                              >
                                {data.emergency_name} :
                              </StyledTypography>
                              <StyledTypography
                                variant="h6"
                                component="h6"
                                weight={6}
                                style={{ flex: 1 }}
                              >
                                {data.emergency_tel}
                              </StyledTypography>
                            </div>
                          ))}
                      </div>
                    </StyledContainer>
                  </Grid>
                </Grid>
                <EmergencyDrawer
                  emergencyOpened={emergencyOpened}
                  setEmergencyOpened={setEmergencyOpened}
                />
                <NoticeDrawer isOpened={isOpened} setOpened={setOpened} />
              </ContentContainer>
            </PageTransition>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default FrontPage;
