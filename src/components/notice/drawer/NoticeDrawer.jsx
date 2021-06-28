import React, { Fragment } from 'react';
import { SwipeableDrawer } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';

import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';

import NoticeDrawerWrite from './NoticeDrawerWrite';
import NoticeDrawerSuccess from './NoticeDrawerSuccess';
import NoticeDrawerMain from './NoticeDrawerMain';
import NoticeDrawerRead from './NoticeDrawerRead';
import NoticeDrawerModify from './NoticeDrawerModify';




const NoticeDrawer = ({ isOpened, setOpened }) => {
  const { breakpoint } = useWindowSize();
  const activeStep = useSelector((state) => state.notice.activeStep);

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpened(open);
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
      case 'DELETE':
        return <NoticeDrawerSuccess />;
      default:
        return <NoticeDrawerMain />;
    }
  };

  return (
    <Fragment >
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
              <AiOutlineClose size={32} onClick={() => setOpened(false)} />
            </div>
          </DrawerHeader>

          {getStepContent(activeStep)}
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default NoticeDrawer;
