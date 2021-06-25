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
import patientData from '../member/patientData';
import PageHeader from 'components/common/header/PageHeader';
import MenuSidebar from 'components/common/sidebar/MenuSidebar';
import useWindowSize from 'hooks/useWindowSize';
import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';
import StyledButton from 'components/common/button/StyledButton';
import SearchBox from 'components/common/search/SearchBox';
import PatientModal from './modal/Modal';
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
  const [searchVal, setSearchVal] = useState('');
  const [isOpened, setOpened] = useState(false);
  const [address, setAddress] = useState({});

  useEffect(() => {
    console.log(searchVal);
  }, [searchVal]);
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
                <Grid item xs={12}>
                  <TableContainer style={{ marginTop: '1rem' }}>
                    <Table style={{ minWidth: '600px', overflowX: 'scroll' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell component="td">직책</TableCell>
                          <TableCell component="td">직원 이름</TableCell>
                          <TableCell component="td">이메일</TableCell>
                          <TableCell component="td">주소</TableCell>
                          <TableCell component="td"></TableCell>
                          <TableCell component="td"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {patientData.map((data) => (
                          <Fragment>
                            <TableRow>
                              <TableCell component="th">
                                {data.member_authority === 'ROLE_DOCTOR'
                                  ? '의사'
                                  : ''}
                                {data.member_authority === 'ROLE_INSPECTOR'
                                  ? '검사자'
                                  : ''}
                                {data.member_authority === 'ROLE_NURSE'
                                  ? '간호사'
                                  : ''}
                              </TableCell>
                              <TableCell component="th">
                                {data.member_name}
                              </TableCell>
                              <TableCell component="th">
                                {data.member_email}
                              </TableCell>
                              <TableCell component="th">
                                {data.member_address}
                              </TableCell>
                              <TableCell component="th">
                                <StyledButton
                                  bgColor="rgb(11, 83, 151)"
                                  color="white"
                                >
                                  변경
                                </StyledButton>
                              </TableCell>
                              <TableCell component="th">
                                <StyledButton
                                  bgColor="rgb(228, 20, 30)"
                                  color="white"
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
              </Grid>
              <PatientDrawer
                isOpened={isOpened}
                setOpened={setOpened}
                address={address}
                setAddress={setAddress}
              />
              <PatientModal setAddress={setAddress} />
            </ContentContainer>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default PatientPage;
