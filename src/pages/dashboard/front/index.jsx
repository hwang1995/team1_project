import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Hidden, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { DatePicker } from '@material-ui/pickers';
import { getNoticesList } from 'apis/noticeAPI';
import { getCoronaData } from 'apis/coronaAPI';
import { AiFillCaretUp } from 'react-icons/ai';
import {
  getTodosListByHospitalCode,
  getTodosListByMemberId,
} from 'apis/todoAPI';
import { getHospitalInfo } from 'apis/hospitalAPI';
import 'react-calendar/dist/Calendar.css';
import NoticeItem from 'components/dashboard/NoticeItem';
import ContentContainer from 'components/common/container/ContentContainer';
import StyledContainer from 'components/common/container/StyledContainer';
import StyledTypography from 'components/common/typography/StyledTypography';
import StyledButton from 'components/common/button/StyledButton';
import NoticeDrawer from 'components/notice/drawer/NoticeDrawer';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';
import PageTransition from 'components/common/transition/PageTransition';
import InputBox from 'components/common/input/InputBox';
import TitleHeaderDashBoard from 'components/common/header/TitleHeaderDashBoard';
import TodoItem from 'components/dashboard/TodoItem';
import moment from 'moment';
import DashBoardSpinner from 'components/common/spinner/DashBoardSpinner';
import { setActiveStep } from 'redux/features/notice/noticeSlice';
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

