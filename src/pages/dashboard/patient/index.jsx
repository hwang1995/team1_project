import React, { useState, useEffect, Fragment } from 'react';
import {
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import PatientDrawer from '../../../components/patient/drawer/PatientDrawer';
import PatientUpdateDrawer from '../../../components/patient/drawer/PatientUpdateDrawer';

import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';
import StyledButton from 'components/common/button/StyledButton';
import SearchBox from 'components/common/search/SearchBox';
import DeleteModal from 'components/patient/modal/DeleteModal';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';
import PageTransition from 'components/common/transition/PageTransition';

/**
 * 이 페이지 컴포넌트는 환자 관리 페이지를 작성하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * Sider
 * * Header
 * * 환자 관리 (PatientSearch, Table, ColoredButton)
 * @returns {JSX.Element}
 */
const PatientPage = () => {
  const [isOpened, setOpened] = useState(false);
  const [isUpdateOpened, setUpdateOpened] = useState(false);
  const [readPatientData, setReadPatientData] = useState({});
  const [patientData, setPatients] = useState([]);
  const [deleteOpened, setDeleteOpened] = useState(false);

  useEffect(() => {
    /// 수정
    const newInfoData = patientData.map((patientInfo) => {
      if (patientInfo.patient_id === readPatientData.patient_id) {
        const newInfo = readPatientData;
        return newInfo;
      } else {
        return patientInfo;
      }
    });
    setPatients(newInfoData);
  }, [readPatientData]);

  const dateRemoveClick = (data) => {
    const removeDataInfo = patientData.filter((patientInfo) => {
      if (patientInfo.patient_id === data.patient_id) {
        return false;
      }
      return true;
    });
    setPatients(removeDataInfo);
  };
  const dateIndexRemoveClick = (data) => {
    dateRemoveClick(data);
    setDeleteOpened(true);
  };

  const setSearchVal = (inputVal) => {
    const newInfoData = patientData.filter((patientInfo) => {
      if (patientInfo.patient_name === inputVal) {
        return true;
      }
      return false;
    });
    console.log('newInfo', newInfoData.length);
    setPatients(newInfoData);
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
                <Grid container>
                  <Grid item xs={9} lg={6}>
                    <SearchBox
                      setSearchVal={setSearchVal}
                      placeholder="환자 이름을 입력해주세요."
                    />
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    lg={6}
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
                    </Grid>
                  ) : (
                    <Grid item xs={12}>
                      <TableContainer style={{ marginTop: '1rem' }}>
                        <Table
                          style={{ minWidth: '600px', overflowX: 'scroll' }}
                        >
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
                                        dateIndexRemoveClick(data);
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
              </ContentContainer>
            </PageTransition>
          </Grid>
        </Grid>
      </main>
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
      <DeleteModal
        deleteOpened={deleteOpened}
        setDeleteOpened={setDeleteOpened}
      />
    </div>
  );
};

export default PatientPage;
