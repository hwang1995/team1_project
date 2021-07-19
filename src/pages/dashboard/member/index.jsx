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
  Paper,
  Button,
  IconButton,
  Avatar,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
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
import {
  intializeMemberPw,
  showMembersListByHospitalCode,
  showMembersListByNameAndCode,
} from 'apis/memberAPI';
import { useSelector } from 'react-redux';
import PacmanSpinner from 'components/common/spinner/PacmanSpinner';

/**
 * 이 페이지 컴포넌트는 임직원 관리 페이지를 작성하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * Sider
 * * Header
 * * 임직원 관리 ( MemberDrawer, MemberUpdateDrawer, DeleteModal, Table, ColoredButton)
 * @returns {JSX.Element}
 * @author Jong Hyun Hong
 */
const MemberPage = () => {
  const [isOpened, setOpened] = useState(false);
  const [isUpdateOpened, setUpdateOpened] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const [selectedData, setSelectedData] = useState('');
  const [member, setMember] = useState([]);

  //page설정 상태관리
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isOpenModal, setOpenModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  //스피너상태
  const [isLoading, setLoading] = useState(true);

  //현재 사용자
  const currentUser = useSelector((state) => state.common.loginInfo);

  //임직원 정보 가져오기
  async function showMember() {
    try {
      const { data, status } = await showMembersListByHospitalCode(
        currentUser.hospitalCode,
      );
      setMember(data.data);
      setLoading(false);
    } catch (error) {
      handleAlert('error', 'error: 임직원 정보 가져오기');
      setLoading(false);
    }
  }

  // 검색하기
  async function showSearchMember(searchKeyword) {
    if (searchKeyword.trim() === '' || searchKeyword === undefined) {
      return;
    }
    let memberSearchInfo = {
      memberName: searchKeyword,
      hospitalCode: currentUser.hospitalCode,
    };

    try {
      const { data, status } = await showMembersListByNameAndCode(
        memberSearchInfo,
      );
      if (data) {
        // 검색 결과 존재
        setMember(data.data);
      } else {
        //검색 결과 없음
        handleAlert('error', '검색결과가 없습니다.');
        return;
      }
    } catch (error) {
      console.log(error.response.data);
      handleAlert('error', 'error: 검색도중 오류발생');
    }
  }

  //전체 리스트 받아오기
  useEffect(() => {
    setLoading(true);
    showMember();
  }, []);

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  //페이지상태 이벤트(페이지 이동시)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //페이지당 보여줄 컬럼개수
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //비밀번호 초기화
  const handleInitPassword = async (memberData) => {
    try {
      const { data, status } = await intializeMemberPw(memberData.memberId);
      console.log('초기화 결과: ', data);
      handleAlert(
        'success',
        `${memberData.memberName}님의 비밀번호가 초기화되었습니다. (!@#douzone1234)`,
      );
    } catch (error) {
      handleAlert('error', '비밀번호 초기화 중 에러발생');
    }
  };

  //검색 초기화
  const handleRefresh = () => {
    setPage(0);
    setSearchVal('');
    showMember();
  };

  //검색했을때 동작
  useEffect(() => {
    console.log(searchVal);
    setPage(0);
    showSearchMember(searchVal);
    console.log('검색했을때 동작-useEffect[searchVal]');
  }, [searchVal]);

  return (
    <div>
      {isLoading && (
        <div
          style={{
            width: '100%',
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PacmanSpinner />
        </div>
      )}
      {!isLoading && (
        <Fragment>
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
                        {currentUser.memberAuthority === 'ROLE_DEVELOP' ||
                        currentUser.memberAuthority === 'ROLE_DIRECTOR' ? (
                          <StyledButton
                            width="100px"
                            bgColor="rgb(30, 51, 71)"
                            color="white"
                            onClick={() => setOpened((prevState) => !prevState)}
                          >
                            추가
                          </StyledButton>
                        ) : null}
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
                                  {currentUser.memberAuthority ===
                                    'ROLE_DEVELOP' ||
                                  currentUser.memberAuthority ===
                                    'ROLE_DIRECTOR' ? (
                                    <TableCell
                                      component="td"
                                      style={{
                                        minWidth: '100px',
                                        overflowX: 'scroll',
                                      }}
                                    >
                                      이메일{'&'}연락처
                                    </TableCell>
                                  ) : (
                                    <Fragment>
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
                                          minWidth: '100px',
                                          overflowX: 'scroll',
                                        }}
                                      >
                                        연락처
                                      </TableCell>
                                    </Fragment>
                                  )}
                                  <TableCell
                                    component="td"
                                    style={{
                                      minWidth: '200px',
                                      overflowX: 'scroll',
                                    }}
                                  >
                                    주소
                                  </TableCell>
                                  {currentUser.memberAuthority ===
                                    'ROLE_DEVELOP' ||
                                  currentUser.memberAuthority ===
                                    'ROLE_DIRECTOR' ? (
                                    <Fragment>
                                      <TableCell
                                        component="td"
                                        style={{
                                          minWidth: '100px',
                                          overflowX: 'scroll',
                                        }}
                                      ></TableCell>
                                      {/* <TableCell
                                        component="td"
                                        style={{
                                          minWidth: '100px',
                                          overflowX: 'scroll',
                                        }}
                                      ></TableCell> */}
                                      <TableCell
                                        component="td"
                                        style={{
                                          minWidth: '100px',
                                          overflowX: 'scroll',
                                        }}
                                      ></TableCell>
                                    </Fragment>
                                  ) : null}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {member
                                  .slice(
                                    page * rowsPerPage,
                                    (page + 1) * rowsPerPage,
                                  )
                                  .map((data) => (
                                    <Fragment key={data.memberId}>
                                      {console.log('JONG HYUN HAT DA', data)}
                                      <TableRow hover="true">
                                        <TableCell component="th">
                                          {data.memberAuthority ===
                                            'ROLE_DEVELOP' && '개발자'}
                                          {data.memberAuthority ===
                                            'ROLE_DIRECTOR' && '병원장'}
                                          {data.memberAuthority ===
                                            'ROLE_DOCTOR' && '의사'}
                                          {data.memberAuthority ===
                                            'ROLE_INSPECTOR' && '검사자'}
                                          {data.memberAuthority ===
                                            'ROLE_NURSE' && '간호사'}
                                        </TableCell>
                                        <TableCell component="th">
                                          {data.memberImage !== null &&
                                          data.memberImage.trim() !== '' ? (
                                            <Avatar
                                              src={`${process.env.REACT_APP_SERVER_PATH}/image?path=${data.memberImage}`}
                                            />
                                          ) : (
                                            <Avatar
                                              style={{
                                                backgroundColor:
                                                  data.memberColor,
                                              }}
                                            />
                                          )}
                                        </TableCell>
                                        <TableCell component="th">
                                          <p
                                            style={{
                                              marginBottom: '0.325rem',
                                            }}
                                          >
                                            {data.memberName}
                                          </p>
                                          <Divider />
                                          <p
                                            style={{
                                              marginTop: '0.325rem',
                                            }}
                                          >
                                            {' '}
                                            {data.memberBirth}
                                          </p>
                                        </TableCell>
                                        {currentUser.memberAuthority ===
                                          'ROLE_DEVELOP' ||
                                        currentUser.memberAuthority ===
                                          'ROLE_DIRECTOR' ? (
                                          <TableCell component="th">
                                            <p
                                              style={{
                                                marginBottom: '0.325rem',
                                              }}
                                            >
                                              {data.memberEmail}
                                            </p>
                                            <Divider />
                                            <p
                                              style={{
                                                marginTop: '0.325rem',
                                              }}
                                            >
                                              {' '}
                                              {data.memberTel}
                                            </p>
                                          </TableCell>
                                        ) : (
                                          <Fragment>
                                            <TableCell component="th">
                                              {data.memberEmail}
                                            </TableCell>
                                            <TableCell component="th">
                                              {data.memberTel}
                                            </TableCell>
                                          </Fragment>
                                        )}
                                        <TableCell component="th">
                                          {data.memberAddr1} -{' '}
                                          {data.memberAddr2}
                                        </TableCell>
                                        {currentUser.memberAuthority ===
                                          'ROLE_DEVELOP' ||
                                        currentUser.memberAuthority ===
                                          'ROLE_DIRECTOR' ? (
                                          <Fragment>
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
                                            {/* <TableCell component="th">
                                              <StyledButton
                                                bgColor="rgba(165, 10, 17, 0.637)"
                                                color="white"
                                                onClick={() => {
                                                  setOpenModal(
                                                    (prevState) => !prevState,
                                                  );
                                                  setSelectedData(data);
                                                }}
                                              >
                                                삭제
                                              </StyledButton>
                                            </TableCell> */}
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
                                          </Fragment>
                                        ) : null}
                                      </TableRow>
                                    </Fragment>
                                  ))}
                              </TableBody>
                              <TableFooter>
                                <TableRow>
                                  <TablePagination
                                    count={member.length}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={
                                      handleChangeRowsPerPage
                                    }
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
                  currentUser: 현재 회원(병원코드, 이메일, 권한 등) 
              */}
                    <MemberDrawer
                      isOpened={isOpened}
                      setOpened={setOpened}
                      currentUser={currentUser}
                      showMember={showMember}
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
                      currentUser={currentUser}
                      showMember={showMember}
                    />
                    {/* 삭제 Modal */}
                    <DeleteModal
                      isOpenModal={isOpenModal}
                      setOpenModal={setOpenModal}
                      memberData={selectedData}
                      showMember={showMember}
                    />
                  </ContentContainer>
                </PageTransition>
              </Grid>
            </Grid>
          </main>
        </Fragment>
      )}
    </div>
  );
};

export default MemberPage;
