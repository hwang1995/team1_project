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
import { AiOutlineSearch } from 'react-icons/ai';
import { GrPowerReset } from 'react-icons/gr';

const NoticeDrawerMain = () => {
  const [searchVal, setSearchVal] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
    // console.log(data);
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
        {/* <button onClick={() => setActiveStep('what')}>hello world</button> */}
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
                    <img src={data.noticeHeadImage} alt="Logo" width="80%" />
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
