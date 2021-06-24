import React, { Fragment, useEffect, useState } from 'react';
import { TablePagination } from '@material-ui/core';

import { BsPencilSquare } from 'react-icons/bs';
import SearchBox from 'components/common/search/SearchBox';
import NoticeDrawerItem from 'components/dashboard/NoticeDrawerItem';
import StyledButton from 'components/common/button/StyledButton';

// const noticeItems = [
//   {
//     notice_id: 1,
//     notice_title: '종현이 멋죠요.',
//     notice_date: '6월 21일',
//     notice_author: 'Dr. Hong',
//   },
//   {
//     notice_id: 2,
//     notice_title: '가즈아.',
//     notice_date: '6월 9일',
//     notice_author: 'Dr. Hong',
//   },
//   {
//     notice_id: 3,
//     notice_title: '가즈아.',
//     notice_date: '6월 9일',
//     notice_author: 'Dr. Hong',
//   },
//   {
//     notice_id: 4,
//     notice_title: '가즈아.',
//     notice_date: '6월 9일',
//     notice_author: 'Dr. Hong',
//   },
//   {
//     notice_id: 5,
//     notice_title: '가즈아.',
//     notice_date: '6월 9일',
//     notice_author: 'Dr. Hong',
//   },
//   {
//     notice_id: 6,
//     notice_title: '가즈아.',
//     notice_date: '6월 9일',
//     notice_author: 'Dr. Hong',
//   },
// ];

const NoticeDrawerMain = ({ setActiveStep, noticeItems, setNotice }) => {
  const [searchVal, setSearchVal] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChange = (e) => {
    setSearchVal(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    console.log(searchVal);
  }, [searchVal]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClick = (data) => {
    console.log('asdasdasd', data);
    setNotice(data);
    setActiveStep('READ');
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const matchData = noticeItems.filter((noticeItems) =>
    noticeItems.notice_title.includes(searchVal),
  );
  return (
    <Fragment>
      <div style={{ marginTop: '3rem', display: 'flex' }}>
        {/* <button onClick={() => setActiveStep('what')}>hello world</button> */}
        <div style={{ flex: 1, alignSelf: 'center', marginRight: '20px' }}>
          <StyledButton
            bgColor="rgb(226,153,51)"
            color="white"
            width="100%"
            onClick={() => setActiveStep('WRITE')}
          >
            <BsPencilSquare style={{ marginRight: '5px' }} />
            글쓰기
          </StyledButton>
        </div>
        <div style={{ flex: 4 }}>
          <SearchBox
            onChange={handleChange}
            setSearchVal={setSearchVal}
            placeholder="제목을 입력해주세요."
          />
        </div>
      </div>
      <NoticeDrawerItem>
        {matchData
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((data) => (
            <Fragment>
              <div style={{ display: 'flex', marginTop: '10px' }}>
                <div className="left-side" style={{ flex: 2 }}>
                  <div className="avatar-container">
                    <img
                      src="/assets/image/doctorface.png"
                      alt="Logo"
                      width="25"
                    />
                    <h4 style={{ marginLeft: '5px' }}>{data.notice_author}</h4>
                  </div>
                  <div className="textTitle-container">
                    <div
                      align="left"
                      onClick={() => {
                        handleClick(data);
                      }}
                    >
                      {data.notice_title}
                    </div>
                  </div>
                  <div className="textContent-container">
                    <div align="left">{data.notice_content}</div>
                  </div>
                  <div className="textDate-container">
                    <div align="left">{data.notice_date}</div>
                  </div>
                </div>
                <div className="right-side" style={{ flex: 1 }}>
                  <img src="/assets/image/hell.jpg" alt="Logo" width="100%" />
                </div>
              </div>
            </Fragment>
          ))}
      </NoticeDrawerItem>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={matchData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Fragment>
  );
};

export default NoticeDrawerMain;
