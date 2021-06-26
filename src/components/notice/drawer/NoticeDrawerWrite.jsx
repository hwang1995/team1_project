import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import StyledButton from 'components/common/button/StyledButton';
import StyledInputBase from 'components/common/input/StyledInputBase';

import React, { Fragment, useRef, useState } from 'react';
import { BsListUl, BsPencilSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNoticeItem,
  setActiveStep,
  setNoticeCurrentIndex,
} from 'redux/features/notice/noticeSlice';

const NoticeDrawerWrite = () => {
  const [title, setTitle] = useState('');
  const editorRef = useRef(null);

  const dispatch = useDispatch();
  const noticeItem = useSelector((state) => state.notice.noticeItem);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAdd = () => {
    const now = new Date().toLocaleDateString();
    const noticeIndex = noticeItem.length;
    const editorContent = editorRef.current.getInstance().getHTML();

    if (editorContent === '' || title === '') {
      alert('제목 혹은 내용이 비어있습니다.');
      return;
    }
    const imgRegEx = /img src="|(.*?)"/gm;
    const imgRegExResult = editorContent.match(imgRegEx);
    let notice_head_image = '';
    if (imgRegExResult !== null) {
      notice_head_image = editorContent.match(imgRegEx)[1].replace('"', '');
    }

    const notice_head_text = editorContent
      .replace(/<(?:.|\n)*?>/gm, '')
      .substring(0, 50);

    dispatch(
      addNoticeItem({
        notice_id: noticeIndex + 1,
        notice_title: title,
        notice_date: now,
        notice_content: editorContent,
        notice_author: '홍금보',
        notice_head_text,
        notice_head_image,
      }),
    );

    dispatch(setNoticeCurrentIndex(noticeIndex));
    dispatch(setActiveStep('SUCCESS'));
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
        <Editor
          previewStyle="vertical"
          height="500px"
          initialEditType="wysiwyg"
          placeholder="내용을 입력해주세요."
          language="ko"
          ref={editorRef}
        />
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
