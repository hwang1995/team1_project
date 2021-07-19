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
/**
 * 이 페이지 컴포넌트는 공지사항 수정하기 작성하는 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * - Header
 * - NoticeDrawerSuccess
 * - NoticeDrawerMain
 * @returns {JSX.Element}
 * @author HYEONG YUN KIM
 */
const NoticeDrawerModify = () => {
  // Spinner의 Loading 여부를 설정하기 위한 State
  const [isLoading, setLoading] = useState(true);
  // 해당 공지사항을 저장하기 위한 State
  const [notice, setNotice] = React.useState({});
  // 해당 공지사항의 제목을 수정하기 위한 State
  const [noticeTitle, setNoticeTitle] = useState();
  // Img 리스트를 설정하기 위한 State
  const [imgList, setImgList] = useState([]);
  const editorRef = useRef(null);
  // 리덕스에 저장되어 있는 현재 공지사항의 noticeId 가져오기
  const currentIndex = useSelector((state) => state.notice.noticeCurrentIndex);
  // 리덕스에 저장되어 있는 hospitalCode 가져오기
  const hospitalCode = useSelector(
    (state) => state.common.loginInfo.hospitalCode,
  );
  const dispatch = useDispatch();
  // 알람 설정 세팅
  const { enqueueSnackbar } = useSnackbar();
  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

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
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    work();
  }, []); //***** [] 없으면 무한실행합니다.

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
      // editorContent에서 html 코드를 떼어낸 다음 50자 까지만 noticeHeadText 변수에 저장
      const noticeHeadText = editorContent
        .replace(/<(?:.|\n)*?>/gm, '')
        .substring(0, 50);

    
      const sendInfo = {
        noticeId: currentIndex,
        noticeTitle: noticeTitle,
        noticeContent: editorContent,
        noticeHeadText,
      };

      // noticeAPI의 modifyNotice에 요청 데이터로 sendInfo 넣어주기 
      await modifyNotice(sendInfo);

      // 수정 완료 후 MODIFYSUCCESS 컴포넌트로 이동
      dispatch(setActiveStep('MODIFYSUCCESS'));
    } catch (error) {
      console.log(error);
    }
  };
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
