import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import StyledButton from 'components/common/button/StyledButton';
import StyledInputBase from 'components/common/input/StyledInputBase';

import React, { Fragment, useRef, useState } from 'react';
import { BsListUl, BsPencilSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveStep,
} from 'redux/features/notice/noticeSlice';
import { useSnackbar } from 'notistack';
import { createNotice } from 'apis/noticeAPI';


const NoticeDrawerWrite = () => {
  const [noticeTitle, setNoticeTitle] = useState();
  const editorRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [notice, setNotice] = React.useState({  });


  const hospitalCode = useSelector(
    (state) => state.common.loginInfo.hospitalCode,
  );

  const memberId = useSelector(
    (state) => state.common.loginInfo.memberId,
  )

  const memberName = useSelector(
    (state) => state.common.loginInfo.memberName,
  )

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setNoticeTitle(event.target.value);
  };

  const handleAdd = async (event) => {
    try {
    const now = new Date().toLocaleDateString();
    const editorContent = editorRef.current.getInstance().getHTML();
    if (editorContent === '' || noticeTitle === '') {
      handleAlert('error', '제목 혹은 내용이 비어있습니다.');

      return;
    }
    const imgRegEx = /img src="|(.*?)"/gm;
    const imgRegExResult = editorContent.match(imgRegEx);
    let noticeHeadImage = '';
    if (imgRegExResult !== null) {
      noticeHeadImage = editorContent.match(imgRegEx)[1].replace('"', '');
    }

    const noticeHeadText = editorContent
      .replace(/<(?:.|\n)*?>/gm, '')
      .substring(0, 50);

    setNotice({
      noticeTitle: noticeTitle,
      createDate: "2021-07-07T00:00:00",
      noticeContent: editorContent,
      noticeAuthor: "홍길동",
      hospitalCode,
      memberId,
      noticeHeadText,
      noticeHeadImage,
    });

    console.log(notice);
    const noticeInfo = { ...notice }
    const sad = JSON.stringify(noticeInfo)    
    console.log("sad", sad)

    await createNotice(sad);
    console.log("newNotice", noticeInfo)

    dispatch(setActiveStep('SUCCESS'));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div style={{ marginTop: '2rem', display: 'flex' }}>
        <div style={{ flex: 0.8, alignSelf: 'center' }}>
          <h2 style={{ fontWeight: '800' }}>제목</h2>
        </div>
        <div style={{ flex: 6 }}>
          <StyledInputBase
            value={noticeTitle}
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
