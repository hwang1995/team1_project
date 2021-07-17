import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { Editor } from '@toast-ui/react-editor';
import StyledButton from 'components/common/button/StyledButton';
import StyledInputBase from 'components/common/input/StyledInputBase';

import React, { Fragment, useRef, useState } from 'react';
import { BsListUl, BsPencilSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStep } from 'redux/features/notice/noticeSlice';
import { useSnackbar } from 'notistack';
import { createNotice, addNoticeImage } from 'apis/noticeAPI';
import { v4 as uuid } from 'uuid';
import { toBase64 } from 'components/common/utils';
const NoticeDrawerWrite = () => {
  const [noticeTitle, setNoticeTitle] = useState();
  const [imgList, setImgList] = useState([]);
  const editorRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const hospitalCode = useSelector(
    (state) => state.common.loginInfo.hospitalCode,
  );
  const memberId = useSelector((state) => state.common.loginInfo.memberId);
  const memberName = useSelector((state) => state.common.loginInfo.memberName);
  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  const handleChange = (event) => {
    setNoticeTitle(event.target.value);
  };

  const handleAdd = async (event) => {
    try {
      const editorContent = editorRef.current.getInstance().getHTML();
      if (editorContent === '' || noticeTitle === '') {
        handleAlert('error', '제목 혹은 내용이 비어있습니다.');
        return;
      }

      const noticeText = editorContent.replace(/<(?:.|\n)*?>/gm, '');

      if (noticeText === '') {
        handleAlert('error', '내용을 입력해야합니다.');
        return;
      }

      // const imgRegEx = /img src="|(.*?)"/gm;
      // const imgRegExResult = editorContent.match(imgRegEx);
      let noticeHeadImage = '';
      const noticeHeadText = editorContent
        .replace(/<(?:.|\n)*?>/gm, '')
        .substring(0, 50);

      if (imgList.length > 0) {
        noticeHeadImage = imgList[0];
      }
      if (imgList.length === 0) {
        noticeHeadImage = '';
      }
      const sendInfo = {
        noticeTitle: noticeTitle,
        createDate: new Date().toJSON().split('.')[0],
        noticeContent: editorContent,
        noticeAuthor: memberName,
        hospitalCode,
        memberId,
        noticeHeadText,
        noticeHeadImage,
      };

      await createNotice(sendInfo);

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
          language="ko-KR"
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              try {
                let ext = '.jpg';

                if (blob.type === 'image/jpeg') {
                  ext = '.jpg';
                } else if (blob.type === 'image/gif') {
                  ext = '.gif';
                } else if (blob.type === 'image/png') {
                  ext = '.png';
                } else if (blob.type === 'image/webp') {
                  ext = '.webp';
                }

                const imageName = uuid() + ext;

                const base64Content = await toBase64(blob);

                const sendInfo = {
                  hospitalCode,
                  imageName,
                  base64Content,
                };

                const imagePath = await addNoticeImage(sendInfo);

                const completeURL = `${process.env.REACT_APP_SERVER_PATH}/image?path=${imagePath}`;
                console.log(completeURL);

                setImgList((prevState) => {
                  const newState = prevState;
                  newState.push(completeURL);
                  return newState;
                });

                callback(completeURL, 'hello world');
                return false;
              } catch (error) {
                if (error.response.data !== undefined) {
                  const { message } = error.response.data;
                  handleAlert('error', message);
                }
                handleAlert('error', error);
                return false;
              }
            },
          }}
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
