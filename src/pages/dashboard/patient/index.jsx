import React, { useState, useEffect, Fragment } from 'react';
import {
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getPatientsList, getSearchPatientList } from 'apis/patientAPI';
import PatientDrawer from '../../../components/patient/drawer/PatientDrawer';
import PatientUpdateDrawer from '../../../components/patient/drawer/PatientUpdateDrawer';
import { GrPowerReset } from 'react-icons/gr';
import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';
import StyledButton from 'components/common/button/StyledButton';
import SearchBox from 'components/common/search/SearchBox';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';
import PageTransition from 'components/common/transition/PageTransition';
import ClockSpinner from 'components/common/spinner/ClockSpinner';
import moment from 'moment';

/**
 * 이 페이지 컴포넌트는 환자 관리 페이지를 작성하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * Sider
 * * Header
 * * 환자 관리 (PatientSearch, Table, ColoredButton)
 * @returns {JSX.Element}
 * @author SI HYUN PARK
 */
const PatientPage = () => {
  // 환자 추가시 환자의 정보를 입력하는 드로어에 대한 open/close 여부 상태 데이터
  const [isOpened, setOpened] = useState(false);

  // 환자 정보 변경시 내용을 변경을 하기 위한 드로어에 대한 open/close 여부 상태 데이터
  const [isUpdateOpened, setUpdateOpened] = useState(false);

  // 수정 드로어에 세팅할 환자정보
  const [readPatientData, setReadPatientData] = useState({});

  // 데이터베이스에서 환자에 대한 정보 객체를 담을 상태 데이터 ([{환자1}, {환자2}.....])
  const [patientData, setPatients] = useState([]);

  // spinner를 나타내는 상태데이터
  const [isLoading, setLoading] = useState(true);

  // 추가 수정할때 addDisplay의 값은 변경이 된다. 그리고 변경됨에 따라 환자 리스트를 다시 불러오기 위해 설정한 상태 데이터
  const [addDisplay, setDisplay] = useState(false);

  // 로그인 유저에 대한 정보
  const loginInfo = useSelector((state) => state.common.loginInfo);

  // 처음 렌더링 되었을 때, 환자의 데이터를 불러온다
  useEffect(() => {
    const getPatient = async () => {
      try {
        const { data } = await getPatientsList(loginInfo.hospitalCode);
        setPatients(data.data);
      } catch (error) {
        console.log(error);
        setPatients([]);
        setLoading(false);
      }
    };
    getPatient();
  }, [loginInfo]);

  // 환자의 데이터(patientData)가 변경됨에 따라 isLoading이 false 값 세팅 해준다
  useEffect(() => {
    if (patientData.length > 0) {
      setLoading(false);
    }
  }, [patientData]);

// 추가, 수정시 addDisplay 값이 변경된다, 그렇게 되면 다시 환자데이터를 불러와 뷰에 세팅한다
  useEffect(() => {
    if(addDisplay) {
      setLoading(true);
      const getAddPatient = async () => {
        try {
          const { data } = await getPatientsList(loginInfo.hospitalCode);
          setPatients(data.data);
        } catch (error) {
          console.log(error);
          setPatients([]);
          setLoading(false);
        }
      };
      getAddPatient();
      setDisplay(false);
    }
  }, [addDisplay, loginInfo])

  const resetOnClick = async () => {
      setLoading(true);
      try {
          const { data } = await getPatientsList(loginInfo.hospitalCode);
          setPatients(data.data);
        } catch (error) {
          console.log(error);
          setPatients([]);
          setLoading(false);
        }
  }


  // 환자 이름 검색을 통해 가져온 환자 리스트
  const setSearchVal = async (inputVal) => {
    
    setLoading(true);
    try {
      const { data } = await getSearchPatientList({
        hospitalCode: loginInfo.hospitalCode,
        patientName: inputVal,
      });
      setPatients(data.data);
    } catch (error) {
      setPatients([]);
      console.log(error.response.data);
      setLoading(false);
     
    }
  };
  // 스피너 컴포넌트
  const clockSpinner = () => {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ClockSpinner isLoading={isLoading} />
      </div>
    );
  };

  return (
    <div>
      <header
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1,
        }}
      >
        <ResponsivePageHeader />
      </header>
      <main>
        <Grid container>
          <Grid item xs={12}>
            <PageTransition>
              <ContentContainer>
                <TitleHeader>
                  <span>환자 | </span>
                  <span>환자 관리</span>
                </TitleHeader>
                <br />
                <Grid container justify="center" >
                  <Grid item xs={8} lg={6}>
                    <SearchBox
                      setSearchVal={setSearchVal}
                      placeholder="환자 이름을 입력해주세요."
                    />
                  </Grid>
                  <Grid item xs={2} lg={2} >
                    <IconButton
                      type="button"
                      size="medium"
                      style={{
                        border: '1px solid rgba(0,0,0,0.12)',
                        marginLeft: '0.5rem',
                        marginRight: '0.5rem',
                        marginTop : '0.5rem'
                      }}
                      onClick={resetOnClick}
                    >
                      <GrPowerReset />
                    </IconButton>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    lg={4}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <StyledButton
                      width="100px"
                      bgColor="rgb(30, 51, 71)"
                      color="white"
                      onClick={() => {
                        setOpened(true);
                      }}
                    >
                      추가
                    </StyledButton>
                  </Grid>
                  {isLoading && clockSpinner()}

                  <Grid item xs={12}>
                    {!isLoading && patientData.length === 0 && (
                      <Grid container alignItems="center" justify="center">
                        <Grid
                          item
                          xs={5}
                          md={5}
                          lg={6}
                          xl={6}
                          style={{
                            textAlign: 'center',
                          }}
                        >
                          <h1
                            style={{
                              fontWeight: 'bold',
                            }}
                          >
                            데이터가 없습니다
                          </h1>
                        </Grid>
                        <Grid
                          item
                          xs={7}
                          md={7}
                          lg={6}
                          xl={6}
                          style={{ marginTop: '2em' }}
                        >
                          <img
                            src="/assets/image/pleaseSearching.png"
                            width="60%"
                            alt="searching"
                          />
                        </Grid>
                      </Grid>
                    )}
                    {!isLoading && patientData.length > 0 && (
                      <TableContainer style={{ marginTop: '1rem' }}>
                        <Table
                          style={{ minWidth: '600px', overflowX: 'scroll' }}
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell component="td">번호</TableCell>
                              <TableCell component="td">이름</TableCell>
                              <TableCell component="td">생년월일</TableCell>
                              <TableCell component="td">주소</TableCell>
                              <TableCell component="td"></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {patientData.map((data) => (
                              <Fragment key={data.patientId}>
                                <TableRow>
                                  <TableCell component="th">
                                    {data.patientId}
                                  </TableCell>
                                  <TableCell component="th">
                                    {data.patientName}
                                  </TableCell>
                                  <TableCell component="th">
                                    {moment(data.patientBirth).format(
                                      'yyyy년 MM월 DD일',
                                    )}
                                  </TableCell>
                                  <TableCell component="th">
                                    {data.patientAddr2 === undefined &&
                                      data.patientAddr1}
                                    {data.patientAddr2 !== undefined &&
                                      data.patientAddr1 +
                                        ' ' +
                                        data.patientAddr2}
                                  </TableCell>
                                  <TableCell component="th">
                                    <StyledButton
                                      bgColor="rgb(11, 83, 151)"
                                      color="white"
                                      onClick={() => {
                                        setUpdateOpened(true);
                                        setReadPatientData(data);
                                      }}
                                    >
                                      변경
                                    </StyledButton>
                                  </TableCell>
                                </TableRow>
                              </Fragment>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </Grid>
                </Grid>
              </ContentContainer>
            </PageTransition>
          </Grid>
        </Grid>
      </main>
      {/* 환자를 추가할때 나타나는 드로어 */}
      <PatientDrawer
        isOpened={isOpened}
        setOpened={setOpened}
        setDisplay={setDisplay}
      />
      {/* 환자를 수정할때 나타나는 드로어 */}
      <PatientUpdateDrawer
        isUpdateOpened={isUpdateOpened}
        setUpdateOpened={setUpdateOpened}
        readPatientData={readPatientData}
        setDisplay={setDisplay}
      />
    </div>
  );
};

export default PatientPage;
