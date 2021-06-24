import React, { Fragment, useEffect, useState } from 'react';
import SearchBox from 'components/common/search/SearchBox';
import { BsPencilSquare, BsListUl } from 'react-icons/bs';

import AddEditer from 'components/notice/drawer/AddEditer';
import StyledButton from 'components/common/button/StyledButton';
import StyledInputBase from 'components/common/input/StyledInputBase';

const NoticeDrawerModify = ({ setActiveStep, noticeItems }) => {
  const [inputVal, setInputVal] = useState('');

  const handleChange = (e) => {
    setInputVal(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    console.log(inputVal);
  }, [inputVal]);

  return (
    <Fragment>
      <div style={{ marginTop: '2rem', display: 'flex' }}>
        <div style={{ flex: 0.8, alignSelf: 'center' }}>
          <h2 style={{ fontWeight: '800' }}>제목</h2>
        </div>
        <div style={{ flex: 6 }}>
          <StyledInputBase
            name="notice_title"
            onChange={handleChange}
            placeholder="저희 병원을 소개합니다."
          />
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <AddEditer />
      </div>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
        }}
      >
        <div style={{ flex: '2', marginRight: '10px' }}>
          <StyledButton
            bgColor="rgb(226,153,51)"
            color="white"
            onClick={() => setActiveStep('SUCCESS')}
          >
            <BsPencilSquare style={{ marginRight: '5px' }} />
            게시물 수정
          </StyledButton>
        </div>
        <div style={{ flex: '2', marginRight: '10px' }}>
          <StyledButton
            bgColor="rgb(8,78,127)"
            color="white"
            onClick={() => setActiveStep('MAIN')}
          >
            <BsListUl style={{ marginRight: '5px' }} />
            목록
          </StyledButton>
        </div>
        <div style={{ flex: '6' }}></div>
      </div>
    </Fragment>
  );
};
export default NoticeDrawerModify;
