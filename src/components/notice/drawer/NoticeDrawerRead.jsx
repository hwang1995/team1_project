import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveStep, removeNoticeItem } from 'redux/features/notice/noticeSlice';
import { BsPencilSquare, BsListUl, BsFillTrashFill } from 'react-icons/bs';
import parse from 'html-react-parser';
import StyledButton from 'components/common/button/StyledButton';

const NoticeDrawerRead = () => {
  const dispatch = useDispatch();
  const noticeItem = useSelector((state) => state.notice.noticeItem);
  const currentIndex = useSelector((state) => state.notice.noticeCurrentIndex);

  console.log("currentIndex", currentIndex)
  const handleDeleteBtn = () => {
    dispatch(removeNoticeItem(noticeItem[currentIndex]));
    dispatch(setActiveStep('DELETE'))
  };


  return (
    <Fragment>
      <div style={{ marginTop: '2rem', display: 'flex' }}>
        <div style={{ flex: 0.8, alignSelf: 'center' }}>
          <h2 style={{ fontWeight: '400' }}>
            {noticeItem[currentIndex].notice_title}
          </h2>
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <div className="left-side" style={{ flex: 1 }}>
          <img src="/assets/image/doctorface.png" alt="Logo" width="70%" />
        </div>
        <div
          className="left-side"
          style={{
            flex: 9,
            display: 'flex',
            marginLeft: '5px',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div className="avatar-container">
            <h3 style={{ fontWeight: '600' }}>
              {noticeItem[currentIndex].notice_author}
            </h3>
          </div>
          <div className="textDate-container">
            <div style={{ fontWeight: '500', marginTop: '5px', color: 'gray' }}>
              {noticeItem[currentIndex].notice_date}
            </div>
          </div>
        </div>
      </div>
      <hr />

      <h2 style={{ fontWeight: '500', padding: '1rem'}}>

      {noticeItem[currentIndex].notice_head_image ? (
                              <img src={noticeItem[currentIndex].notice_head_image} alt="Logo" width="100%" />
                      ) : ( <div></div>
                      )}
        

        {parse(noticeItem[currentIndex].notice_head_text)}
      </h2>
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
            onClick={() => dispatch(setActiveStep('MAIN'))}
          >
            <BsListUl style={{ marginRight: '5px' }} />
            목록
          </StyledButton>
        </div>
        <div style={{ flex: '2', marginRight: '10px' }}>
          <StyledButton
            bgColor="rgb(226,153,51)"
            color="white"
            onClick={() => dispatch(setActiveStep('MODIFY'))}
          >
            <BsPencilSquare style={{ marginRight: '5px' }} />
            수정
          </StyledButton>
        </div>
        <div style={{ flex: '2' }}>
          <StyledButton
            bgColor="rgb(216,89,56)"
            color="white"
            onClick={handleDeleteBtn}
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
