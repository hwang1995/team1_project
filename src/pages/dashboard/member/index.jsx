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
import MemberDrawer from 'components/member/drawer/MemberDrawer';
import StyledButton from 'components/common/button/StyledButton';
/**
 * 이 페이지 컴포넌트는 임직원 관리 페이지를 작성하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * Sider
 * * Header
 * * 환자 관리 ( Table, ColoredButton)
 * @returns {JSX.Element}
 */
const MemberPage = () => {
  const { breakpoint } = useWindowSize();
  const [isOpened, setOpened] = useState(false);
  const [searchVal, setSearchVal] = useState('');

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
                <span>병원 | </span>
                <span>임직원 관리</span>
              </TitleHeader>
              <br />
              <Grid container>
                <Grid item xs={9} lg={4}>
                  <SearchBox
                    setSearchVal={setSearchVal}
                    placeholder="임직원 이름을 입력해주세요."
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
                    onClick={() => setOpened((prevState) => !prevState)}
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
                                {/* <button
                                  onClick={() =>
                                    setOpened((prevState) => !prevState)
                                  }
                                >
                                  TEST
                                </button> */}
                              </TableCell>
                            </TableRow>
                          </Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <MemberDrawer isOpened={isOpened} setOpened={setOpened} />
            </ContentContainer>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default MemberPage;
