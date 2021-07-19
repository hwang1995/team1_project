import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStep } from 'redux/features/notice/noticeSlice';
import StyledButton from 'components/common/button/StyledButton';
/**
 * 이 페이지 컴포넌트는 공지사항 작성/수정/삭제가 완료된 후 넘어가게 되는 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * - NoticeDrawerMain
 * @returns {JSX.Element}
 * @author HYEONG YUN KIM
 */
const NoticeDrawerSuccess = () => {
  const dispatch = useDispatch();

  const activeStep = useSelector((state) => state.notice.activeStep);

  return (
    <Fragment>
      <div style={{ marginTop: '3rem', display: 'flex' }}></div>
      <div
        className="right-side"
        style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
      >
        <img src="/assets/image/verified-account.png" alt="Logo" width="50%" />
      </div>
      {activeStep === 'SUCCESS' && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h2 style={{ fontWeight: '800' }}>게시물 등록이 완료 되었습니다.</h2>
        </div>
      )}
      {activeStep === 'MODIFYSUCCESS' && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h2 style={{ fontWeight: '800' }}>게시물 수정이 완료 되었습니다.</h2>
        </div>
      )}
      {activeStep === 'DELETE' && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h2 style={{ fontWeight: '800' }}>게시물 삭제가 완료 되었습니다.</h2>
        </div>
      )}

      <div
        style={{
          marginTop: '20px',
          display: 'flex',
        }}
      >
        <div style={{ flex: '2' }}></div>
        
        <div style={{ flex: '2' }}>
          <StyledButton
            bgColor="rgb(8,78,127)"
            color="white"
            onClick={() => dispatch(setActiveStep('MAIN'))}
          >
            목록으로 이동
          </StyledButton>
        </div>
        <div style={{ flex: '2' }}></div>
      </div>
    </Fragment>
  );
};
export default NoticeDrawerSuccess;
