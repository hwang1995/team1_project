import React, { Fragment, useState } from 'react';
import { BsPencilSquare, BsListUl } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

import {
  setNoticeCurrentIndex,
  setActiveStep,
  addNoticeItem,
} from 'redux/features/notice/noticeSlice';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import StyledButton from 'components/common/button/StyledButton';
import StyledInputBase from 'components/common/input/StyledInputBase';

const NoticeDrawerWrite = () => {
  const [title, setTitle] = useState('');
  const [ckcontent, setCkcontent] = useState('');

  const dispatch = useDispatch();
  const noticeItem = useSelector((state) => state.notice.noticeItem);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAdd = () => {
    const now = new Date().toLocaleDateString();
    const noticeIndex = noticeItem.length;
    // console.log(ckcontent.toString());
    dispatch(
      addNoticeItem({
        notice_id: noticeIndex + 1,
        notice_title: title,
        notice_date: now,
        notice_content: ckcontent.toString(),
        notice_author: '홍금보',
      }),
    );

    dispatch(setNoticeCurrentIndex(noticeIndex));
    dispatch(setActiveStep('SUCCESS'));
  };

  const handleEditorChange = (e, editor) => {
    setCkcontent(editor.getData());
  };
  return (
    <Fragment>
      <div style={{ marginTop: '2rem', display: 'flex' }}>
        <div style={{ flex: 0.8, alignSelf: 'center' }}>
          <h2 style={{ fontWeight: '800' }}>제목</h2>
        </div>
        <div style={{ flex: 6 }}>
          <StyledInputBase
            value={title}
            onChange={handleChange}
            placeholder="제목을 입력해주세요."
          />
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        {/* <CKEditor
          editor={ClassicEditor}
          data="<p>내용을 넣어보시요.</p>"
          onChange={(event, editor) => handleEditorChange(event, editor)}
        /> */}

        {/* <AddEditer setCkcontent={setCkcontent} onChange={handleChange} /> */}
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
            onClick={() => dispatch(setActiveStep('MAIN'))}
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
