import React, { useState, Fragment } from 'react';
import {
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setDiagnosisHistoryDrawer } from 'redux/features/history/diagnosisSlice';
import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';
import SearchBox from 'components/common/search/SearchBox';
import StyledButton from 'components/common/button/StyledButton';
import patientData from './patientData';
import DiagnosisHistoryDrawer from './DiagnosisHistoryDrawer';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';
import PageTransition from 'components/common/transition/PageTransition';

const DiagnosisHistoryPage = () => {
  const [isOpened, setOpened] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const matchData = patientData.filter((patientData) =>
    patientData.patient_name.includes(searchVal),
  );

  const showAll = (event) => {
    setSearchVal('');
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
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
                  <span>진료 | </span>
                  <span>진료 기록 보기</span>
                </TitleHeader>
                <br />
                <Grid container>
                  <Grid item xs={9} lg={4}>
                    <SearchBox
                      setSearchVal={setSearchVal}
                      placeholder="환자 이름을 입력하세요."
                    />
                  </Grid>
                  <Grid item xs={3} lg={1}>
                    <StyledButton
                      bgColor="#1E4C7C"
                      color="white"
                      onClick={showAll}
                      style={{ marginLeft: '10px', marginTop: '10px' }}
                    >
                      전체 환자 목록
                    </StyledButton>
                  </Grid>
                  <Grid item xs={12}>
                    <TableContainer style={{ marginTop: '1rem' }}>
                      <Table style={{ minWidth: '600px', overflowX: 'scroll' }}>
                        <TableHead>
                          <TableRow>
                            <TableCell component="td">순번</TableCell>
                            <TableCell component="td">이름</TableCell>
                            <TableCell component="td">생년월일</TableCell>
                            <TableCell component="td">성별</TableCell>
                            <TableCell component="td">연락처</TableCell>
                            <TableCell component="td">주소</TableCell>
                            <TableCell component="td"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {matchData
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage,
                            )
                            .map((data) => (
                              <Fragment>
                                <TableRow>
                                  <TableCell component="th">
                                    {data.patient_id}
                                  </TableCell>
                                  <TableCell component="th">
                                    {data.patient_name}
                                  </TableCell>
                                  <TableCell component="th">
                                    {data.patient_ssn}
                                  </TableCell>
                                  <TableCell component="th">
                                    {data.patient_gender}
                                  </TableCell>
                                  <TableCell component="th">
                                    {data.patient_tel}
                                  </TableCell>
                                  <TableCell component="th">
                                    {data.patient_addr1}
                                  </TableCell>
                                  <TableCell component="th">
                                    <StyledButton
                                      bgColor="#1E4C7C"
                                      color="white"
                                      onClick={() =>
                                        dispatch(
                                          setDiagnosisHistoryDrawer(true),
                                        )
                                      }
                                    >
                                      상세 보기
                                    </StyledButton>
                                  </TableCell>
                                </TableRow>
                              </Fragment>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                <DiagnosisHistoryDrawer
                  isOpened={isOpened}
                  setOpened={setOpened}
                />
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={matchData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </ContentContainer>
            </PageTransition>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default DiagnosisHistoryPage;
