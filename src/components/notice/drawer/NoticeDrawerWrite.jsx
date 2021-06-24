import React, { Fragment, useEffect, useState } from 'react';
import { BsPencilSquare, BsListUl } from 'react-icons/bs';

import AddEditer from './AddEditer';
import StyledButton from 'components/common/button/StyledButton';
import StyledInputBase from 'components/common/input/StyledInputBase';

const NoticeDrawerWrite = ({ setActiveStep, noticeItems }) => {
  const [notice, setNotice] = useState({
    notice_title: '',
    notice_content: '',
    notice_id: 0,
    notice_author: '',
    notice_date: '',
  });

  const handleChange = (event) => {
    setNotice({
      ...notice,
      [event.target.name]: event.target.value,
    });
    console.log('event.target.value', event.target.value);
  };

  useEffect(() => {
    console.log(notice);
  }, [notice]);

  let lastnotice_id = 7;
  const handleAdd = () => {
    // event.preventDefault();
    lastnotice_id++;
    const newNotice = { ...notice };
    newNotice.notice_id = lastnotice_id;
    newNotice.notice_date = new Date().toLocaleDateString();
    newNotice.notice_author = '황박사';

    noticeItems.push(newNotice);
    console.log('handleAdd 실행', newNotice);
    setActiveStep('SUCCESS');
  };

  // const handleAdd = (event) => {
  //   //event.preventDefault();
  //   event.preventDefault();
  //   const newBoard = { ...board }; // 상태를 그대로 넘기는 것은 위험, 상태를 복제해서
  //   // 객체를 새로 만든 다음에 나머지 부족한 부분 넣어주기
  //   newBoard.bwriter = "user1";
  //   insertBoard(newBoard);
  //   props.history.goBack();
  // };
  // export function insertBoard(board) {
  //   lastBno++;
  //   board.bno = lastBno;
  //   board.bdate = new Date().toLocaleDateString();
  //   board.bhitcount = 0;
  //   data.push(board);
  // }

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
            placeholder="제목을 입력해주세요."
          />
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <AddEditer name="notice_content" onChange={handleChange} />
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
            onClick={handleAdd}
          >
            <BsPencilSquare style={{ marginRight: '5px' }} />
            게시물 등록
          </StyledButton>
        </div>
        <div style={{ flex: '2' }}>
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
export default NoticeDrawerWrite;
