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
  TableFooter,
  TablePagination,
  Modal,
  Paper,
  Button,
  IconButton,
  Avatar,
} from '@material-ui/core';
//import patientData from './patientData';
import memberData from './memberData';
import { useSnackbar } from 'notistack';
import useWindowSize from 'hooks/useWindowSize';
import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';
import SearchBox from 'components/common/search/SearchBox';
import MemberDrawer from 'components/member/drawer/MemberDrawer';
import StyledButton from 'components/common/button/StyledButton';
import MemberUpdateDrawer from 'components/member/drawer/MemberUpdateDrawer';
import DeleteModal from 'components/member/modal/DeleteModal';
import { BiRefresh } from 'react-icons/bi';
import { FiRefreshCcw } from 'react-icons/fi';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';
import PageTransition from 'components/common/transition/PageTransition';
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
  const [isUpdateOpened, setUpdateOpened] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const [selectedData, setSelectedData] = useState('');
  const [member, setMember] = useState(memberData);

  //page설정 상태관리
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isOpenModal, setOpenModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };
  //페이지상태 이벤트(페이지 이동시)
  const handleChangePage = (event, newPage) => {
    console.log('newPage: ', newPage);
    setPage(newPage);
  };

  //페이지당 보여줄 컬럼개수
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //비밀번호 초기화
  const handleInitPassword = (data) => {
    const initialPW = 'douzone123!';
    data.member_pw = initialPW;
    handleAlert(
      'success',
      `${data.member_name}님의 비밀번호가 초기화되었습니다. (${initialPW})`,
    );
  };

  const handleRefresh = () => {
    setPage(0);
    setSearchVal('');
  };
  //검색했을때 동작
  useEffect(() => {
    console.log(searchVal);
    setPage(0);
  }, [searchVal]);

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
                  <Grid item xs={1} lg={2}>
                    <IconButton
                      color="primary"
                      size="medium"
                      onClick={handleRefresh}
                      style={{ marginLeft: '20px', marginTop: '10px' }}
                    >
                      <FiRefreshCcw />
                    </IconButton>
                  </Grid>
                  <Grid
                    item
                    xs={2}
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
                      onClick={() => setOpened((prevState) => !prevState)}
                    >
                      추가
                    </StyledButton>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper>
                      <TableContainer
                        style={{ marginTop: '1rem', marginBottom: '1rem' }}
                      >
                        <Table
                          style={{ minWidth: '600px', overflowX: 'scroll' }}
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell
                                component="td"
                                style={{
                                  minWidth: '40px',
                                  overflowX: 'scroll',
                                }}
                              >
                                직책
                              </TableCell>
                              <TableCell
                                component="td"
                                style={{
                                  minWidth: '50px',
                                  overflowX: 'scroll',
                                }}
                              ></TableCell>
                              <TableCell
                                component="td"
                                style={{
                                  minWidth: '100px',
                                  overflowX: 'scroll',
                                }}
                              >
                                이름{'&'}생년월일
                              </TableCell>
                              <TableCell
                                component="td"
                                style={{
                                  minWidth: '100px',
                                  overflowX: 'scroll',
                                }}
                              >
                                이메일
                              </TableCell>
                              <TableCell
                                component="td"
                                style={{
                                  minWidth: '200px',
                                  overflowX: 'scroll',
                                }}
                              >
                                주소
                              </TableCell>
                              <TableCell
                                component="td"
                                style={{
                                  minWidth: '100px',
                                  overflowX: 'scroll',
                                }}
                              ></TableCell>
                              <TableCell
                                component="td"
                                style={{
                                  minWidth: '100px',
                                  overflowX: 'scroll',
                                }}
                              ></TableCell>
                              <TableCell
                                component="td"
                                style={{
                                  minWidth: '100px',
                                  overflowX: 'scroll',
                                }}
                              ></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {member
                              .filter(function (element) {
                                //새로운 배열을 만들어줌
                                return element.member_name.includes(searchVal);
                              })
                              .slice(
                                page * rowsPerPage,
                                (page + 1) * rowsPerPage,
                              )
                              .map((data) => (
                                <Fragment key={data.member_id}>
                                  <TableRow hover="true">
                                    <TableCell component="th">
                                      {data.member_authority ===
                                        'ROLE_DOCTOR' && '의사'}
                                      {data.member_authority ===
                                        'ROLE_INSPECTOR' && '검사자'}
                                      {data.member_authority === 'ROLE_NURSE' &&
                                        '간호사'}
                                    </TableCell>
                                    <TableCell component="th">
                                      <Avatar src={data.member_image} />
                                    </TableCell>
                                    <TableCell component="th">
                                      <p
                                        style={{
                                          marginBottom: '0.325rem',
                                        }}
                                      >
                                        {data.member_name}
                                      </p>

                                      <Divider />

                                      <p
                                        style={{
                                          marginTop: '0.325rem',
                                        }}
                                      >
                                        {' '}
                                        {data.member_birth}
                                      </p>
                                    </TableCell>
                                    <TableCell component="th">
                                      {data.member_email}
                                    </TableCell>
                                    <TableCell component="th">
                                      {data.member_addr1} {data.member_addr2}
                                    </TableCell>
                                    <TableCell component="th">
                                      <StyledButton
                                        bgColor="rgb(11, 83, 151)"
                                        color="white"
                                        onClick={() => {
                                          setUpdateOpened(
                                            (prevState) => !prevState,
                                          );
                                          setSelectedData(data);
                                        }}
                                      >
                                        변경
                                      </StyledButton>
                                    </TableCell>
                                    <TableCell component="th">
                                      <StyledButton
                                        bgColor="rgba(165, 10, 17, 0.637)"
                                        color="white"
                                        onClick={() => {
                                          setOpenModal(
                                            (prevState) => !prevState,
                                          );
                                          setSelectedData(data.member_id);
                                        }}
                                      >
                                        삭제
                                      </StyledButton>
                                    </TableCell>
                                    <TableCell component="th">
                                      <Button
                                        size="small"
                                        bgColor="rgba(11, 131, 31, 0.795)"
                                        color="white"
                                        onClick={() => {
                                          handleInitPassword(data);
                                        }}
                                        endIcon={<BiRefresh />}
                                      >
                                        비밀번호 초기화
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                </Fragment>
                              ))}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TablePagination
                                count={
                                  member.filter(function (element) {
                                    //새로운 배열을 만들어줌
                                    return element.member_name.includes(
                                      searchVal,
                                    );
                                  }).length
                                }
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                rowsPerPageOptions={[5, 10, 25]}
                              />
                            </TableRow>
                          </TableFooter>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                </Grid>

                {/* 추가 Drawer 
                  isOpened, setOpened: Drawer 오픈상태 
                  setMember: memberData에 대한 정보 수정에 대한 상태setter전달
              */}
                <MemberDrawer
                  isOpened={isOpened}
                  setOpened={setOpened}
                  member={member}
                  setMember={setMember}
                />
                {/* 수정 Drawer 
                  isUpdateOpened, setUpdateOpened: Drawer 오픈상태
                  memberData: 선택한 멤버정보 전달
                  setMember: memberData에 대한 정보 수정에 대한 상태setter전달
              */}
                <MemberUpdateDrawer
                  isUpdateOpened={isUpdateOpened}
                  setUpdateOpened={setUpdateOpened}
                  memberData={selectedData}
                  member={member}
                  setMember={setMember}
                />
                {/* 삭제 Modal */}
                <DeleteModal
                  isOpenModal={isOpenModal}
                  setOpenModal={setOpenModal}
                  member={member}
                  member_id={selectedData}
                  setMember={setMember}
                />
              </ContentContainer>
            </PageTransition>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default MemberPage;