const FrontPage = () => {
  const [isOpened, setOpened] = useState(false);
  const [date, changeDate] = useState(new Date());
  const [input, setInput] = useState('');
  const [notice, setNotice] = React.useState([]);
  // const [todoByCode, setTodoByCode] = React.useState([]);
  const [todoById, setTodoById] = React.useState([]);
  const [changed, setChanged] = useState(false);
  const [hospital, setHospital] = useState('');
  const [mineText, setMineText] = useState(700);
  const [allText, setAllText] = useState(300);
  const [isLoading, setLoading] = useState(true);
  const [corona, setCorona] = useState('');

  const dispatch = useDispatch();

  const hospitalCode = useSelector(
    (state) => state.common.loginInfo.hospitalCode,
  );

  const memberName = useSelector((state) => state.common.loginInfo.memberName);

  const memberId = useSelector((state) => state.common.loginInfo.memberId);
  // const emergencyItem = useSelector((state) => state.emergency.emergencyItem);

  useEffect(() => {
    console.log('변화가 일어났어요.', isOpened);
  }, [isOpened]);

  useEffect(() => {
    setLoading(true);
    const getNoticeAndTodoAndCorona = async () => {
      try {
        // 1. 공지사항 가져오기
        const noticeContent = await getNoticesList(hospitalCode);
        setNotice(noticeContent.data.data);

        // 1.5 병원정보 가져오기
        const hospitalContent = await getHospitalInfo(hospitalCode);
        setHospital(hospitalContent.data.data);
        console.log(hospitalContent.data);

        // 2. 투두 가져오기
        const todoContent = await getTodosListByMemberId(memberId);
        setTodoById(todoContent.data.data);
        setChanged(false);

        // 3. 코로나 데이터 가져오기
        const from = moment()
          .subtract(2, 'days')
          .startOf('day')
          .format('YYYY-MM-DDTHH:mm:ss');
        const to = moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss');
        console.log('from :', from);

        console.log('to :', to);
        const coronaContent = await getCoronaData(from, to);
        setCorona(coronaContent);

        // 4. 로딩 상태 바꾸기
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getNoticeAndTodoAndCorona();
  }, [changed]);


  const TodosListByMemberId = async () => {
    try {
      const response = await getTodosListByMemberId(memberId);
      setTodoById(response.data.data);
      setMineText(700);
      setAllText(300);
      setChanged(false);
    } catch (error) {
      console.log(error);
    }
  };

  const TodosListByHospitalCode = async () => {
    try {
      const response = await getTodosListByHospitalCode(hospitalCode);
      setTodoById(response.data.data);
      setMineText(300);
      setAllText(700);
      setChanged(false);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    console.log('변화가 일어났어요.');
  }, []);

  const handleOpenBtn = () => {
    setOpened(true);
    dispatch(setActiveStep('MAIN'));
  };

  return (
    <Fragment>
      {isLoading && (
        <div
          style={{
            width: '100%',
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'wait',
          }}
        >
          <DashBoardSpinner />
        </div>
      )}
      {!isLoading && (
        <Fragment>
          <div>
            <header
              style={{
                position: 'sticky',
                top: 0,
                backgroundColor: 'default',
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
                                {hospital.hospitalName}
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
                                  &nbsp; &nbsp; 서울더존병원은 1989년 6월 개원
                                  이래 끊임없는 연구개발과 임상 진료에 대한
                                  아낌없는 투자로 세계적 수준의 의료성과를
                                  달성해 왔다.
                                </p>
                                <p>&nbsp;</p>
                                <p>
                                  &nbsp; 또한 ‘생명 존중의 정신’과 이웃과 아픔을
                                  함께 하는 ‘나눔 정신’을 실천함으로써 존경받는
                                  병원으로 사회적 책임을 다해오고 있다. 최고의
                                  의료 수준과 첨단 의료 장비를 갖추고 선진
                                  외국의 의료와 어깨를 나란히 하면서 우리나라의
                                  의료 발전을 이끌고 있다.
                                </p>
                                <p>&nbsp;</p>
                                <p>
                                  &nbsp; 서울더존병원은 연건평 8만5천여평 총
                                  2,715 병상의 국내 최대 병원 이다.
                                  선진의료체계를 기반으로 한 최고 의료진과
                                  최적의 진료 시스템, 최첨단 의료 장비를 갖추고
                                  고객만족을 실천하며 우리나라의 의료 발전을
                                  선도해 왔다. 그 결과 이제 서울더존병원은 1일
                                  평균 외래환자 11,680명, 재원환자 2,427명,
                                  응급환자 256명을 진료하며, 연간 66,838여건의
                                  고난이도 수술을 시행 하고있다.
                                </p>
                              </StyledTypography>
                            </div>
                            <Hidden xsDown>
                              <img
                                src="/assets/image/dashboard_1.png"
                                width="10%"
                                alt="Dashboard"
                                style={{
                                  flex: 1,
                                }}
                              />
                            </Hidden>
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
                                onClick={handleOpenBtn}
                              >
                                <AddIcon />더 보기
                              </StyledButton>
                            </div>
                          </div>
                          <List component="nav">
                            {notice
                              .filter((data, index) => {
                                if (index < 4) {
                                  return true;
                                }
                                return false;
                              })
                              .map((data) => {
                                return (
                                  <NoticeItem key={data.noticeId} data={data} />
                                );
                              })}
                          </List>
                        </Grid>
                        <Grid item xs={12} sm={4} lg={4}>
                          <StyledContainer
                            bgColor="#2e51a8"
                            style={{ marginLeft: '0.7rem' }}
                          >
                            <h4
                              style={{
                                fontWeight: '300',
                                height: '100px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                color: '#ffffff',
                              }}
                            >
                              <TitleHeaderDashBoard>
                                <span>코로나바이러스감염증-19</span>
                              </TitleHeaderDashBoard>
                              <div style={{ dispaly: 'flex' }}>
                                {/* {console.log("corona.data : ", corona.data)} */}
                                {/* {corona.data[0].Date.split('T00:00:00Z')[0]} 기준 */}
                              </div>
                            </h4>

                            <StyledContainer
                              bgColor="#ffffff"
                              style={{
                                padding: '0.75rem',
                                fontWeight: '500',
                                fontSize: '1.1rem',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  color: 'rgb(65,69,78)',
                                  padding: '10px',
                                }}
                              >
                                <div
                                  style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                  }}
                                >
                                  확진환자
                                  <div>
                                    <br />
                                  </div>
                                  <div
                                    style={{
                                      color: 'rgb(236,73,64)',
                                      marginBottom: '1.5rem',
                                    }}
                                  >
                                    <AiFillCaretUp />
                                    <span style={{ fontSize: '1.3rem' }}>
                                      {/* {corona.data[1].Confirmed -
                                        corona.data[0].Confirmed} */}
                                    </span>
                                  </div>
                                  <div style={{}}>
                                    {/* {corona.data[1].Confirmed} */}
                                  </div>
                                </div>
                                <div
                                  style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                  }}
                                >
                                  격리해제
                                  <div>
                                    <br />
                                  </div>
                                  <div
                                    style={{
                                      color: 'rgb(67,100,193)',
                                      marginBottom: '1.5rem',
                                    }}
                                  >
                                    <AiFillCaretUp />
                                    <span style={{ fontSize: '1.3rem' }}>
                                      {/* {corona.data[1].Recovered -
                                      corona.data[0].Recovered} */}
                                    </span>
                                  </div>
                                  {/* <div>{corona.data[1].Recovered}</div> */}
                                </div>
                                <div
                                  style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                  }}
                                >
                                  사망자
                                  <div>
                                    <br />
                                  </div>
                                  <div style={{ marginBottom: '1.5rem' }}>
                                    <AiFillCaretUp />
                                    <span
                                      style={{
                                        fontSize: '1.3rem',
                                        marginBottom: '0.5rem',
                                      }}
                                    >
                                      {/* {corona.data[1].Deaths -
                                      corona.data[0].Deaths} */}
                                    </span>
                                  </div>
                                  {/* <div>{corona.data[1].Deaths}</div> */}
                                </div>
                                <div
                                  style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                  }}
                                >
                                  격리중
                                  <div>
                                    <br />
                                  </div>
                                  <div style={{ marginBottom: '1.5rem' }}>
                                    <AiFillCaretUp />
                                    <span
                                      style={{
                                        fontSize: '1.3rem',
                                        marginBottom: '0.5rem',
                                      }}
                                    >
                                      {/* {corona.data[1].Active -
                                      corona.data[0].Active} */}
                                    </span>
                                  </div>
                                  {/* <div>{corona.data[1].Active}</div> */}
                                </div>
                              </div>
                            </StyledContainer>

                            <div style={{ marginLeft: '0.3rem' }}></div>
                          </StyledContainer>

                          <Hidden xsDown>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '400px',
                                marginTop: '1rem',
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
                            bgColor="rgb(203,225,253)"
                            style={{
                              marginLeft: '0.7rem',
                            }}
                          >
                            <div style={{ display: 'flex', padding: '0.5rem' }}>
                              <div style={{ flex: 3.5 }}>
                                <TitleHeaderDashBoard
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                >
                                  <span style={{fontWeight: mineText}} onClick={TodosListByMemberId}>
                                    나의 할 일 |
                                  </span>
                                  <span style={{fontWeight: allText}} onClick={TodosListByHospitalCode}>
                                    전체의 할 일
                                  </span>
                                </TitleHeaderDashBoard>
                              </div>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <div style={{ flex: 9 }}>
                                <InputBox
                                  // onChange={handleChange}
                                  setInput={setInput}
                                  memberId={memberId}
                                  hospitalCode={hospitalCode}
                                  setChanged={setChanged}
                                  memberName={memberName}
                                  placeholder="할 일을 입력해주세요."
                                />
                              </div>
                            </div>
                            <List component="nav">
                              {todoById.map((data) => {
                                return (
                                  <TodoItem
                                    loginMemberId={memberId}
                                    key={data.todoId}
                                    data={data}
                                    setChanged={setChanged}
                                  />
                                );
                              })}
                            </List>
                          </StyledContainer>
                        </Grid>
                      </Grid>

                      <NoticeDrawer isOpened={isOpened} setOpened={setOpened} />
                    </ContentContainer>
                  </PageTransition>
                </Grid>
              </Grid>
            </main>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default FrontPage;
