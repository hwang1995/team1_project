import React, { Fragment, useEffect, useState, useRef } from 'react';
import { BsPencilSquare, BsListUl } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from '@toast-ui/react-editor';
import { useSnackbar } from 'notistack';
import { setActiveStep } from 'redux/features/notice/noticeSlice';
import StyledButton from 'components/common/button/StyledButton';
import StyledInputBase from 'components/common/input/StyledInputBase';
import { getNoticeList, modifyNotice, addNoticeImage } from 'apis/noticeAPI';
import SyncSpinner from 'components/common/spinner/SyncSpinner';
import { v4 as uuid } from 'uuid';
import { toBase64 } from 'components/common/utils';

const NoticeDrawerModify = () => {
  const currentIndex = useSelector((state) => state.notice.noticeCurrentIndex);
  const [isLoading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [imgList, setImgList] = useState([]);
  const editorRef = useRef(null);
  const [notice, setNotice] = React.useState({});

  const [noticeTitle, setNoticeTitle] = useState();
  // const [inputContent, setInputContent] = useState('');
  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  const hospitalCode = useSelector(
    (state) => state.common.loginInfo.hospitalCode,
  );

  const dispatch = useDispatch();

  // console.log(inputContent);
  const handleChange = (e) => {
    setNoticeTitle(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    const work = async () => {
      try {
        const noticeContent = await getNoticeList(currentIndex);
        setNotice(noticeContent);
        setNoticeTitle(noticeContent.noticeTitle);
        setLoading(false);
        // console.log('noticeContent : ', noticeContent);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    work();
  }, []); //***** [] 없으면 무한실행합니다.

  // useEffect(() => {
  //   setInputVal();
  //   setInputContent();
  // }, [notice]);

  // const handleEditorChange = (e, editor) => {
  //   setInputContent(e.target.value);
  // };

  const handleModify = async () => {
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
      // let noticeHeadImage = '';
      // console.log(inputVal);
      const noticeHeadText = editorContent
        .replace(/<(?:.|\n)*?>/gm, '')
        .substring(0, 50);

      //   if (imgList.length > 0) {
      //     noticeHeadImage = imgList[0];
      //   }
      //   if (imgList.length === 0) {
      //     noticeHeadImage = '';
      // }
      const sendInfo = {
        noticeId: currentIndex,
        noticeTitle: noticeTitle,
        // createDate: new Date().toJSON().split('.')[0],
        noticeContent: editorContent,
        noticeHeadText,
        // noticeHeadImage,
      };

      await modifyNotice(sendInfo);

      dispatch(setActiveStep('MODIFYSUCCESS'));
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   setInputVal(notice.noticeTitle);
  //   setInputContent(notice.noticeContent);
  // }, [notice]);

  return (
    <Fragment>
      {isLoading && (
        <div
          style={{
            width: '100%',
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SyncSpinner />
        </div>
      )}
      {!isLoading && (
        <Fragment>
          <div style={{ marginTop: '2rem', display: 'flex' }}>
            <div style={{ flex: 0.8, alignSelf: 'center' }}>
              <h2 style={{ fontWeight: '800' }}>제목</h2>
            </div>
            <div style={{ flex: 6 }}>
              <StyledInputBase
                name="noticeTitle"
                // value={notice.noticeTitle}
                value={noticeTitle}
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
                // value={notice.noticeContent}
                initialValue={notice.noticeContent}
                language="ko"
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
                onClick={handleModify}
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
      )}
    </Fragment>
  );
};
export default NoticeDrawerModify;
