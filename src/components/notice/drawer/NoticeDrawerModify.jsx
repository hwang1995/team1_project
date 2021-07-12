import React, { Fragment, useEffect, useState, useRef } from 'react';
import { BsPencilSquare, BsListUl } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from '@toast-ui/react-editor';
// import parse from 'html-react-parser';
import {
  setActiveStep,
} from 'redux/features/notice/noticeSlice';
import StyledButton from 'components/common/button/StyledButton';
import StyledInputBase from 'components/common/input/StyledInputBase';
import { getNoticeList, modifyNotice } from 'apis/noticeAPI';

const NoticeDrawerModify = () => {
  const currentIndex = useSelector((state) => state.notice.noticeCurrentIndex);
  
  const editorRef = useRef(null);
  const [inputVal, setInputVal] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [notice, setNotice] = React.useState({  });

  const dispatch = useDispatch();

  console.log(inputContent);
  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  useEffect(() => {
    const work = async () => {
      try {
        const response = await getNoticeList(currentIndex);
        setNotice(response.data.data);
        console.log("response", response);
      } catch (error) {
        console.log(error);
      }
    };
    work();
  }, [currentIndex]); //***** [] 없으면 무한실행합니다.


  useEffect(() => {
    setInputVal();
    setInputContent();
  }, [notice]);

  // const handleEditorChange = (e, editor) => {
  //   setInputContent(e.target.value);
  // };

  const handleModifyBtn = async () => {
    try {
    const editorContent = editorRef.current.getInstance().getHTML();
    const imgRegEx = /img src="|(.*?)"/gm;
    const imgRegExResult = editorContent.match(imgRegEx);
    let noticeHeadImage = '';
    if (imgRegExResult !== null) {
      noticeHeadImage = editorContent.match(imgRegEx)[1].replace('"', '');
    }

    console.log(inputVal);
    const noticeHeadText = editorContent
      .replace(/<(?:.|\n)*?>/gm, '')
      .substring(0, 50);

    setNotice({
      ...notice,
      noticeId: currentIndex,
      noticeTitle: inputVal,
      noticeContent: editorContent,
      noticeHeadText,
      noticeHeadImage,
    })

    const dirtyNotice = {...notice};

    await modifyNotice(dirtyNotice);

    console.log('notice : ', notice);

    dispatch(setActiveStep('MODIFYSUCCESS'));
  } catch (error) {
    console.log(error);
  }
  };

  useEffect(() => {
    setInputVal(notice.noticeTitle);
    setInputContent(notice.noticeContent);
  }, [notice]);

  return (
    <Fragment>
      <div style={{ marginTop: '2rem', display: 'flex' }}>
        <div style={{ flex: 0.8, alignSelf: 'center' }}>
          <h2 style={{ fontWeight: '800' }}>제목</h2>
        </div>
        <div style={{ flex: 6 }}>
          <StyledInputBase
            name="noticeTitle"
            value={inputVal}
            onChange={handleChange}
          />
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontWeight: '400', padding: '0.5rem' }}>
          <Editor
            previewStyle="vertical"
            height="500px"
            initialEditType="wysiwyg"
            name="noticeContent"
            // value={inputContent}
            initialValue={notice.noticeContent}
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
