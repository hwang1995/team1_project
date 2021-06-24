import React, { Fragment, useEffect, useState, useRef } from 'react';
import { BsPencilSquare, BsListUl } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import {
  setNoticeCurrentIndex,
  modifyNoticeItem,
  setActiveStep,
} from 'redux/features/notice/noticeSlice';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import StyledButton from 'components/common/button/StyledButton';
import StyledInputBase from 'components/common/input/StyledInputBase';

const NoticeDrawerModify = () => {
  const dispatch = useDispatch();

  const currentIndex = useSelector((state) => state.notice.noticeCurrentIndex);
  const noticeItem = useSelector((state) => state.notice.noticeItem);
  const currentItem = noticeItem[currentIndex];
  const [inputVal, setInputVal] = useState(currentItem.notice_title);
  const [inputContent, setInputContent] = useState(currentItem.notice_content);

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  // useEffect(() => {
  //   setInputVal();
  //   setInputContent();
  // }, [currentItem]);

  const handleEditorChange = (e, editor) => {
    const data = editor.getData();
    setInputContent(data);
  };

  const handleModifyBtn = () => {
    dispatch(
      modifyNoticeItem({
        ...currentItem,
        notice_title: inputVal,
        notice_content: inputContent,
      }),
    );
    dispatch(setActiveStep('SUCCESS'));
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
            value={inputVal}
            onChange={handleChange}
            placeholder="저희 병원을 소개합니다."
          />
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        {/* <CKEditor
          editor={ClassicEditor}
          data={inputContent}
          onChange={handleEditorChange}
        /> */}
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
