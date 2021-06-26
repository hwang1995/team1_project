import React, { useState, useEffect, Fragment } from 'react';
import {
  Divider,
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import PatientDrawer from './drawer/PatientDrawer';
import PatientUpdateDrawer from './drawer/PatientUpdateDrawer';
import PageHeader from 'components/common/header/PageHeader';
import MenuSidebar from 'components/common/sidebar/MenuSidebar';
import useWindowSize from 'hooks/useWindowSize';
import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';
import StyledButton from 'components/common/button/StyledButton';
import SearchBox from 'components/common/search/SearchBox';

/**
 * 이 페이지 컴포넌트는 환자 관리 페이지를 작성하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * Sider
 * * Header
 * * 환자 관리 (PatientSearch, Table, ColoredButton)
 * @returns {JSX.Element}
 */
const PatientPage = () => {
  const { breakpoint } = useWindowSize();
  const [isOpened, setOpened] = useState(false);
  const [isUpdateOpened, setUpdateOpened] = useState(false);
  const [readPatientData,setReadPatientData] = useState({});
  const [patientData, setPatients] = useState([]);

  
  useEffect(() => { /// 수정
    const newInfoData = patientData.map((patientInfo) => {
      if (patientInfo.patient_id === readPatientData.patient_id) {
        const newInfo = readPatientData;
        return newInfo;
      } else {
        return patientInfo;
      }
    });
    console.log("newinfodata", newInfoData);
    setPatients(newInfoData);
  }, [readPatientData]);



  const dateRemoveClick = (data) => {
    const removeDataInfo = patientData.filter((patientInfo) => {
      if(patientInfo.patient_id === data.patient_id){
        return false;
      }
      return true;
    })
    setPatients(removeDataInfo);
  };

 const setSearchVal = (inputVal) => {
   console.log("inputVal", inputVal)
    const newInfoData = patientData.filter((patientInfo) => {
      if(patientInfo.patient_name === inputVal) {
        return true;
      }
      return false;
    })
    console.log("newInfo", newInfoData.length);
    setPatients(newInfoData);
   
 }

  return (
    <div>
      <header style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>
        <PageHeader />
        <Divider />
      </header>
      <main>
        <Grid container>
          <Grid item xs={0} sm={4} md={3} lg={2}>
            {breakpoint !== 'xs' ? <MenuSidebar /> : ''}
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <ContentContainer>
              <TitleHeader>
                <span>환자 | </span>
                <span>환자 관리</span>
              </TitleHeader>
              <br />
              <Grid container>
                <Grid item xs={9} lg={4}>
                  <SearchBox
                    setSearchVal={setSearchVal}
                    placeholder="환자 이름을 입력해주세요."
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  lg={8}
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
                {patientData.length === 0 ? (
                  <Grid item xs={12}>
                    <div style={{ textAlign: 'center', display: 'flex', marginTop:"1.5em", alignItems:"center" }}>
                      <div style={{ flex:2 }}>
                        <h1 style={{ fontWeight: 'bold' }}>
                          데이터가 없습니다
                        </h1>
                      </div>
                      <div style={{ flex: 3 }}>
                        <img
                          src="/assets/image/pleaseSearching.png"
                          width="70%"
                        />
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <TableContainer style={{ marginTop: '1rem' }}>
                      <Table style={{ minWidth: '600px', overflowX: 'scroll' }}>
                        <TableHead>
                          <TableRow>
                            <TableCell component="td">Id</TableCell>
                            <TableCell component="td">이름</TableCell>
                            <TableCell component="td">생년월일</TableCell>
                            <TableCell component="td">주소</TableCell>
                            <TableCell component="td"></TableCell>
                            <TableCell component="td"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {patientData.map((data) => (
                            <Fragment key={data.patient_id}>
                              <TableRow>
                                <TableCell component="th">
                                  {data.patient_id}
                                </TableCell>
                                <TableCell component="th">
                                  {data.patient_name}
                                </TableCell>
                                <TableCell component="th">
                                  {data.patient_birth}
                                </TableCell>
                                <TableCell component="th">
                                  {data.patient_addr2 === undefined &&
                                    data.patient_addr1}
                                  {data.patient_addr2 !== undefined &&
                                    data.patient_addr1 +
                                      ' ' +
                                      data.patient_addr2}
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
                                <TableCell component="th">
                                  <StyledButton
                                    bgColor="rgb(228, 20, 30)"
                                    color="white"
                                    onClick={() => {
                                      dateRemoveClick(data);
                                    }}
                                  >
                                    삭제
                                  </StyledButton>
                                </TableCell>
                              </TableRow>
                            </Fragment>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                )}
              </Grid>
              <PatientDrawer
                isOpened={isOpened}
                setOpened={setOpened}
                setPatients={setPatients}
                patientData={patientData}
              />
              <PatientUpdateDrawer
                isUpdateOpened={isUpdateOpened}
                setUpdateOpened={setUpdateOpened}
                readPatientData={readPatientData}
                setReadPatientData={setReadPatientData}
                dateRemoveClick={dateRemoveClick}
              />
            </ContentContainer>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default PatientPage;
