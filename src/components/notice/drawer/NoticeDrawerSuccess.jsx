import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStep } from 'redux/features/notice/noticeSlice';
import StyledButton from 'components/common/button/StyledButton';

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
      {activeStep === 'MODIFY' && (
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
        {activeStep !== 'DELETE' && (
                  <div style={{ flex: '2', marginRight: '10px' }}>

          <StyledButton
          bgColor="rgb(8,78,127)"
          color="white"
          onClick={() => dispatch(setActiveStep('READ'))}
        >
          작성 게시물 보기
        </StyledButton>
        </div>

        )}
          
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