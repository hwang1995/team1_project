import React, { Fragment, useEffect, useState, useRef } from 'react';
import { BsPencilSquare, BsListUl } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from '@toast-ui/react-editor';
// import parse from 'html-react-parser';
import {
  modifyNoticeItem,
  setActiveStep,
} from 'redux/features/notice/noticeSlice';
import StyledButton from 'components/common/button/StyledButton';
import StyledInputBase from 'components/common/input/StyledInputBase';

const NoticeDrawerModify = () => {
  const currentIndex = useSelector((state) => state.notice.noticeCurrentIndex);
  const noticeItem = useSelector((state) => state.notice.noticeItem);
  const currentItem = noticeItem[currentIndex];
  const editorRef = useRef(null);
  const [inputVal, setInputVal] = useState('');
  const [inputContent, setInputContent] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  useEffect(() => {
    setInputVal();
    setInputContent();
  }, [currentItem]);

  // const handleEditorChange = (e, editor) => {
  //   setInputContent(e.target.value);
  // };

  const handleModifyBtn = () => {
    const editorContent = editorRef.current.getInstance().getHTML();
    const imgRegEx = /img src="|(.*?)"/gm;
    const imgRegExResult = editorContent.match(imgRegEx);
    let notice_head_image = '';
    if (imgRegExResult !== null) {
      notice_head_image = editorContent.match(imgRegEx)[1].replace('"', '');
    }

    console.log(inputVal);
    const notice_head_text = editorContent
      .replace(/<(?:.|\n)*?>/gm, '')
      .substring(0, 50);

    dispatch(
      modifyNoticeItem({
        ...currentItem,
        notice_title: inputVal,
        notice_content: editorContent,
        notice_head_text,
        notice_head_image,
      }),
    );

    console.log('currentItem : ', currentItem);
    dispatch(setActiveStep('SUCCESS'));
  };

  useEffect(() => {
    setInputVal(currentItem.notice_title);
    setInputContent(currentItem.notice_content);
  }, [currentItem]);

  return (
    <Fragment>
      <div style={{ marginTop: '2rem', display: 'flex' }}>
        <div style={{ flex: 0.8, alignSelf: 'center' }}>
          <h2 style={{ fontWeight: '800' }}>제목</h2>
        </div>
        <div style={{ flex: 6 }}>
          <StyledInputBase
            name="notice_title"
            value={inputVal}
            onChange={handleChange}
            placeholder="저희 병원을 소개합니다."
          />
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontWeight: '400', padding: '0.5rem' }}>
          <Editor
            previewStyle="vertical"
            height="500px"
            initialEditType="wysiwyg"
            name="notice_content"
            // value={inputContent}
            initialValue={currentItem.notice_content}
            language="ko"
            // onChange={handleEditorChange}
            ref={editorRef}
          />
        </h3>
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
            onClick={handleModifyBtn}
          >
            <BsPencilSquare style={{ marginRight: '5px' }} />
            게시물 수정
          </StyledButton>
        </div>
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
        <div style={{ flex: '6' }}></div>
      </div>
    </Fragment>
  );
};
export default NoticeDrawerModify;
