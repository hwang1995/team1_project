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
import patientData from './patientData';
import PageHeader from 'components/common/header/PageHeader';
import MenuSidebar from 'components/common/sidebar/MenuSidebar';
import useWindowSize from 'hooks/useWindowSize';
import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';
import SearchBox from 'components/common/search/SearchBox';
import DiagnosticDrawer from './DiagnosticDrawer';
import StyledButton from 'components/common/button/StyledButton';
import TablePagination from '@material-ui/core/TablePagination';

/**
 * 이 페이지 컴포넌트는 진단 검사 페이지를 작성하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * 진단 검사 (PatientSearch, ColoredButton, Table, DiagnosticDrawer )
 * * Sider
 * * Header
 * @returns {JSX.Element}
 */
const DiagnosticPage = () => {
  
  const { breakpoint } = useWindowSize();
  const [isOpened, setOpened] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  
  const matchData = patientData.filter((patientData) =>
  patientData.patient_name.includes(searchVal),
  );

  useEffect(() => {
    console.log(searchVal);
  }, [searchVal]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <div>
      {/* DiagnosticPage를 작성합니다. 들어가야할 컴포넌트는 위의 주석에 설명되어
      있으니 참조하시면 됩니다. */}
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
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                    setOpened((prevState) => !prevState)
                                  }
                                >
                                  상세 보기
                                </StyledButton >
                              </TableCell>
                            </TableRow>
                            
                          </Fragment>
                        ))}
                      </TableBody>
                      
                    </Table>
                    
                  </TableContainer>
                  
                </Grid>
              </Grid>
              <DiagnosticDrawer isOpened={isOpened} setOpened={setOpened} />
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
            
          </Grid>
        </Grid>
        
      </main>
    </div>
  );
};

export default DiagnosticPage;
