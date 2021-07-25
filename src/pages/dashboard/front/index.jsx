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
import parse from 'html-react-parser';
import 'react-calendar/dist/Calendar.css';
import NoticeItem from 'components/dashboard/NoticeItem';
import ContentContainer from 'components/common/container/ContentContainer';
import StyledContainer from 'components/common/container/StyledContainer';
import StyledTypography from 'components/common/typography/StyledTypography';
import StyledButton from 'components/common/button/StyledButton';
import NoticeDrawer from 'components/notice/drawer/NoticeDrawer';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';
import PageTransition from 'components/common/transition/PageTransition';
import InputBox from 'components/todo/InputTodoBox';
import TitleHeaderDashBoard from 'pages/dashboard/front/TitleHeaderDashBoard';
import TodoItem from 'components/dashboard/TodoItem';
import moment from 'moment';
import DashBoardSpinner from 'components/common/spinner/BeatSpinner';
import { setActiveStep } from 'redux/features/notice/noticeSlice';
/**
 * 이 페이지 컴포넌트는 대쉬보드의 메인을 보여주기 위해 작성하는 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * - Sider
 * - Header
 * - 공지사항
 * - CORONA
 * - Calendar
 * - TodoItem
 * - InputBox
 * - ColoredContainer
 * @returns {JSX.Element}
 * @author HYEONG YUN KIM
 */

