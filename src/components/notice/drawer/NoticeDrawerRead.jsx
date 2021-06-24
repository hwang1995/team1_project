import React, { Fragment, useEffect } from 'react';
import { BsPencilSquare, BsListUl, BsFillTrashFill } from 'react-icons/bs';

import StyledButton from 'components/common/button/StyledButton';

const NoticeDrawerRead = ({ setActiveStep, notice }) => {
  // const board = data.find((board) => board.bno === bno);
  // board.bhitcount++;
  // return board;
  useEffect(() => {
    console.log('data가 들어왔는지..?', notice);
  }, []);

  return (
    <Fragment>
      <div style={{ marginTop: '2rem', display: 'flex' }}>
        <div style={{ flex: 0.8, alignSelf: 'center' }}>
          <h2 style={{ fontWeight: '400' }}>{notice.notice_title}</h2>
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <div className="left-side" style={{ flex: 1 }}>
          <img src="/assets/image/doctorface.png" alt="Logo" width="100%" />
        </div>
        <div
          className="left-side"
          style={{
            flex: 9,
            display: 'flex',
            marginLeft: '10px',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div className="avatar-container">
            <h3 style={{ fontWeight: '600' }}>{notice.notice_author}</h3>
          </div>
          <div className="textDate-container">
            <div style={{ fontWeight: '500', marginTop: '5px', color: 'gray' }}>
              {notice.notice_date}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          padding: '15px',
        }}
      >
        <img src="/assets/image/hospital.png" alt="Logo" width="100%" />
      </div>
      <h3 style={{ fontWeight: '400', padding: '0.5rem' }}>
        {notice.notice_content}
      </h3>
      <hr />
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
        }}
      >
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
        <div style={{ flex: '2', marginRight: '10px' }}>
          <StyledButton
            bgColor="rgb(226,153,51)"
            color="white"
            onClick={() => setActiveStep('MODIFY')}
          >
            <BsPencilSquare style={{ marginRight: '5px' }} />
            수정
          </StyledButton>
        </div>
        <div style={{ flex: '2' }}>
          <StyledButton
            bgColor="rgb(216,89,56)"
            color="white"
            onClick={() => setActiveStep('MAIN')}
          >
            <BsFillTrashFill style={{ marginRight: '5px' }} />
            삭제
          </StyledButton>
        </div>
        <div style={{ flex: '6' }}></div>
      </div>
    </Fragment>
  );
};
export default NoticeDrawerRead;
