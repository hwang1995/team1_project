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
} from '@material-ui/core';
//import patientData from './patientData';
import memberData from './memberData';
import PageHeader from 'components/common/header/PageHeader';
import MenuSidebar from 'components/common/sidebar/MenuSidebar';
import useWindowSize from 'hooks/useWindowSize';
import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';
import SearchBox from 'components/common/search/SearchBox';
import MemberDrawer from 'components/member/drawer/MemberDrawer';
import StyledButton from 'components/common/button/StyledButton';
import MemberUpdateDrawer from 'components/member/drawer/MemberUpdateDrawer';
import DeleteModal from 'components/member/modal/DeleteModal';
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

  //검색했을때 동작
  useEffect(() => {
    console.log(searchVal);
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
                  <Paper>
                    <TableContainer
                      style={{ marginTop: '1rem', marginBottom: '1rem' }}
                    >
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
                          {member
                            .filter(function (element) {
                              //새로운 배열을 만들어줌
                              return element.member_name.includes(searchVal);
                            })
                            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                            .map((data) => (
                              <Fragment key={data.member_id}>
                                <TableRow hover="true">
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
                                      bgColor="rgb(228, 20, 30)"
                                      color="white"
                                      onClick={() => {
                                        setOpenModal((prevState) => !prevState);
                                        setSelectedData(data.member_id);
                                      }}
                                    >
                                      삭제
                                    </StyledButton>
                                  </TableCell>
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
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default MemberPage;
