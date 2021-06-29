import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Hidden, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { GrPowerReset } from 'react-icons/gr';

import 'react-calendar/dist/Calendar.css';
import NoticeItem from 'components/dashboard/NoticeItem';
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
                  <Grid item xs={12} sm={8} lg={8}>
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
                          DOUZONE Hospital
                        </StyledTypography>

                        <StyledTypography
                          variant="h6"
                          component="h6"
                          weight={7}
                          style={{
                            marginTop: '1rem',
                          }}
                        >
                          <p>&nbsp;</p>
                          <p>
                            &nbsp; &nbsp;서울더존병원은 1989년 6월 개원 이래
                            끊임없는 연구개발과 임상 진료에 대한 아낌없는 투자로
                            세계적 수준의 의료성과를 달성해 왔다.
                          </p>
                          <p>&nbsp;</p>
                          <p>
                            &nbsp; &nbsp; 또한 ‘생명 존중의 정신’과 이웃과
                            아픔을 함께 하는 ‘나눔 정신’을 실천함으로써 존경받는
                            병원으로 사회적 책임을 다해오고 있다. 최고의 의료
                            수준과 첨단 의료 장비를 갖추고 선진 외국의 의료와
                            어깨를 나란히 하면서 우리나라의 의료 발전을 이끌고
                            있다.
                          </p>
                          <p>&nbsp;</p>
                          <p>
                            &nbsp; &nbsp; 서울더존병원은 연건평 8만5천여평 총
                            2,715 병상의 국내 최대 병원 이다. 선진의료체계를
                            기반으로 한 최고 의료진과 최적의 진료 시스템, 최첨단
                            의료 장비를 갖추고 고객만족을 실천하며 우리나라의
                            의료 발전을 선도해 왔다. 그 결과 이제 서울더존병원은
                            1일 평균 외래환자 11,680명, 재원환자 2,427명,
                            응급환자 256명을 진료하며, 연간 66,838여건의
                            고난이도 수술을 시행 하고있다.
                          </p>
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
                          style={{ marginLeft: '12px' }}
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
                  <Grid item xs={12} sm={4} lg={4}>
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
                          clearText="CANCEL"
                          color="secondary"
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
