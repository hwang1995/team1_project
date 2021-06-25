import React, { Fragment, useEffect, useState } from 'react';
import { SwipeableDrawer } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';

import NoticeDrawerWrite from './NoticeDrawerWrite';
import NoticeDrawerSuccess from './NoticeDrawerSuccess';
import NoticeDrawerMain from './NoticeDrawerMain';
import NoticeDrawerRead from './NoticeDrawerRead';
import NoticeDrawerModify from './NoticeDrawerModify';

const noticeItems = [
  {
    notice_id: 1,
    notice_title: '종현이 멋죠요.',
    notice_date: '6월 21일',
    notice_content: '안녕하세요',
    notice_author: 'Dr. Hong',
  },
  {
    notice_id: 2,
    notice_title: '가즈아.',
    notice_date: '6월 9일',
    notice_content: '안녕하세요',
    notice_author: 'Dr. Hong',
  },
  {
    notice_id: 3,
    notice_title: '가즈아.',
    notice_date: '6월 9일',
    notice_content: '안녕하세요',
    notice_author: 'Dr. Hong',
  },
  {
    notice_id: 4,
    notice_title: '가즈아.',
    notice_date: '6월 9일',
    notice_content: '안녕하세요',
    notice_author: 'Dr. Hong',
  },
  {
    notice_id: 5,
    notice_title: '가즈아.',
    notice_content: '안녕하세요',
    notice_date: '6월 9일',
    notice_author: 'Dr. Hong',
  },
  {
    notice_id: 6,
    notice_title: '가즈아.',
    notice_content: '안녕하세요',
    notice_date: '6월 9일',
    notice_author: 'Dr. Hong',
  },
];

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
        <ResponsiveContainer breakpoint={breakpoint}>
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