const FrontPage = () => {
  // NoticeDrawer의 Open 여부를 설정하기 위한 State
  const [isOpened, setOpened] = useState(false);
  // Data Picker 클릭 시 변경된 date를 설정하기 위한 State
  const [date, changeDate] = useState(new Date());
  // 할 일의 입력값을 받기위한 State
  const [todoinput, setTodoInput] = useState('');
  // 공지사항 리스트를 저장하기 위한 State
  const [notice, setNotice] = React.useState([]);
  // 할 일 리스트를 저장하기 위한 State
  const [todo, setTodo] = React.useState([]);
  // 자식 컴포넌트의 값이 변경될 경우 useEffect가 이를 감지하여 렌더링하기 위한 State
  const [changed, setChanged] = useState(false);
  // 병원 정보를 저장하기 위한 State
  const [hospital, setHospital] = useState('');
  // 코로나 정보를 저장하기 위한 State
  const [corona, setCorona] = useState('');
  // 할 일, 전체의 할 일의 텍스트 Weight를 설정하기 위한 State
  const [mineText, setMineText] = useState(700);
  const [allText, setAllText] = useState(300);
  // Spinner의 Loading 여부를 설정하기 위한 State
  const [isLoading, setLoading] = useState(true);

  // 리덕스에 저장되어 있는 값들 불러오기
  const dispatch = useDispatch();
  const hospitalCode = useSelector(
    (state) => state.common.loginInfo.hospitalCode,
  );
  const memberName = useSelector((state) => state.common.loginInfo.memberName);
  const memberId = useSelector((state) => state.common.loginInfo.memberId);

  // NoticeDrawer가 open될 시 변화를 감지
  useEffect(() => {
    console.log('변화가 일어났어요.', isOpened);
  }, [isOpened]);

  // 코로나, 공지사항, 병원, TODO의 데이터를 불러올 때까지
  // Spinner가 실행되도록 한다. changed의 상태값이 변할 경우 렌더링하도록 한다.
  useEffect(() => {
    setLoading(true);
    const getNoticeAndTodoAndCorona = async () => {
      try {
        // 1. 코로나 데이터 가져오기
        const from = moment()
          .subtract(3, 'days')
          .startOf('day')
          .format('YYYY-MM-DDTHH:mm:ss');
        const to = moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss');
        console.log('from :', from);

        console.log('to :', to);
        const coronaContent = await getCoronaData(from, to);
        setCorona(coronaContent);
        console.log('coronaContent : ', coronaContent);

        // 2. 공지사항 가져오기
        const noticeContent = await getNoticesList(hospitalCode);
        setNotice(noticeContent.data.data);

        // 3 병원정보 가져오기
        const hospitalContent = await getHospitalInfo(hospitalCode);
        setHospital(hospitalContent.data.data);
        console.log(hospitalContent.data);

        // 4 투두 가져오기
        const todoContent = await getTodosListByMemberId(memberId);
        setTodo(todoContent.data.data);
        setChanged(false);

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

      setTodo(response.data.data);

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

      setTodo(response.data.data);
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
                                weight={5}
                                style={{ marginTop: '1rem' }}
                              >
                                {parse(hospital.hospitalDescription)}
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
                            {console.log('notice.length', notice.length)}
                            {notice.length !== 0 ? (
                              notice
                                .filter((data, index) => {
                                  if (index < 4) {
                                    return true;
                                  }
                                  return false;
                                })
                                .map((data) => {
                                  return (
                                    <NoticeItem
                                      key={data.noticeId}
                                      data={data}
                                    />
                                  );
                                })
                            ) : (
                              <TitleHeaderDashBoard>
                                <span>등록된 공지사항이 없습니다.</span>
                                <img
                                  src="/assets/image/notFound.png"
                                  alt="Logo"
                                  width="50%"
                                />
                              </TitleHeaderDashBoard>
                            )}
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
                              <div style={{ display: 'flex' }}>
                                {
                                  corona.data[
                                    corona.data.length - 1
                                  ].Date.split('T00:00:00Z')[0]
                                }{' '}
                                기준
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
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <AiFillCaretUp />
                                    <span
                                      style={{
                                        fontSize: '1.3rem',
                                        marginLeft: '0.3rem',
                                      }}
                                    >
                                      {corona.data[corona.data.length - 1]
                                        .Confirmed -
                                        corona.data[corona.data.length - 2]
                                          .Confirmed}
                                    </span>
                                  </div>
                                  <div>
                                    {corona.data[
                                      corona.data.length - 1
                                    ].Confirmed.toString()}
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
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <AiFillCaretUp />
                                    <span
                                      style={{
                                        fontSize: '1.3rem',
                                        marginLeft: '0.3rem',
                                      }}
                                    >
                                      {(
                                        corona.data[corona.data.length - 1]
                                          .Recovered -
                                        corona.data[corona.data.length - 2]
                                          .Recovered
                                      ).toString()}
                                    </span>
                                  </div>
                                  <div>
                                    {corona.data[
                                      corona.data.length - 1
                                    ].Recovered.toString()}
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
                                  사망자
                                  <div>
                                    <br />
                                  </div>
                                  <div
                                    style={{
                                      marginBottom: '1.5rem',
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <AiFillCaretUp />
                                    <span
                                      style={{
                                        fontSize: '1.3rem',
                                        marginLeft: '0.3rem',
                                      }}
                                    >
                                      {corona.data[corona.data.length - 1]
                                        .Deaths -
                                        corona.data[corona.data.length - 2]
                                          .Deaths}
                                    </span>
                                  </div>
                                  <div>
                                    {corona.data[
                                      corona.data.length - 1
                                    ].Deaths.toString()}
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
                                  격리중
                                  <div>
                                    <br />
                                  </div>
                                  <div
                                    style={{
                                      marginBottom: '1.5rem',
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <AiFillCaretUp />
                                    <span
                                      style={{
                                        fontSize: '1.3rem',
                                        marginLeft: '0.3rem',
                                        // marginBottom: '0.5rem',
                                      }}
                                    >
                                      {(
                                        corona.data[corona.data.length - 1]
                                          .Active -
                                        corona.data[corona.data.length - 2]
                                          .Active
                                      ).toString()}
                                    </span>
                                  </div>
                                  <div>
                                    {corona.data[
                                      corona.data.length - 1
                                    ].Active.toString()}
                                  </div>
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
                                  <span
                                    style={{ fontWeight: mineText }}
                                    onClick={TodosListByMemberId}
                                  >
                                    나의 할 일 |
                                  </span>
                                  <span
                                    style={{ fontWeight: allText }}
                                    onClick={TodosListByHospitalCode}
                                  >
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
                                  setTodoInput={setTodoInput}
                                  memberId={memberId}
                                  hospitalCode={hospitalCode}
                                  setChanged={setChanged}
                                  memberName={memberName}
                                  placeholder="할 일을 입력해주세요."
                                />
                              </div>
                            </div>
                            <List component="nav">
                              {todo.map((data) => {
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
