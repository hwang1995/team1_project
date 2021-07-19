import React, { Fragment, useEffect, useState } from 'react';
import { IconButton, TablePagination } from '@material-ui/core';
import moment from 'moment';
import { BsPencilSquare } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  setNoticeCurrentIndex,
  setActiveStep,
} from 'redux/features/notice/noticeSlice';
import SearchBox from 'components/common/search/SearchBox';
import NoticeDrawerItem from 'components/dashboard/NoticeDrawerItem';
import StyledButton from 'components/common/button/StyledButton';
import { getNoticesList } from 'apis/noticeAPI';
import { GrPowerReset } from 'react-icons/gr';
/**
 * 이 페이지 컴포넌트는 공지사항 메인을 보여주기 위해 작성하는 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * - Header
 * - NoticeDrawerRead
 * - NoticeDrawerWrite
 * @returns {JSX.Element}
 * @author HYEONG YUN KIM
 */
const NoticeDrawerMain = () => {
  // 공지사항의 제목 검색을 입력하기 위한 State
  const [searchVal, setSearchVal] = useState('');
  // 페이지를 설정하기 위한 State
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // 공지사항 리스트를 저장하기 위한 State
  const [notice, setNotice] = React.useState([]);

  const hospitalCode = useSelector(
    (state) => state.common.loginInfo.hospitalCode,
  );
  const dispatch = useDispatch();
  const buttonSetting = {
    rest: { scale: 1 },
    hover: { scale: 1.2 },
    pressed: { scale: 0.95 },
  };
  const handleChange = (e) => {
    setSearchVal(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    console.log(searchVal);
  }, [searchVal]);

  useEffect(() => {
    const work = async () => {
      try {
        const response = await getNoticesList(hospitalCode);
        setNotice(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    work();
  }, []); //***** [] 없으면 무한실행합니다.

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClick = (data) => {
    dispatch(setNoticeCurrentIndex(data.noticeId));
    dispatch(setActiveStep('READ'));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const matchData = notice.filter((data) =>
    data.noticeTitle.includes(searchVal),
  );

  const handleReset = () => {
    setSearchVal('');
  };

  return (
    <Fragment>
      <div style={{ marginTop: '3rem', display: 'flex' }}>
        <div style={{ flex: 1, alignSelf: 'center', marginRight: '20px' }}>
          <StyledButton
            bgColor="rgb(226,153,51)"
            color="white"
            width="100%"
            onClick={() => dispatch(setActiveStep('WRITE'))}
          >
            <BsPencilSquare style={{ marginRight: '5px' }} />
            글쓰기
          </StyledButton>
        </div>
        <div style={{ flex: 3 }}>
          <SearchBox
            onChange={handleChange}
            setSearchVal={setSearchVal}
            placeholder="제목을 입력해주세요."
          />
        </div>
        <div
          className="icon-area"
          style={{
            display: 'flex',
            alignItems: 'center',

            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
          }}
        >
          <motion.div
            variants={buttonSetting}
            initial="rest"
            whileHover="hover"
            whileTap="pressed"
          >
            <IconButton
              type="button"
              size="small"
              style={{
                border: '1px solid rgba(0,0,0,0.12)',
                marginLeft: '0.5rem',
                marginRight: '0.5rem',
                padding: '0.5rem',
              }}
              onClick={() => handleReset()}
            >
              <GrPowerReset />
            </IconButton>
          </motion.div>
        </div>
      </div>
      <NoticeDrawerItem>
        {matchData
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((data) => (
            <Fragment key={data.noticeId}>
              <div
                style={{
                  display: 'flex',
                  marginTop: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  handleClick(data);
                }}
              >
                <div className="left-side" style={{ flex: 2 }}>
                  <div className="avatar-container">
                    <h4 style={{ marginLeft: '5px' }}>{data.noticeAuthor}</h4>
                  </div>
                  <div className="textTitle-container">
                    <div key={data.noticeId} align="left">
                      {data.noticeTitle}
                    </div>
                  </div>
                  <div className="textContent-container">
                    <div align="left">{data.noticeHeadText}</div>
                  </div>
                  <div className="textDate-container">
                    <div align="left">
                      {moment(data.createDate).format('YY-MM-DD')}
                    </div>
                  </div>
                </div>
                {data.noticeHeadImage ? (
                  <div className="right-side" style={{ flex: 1 }}>
                    <img src={data.noticeHeadImage} alt="Logo" width="70%" maxWidth="150px" maxHeight="75px"/>
                  </div>
                ) : (
                  <div className="right-side" style={{ flex: 1 }}></div>
                )}
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
