import React, { Fragment } from 'react';
import { SwipeableDrawer } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import NoticeDrawerWrite from './NoticeDrawerWrite';
import NoticeDrawerSuccess from './NoticeDrawerSuccess';
import NoticeDrawerMain from './NoticeDrawerMain';
import NoticeDrawerRead from './NoticeDrawerRead';
import NoticeDrawerModify from './NoticeDrawerModify';
import {
  setActiveStep,
} from 'redux/features/notice/noticeSlice';

/**
 * 이 페이지 컴포넌트는 공지사항 Drawer의 헤드를 보여주기 위해 작성하는 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * - Header
 * - default: NoticeDrawerMain
 * @returns {JSX.Element}
 * @author HYEONG YUN KIM
 */
const NoticeDrawer = ({ isOpened, setOpened }) => {
  const { breakpoint } = useWindowSize();
  const activeStep = useSelector((state) => state.notice.activeStep);
  const dispatch = useDispatch();

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpened(open);
  };

  const handleCloseBtn = () => {
    setOpened(false)
    dispatch(setActiveStep('MAIN'))
  };

  const getStepContent = (step) => {
    switch (step) {
      case 'MAIN':
        return <NoticeDrawerMain />;
      case 'WRITE':
        return <NoticeDrawerWrite />;
      case 'READ':
        return <NoticeDrawerRead />;
      case 'MODIFY':
        return <NoticeDrawerModify />;
      case 'SUCCESS':
        return <NoticeDrawerSuccess />;
      case 'MODIFYSUCCESS':
        return <NoticeDrawerSuccess />;
      case 'DELETE':
        return <NoticeDrawerSuccess />;
      default:
        return <NoticeDrawerMain />;
    }
  };

  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={isOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <ResponsiveContainer>
          <DrawerHeader breakpoint={breakpoint}>
            <h1>공지 사항</h1>
            <div>
              <AiOutlineClose size={32} onClick={handleCloseBtn}/>
            </div>
          </DrawerHeader>

          {getStepContent(activeStep)}
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default NoticeDrawer;
