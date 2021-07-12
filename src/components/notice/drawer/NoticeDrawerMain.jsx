import React, { Fragment, useEffect, useState } from 'react';
import { TablePagination } from '@material-ui/core';
import { BsPencilSquare } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import {
  setNoticeCurrentIndex,
  setActiveStep,
} from 'redux/features/notice/noticeSlice';
import SearchBox from 'components/common/search/SearchBox';
import NoticeDrawerItem from 'components/dashboard/NoticeDrawerItem';
import StyledButton from 'components/common/button/StyledButton';
import { getNoticesList } from 'apis/noticeAPI';

const NoticeDrawerMain = () => {
  const [searchVal, setSearchVal] = useState('');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [notice, setNotice] = React.useState({  });

  const hospitalCode = useSelector(
    (state) => state.common.loginInfo.hospitalCode,
  );
  const dispatch = useDispatch();

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

  const noticeasd = Array.from(notice);

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

  

  const matchData = noticeasd.filter((data) =>
    data.noticeTitle.includes(searchVal),
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
      </div>
      <NoticeDrawerItem>
        {matchData
          .reverse()
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((data) => (
            <Fragment>
              <div style={{ display: 'flex', marginTop: '10px' }}>
                <div className="left-side" style={{ flex: 2 }}>
                  <div className="avatar-container">
                    <h4 style={{ marginLeft: '5px' }}>{data.noticeAuthor}</h4>
                  </div>
                  <div className="textTitle-container">
                    <div
                      key={data.noticeId}
                      align="left"
                      onClick={() => {
                        handleClick(data);
                      }}
                    >
                      {data.noticeTitle}
                    </div>
                  </div>
                  <div className="textContent-container">
                    <div align="left">{data.noticeHeadText}</div>
                  </div>
                  <div className="textDate-container">
                    <div align="left">{data.createDate}</div>
                  </div>
                </div>
                {data.noticeHeadImage ? (
                  <div className="right-side" style={{ flex: 1 }}>
                    <img src={data.noticeHeadImage} alt="Logo" width="100%" />
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
