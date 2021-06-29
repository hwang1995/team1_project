import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Drawer, IconButton } from '@material-ui/core';
import { AiFillCheckCircle } from 'react-icons/ai';
import { IoIosInformationCircle, IoIosWarning } from 'react-icons/io';
import useWindowSize from 'hooks/useWindowSize';
import { useDispatch, useSelector } from 'react-redux';
import { setHeaderInfo } from 'redux/features/common/commonSlice';

import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { AiOutlineClose } from 'react-icons/ai';

const NotificationContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;

  flex-direction: column;

  .rounded-box {
    display: flex;

    border-radius: 8px;
    padding: 0.5rem;
    /* height: 40px; */
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
  .success-area {
    background-color: rgb(238, 247, 238);
  }

  .success-icon-area {
    background-color: rgb(118, 188, 103);
  }

  .information-area {
    background-color: rgb(231, 239, 249);
  }

  .information-icon-area {
    background-color: rgb(58, 102, 212);
  }

  .warning-area {
    background-color: rgb(252, 246, 234);
  }

  .warning-icon-area {
    background-color: rgb(217, 146, 34);
  }

  .danger-area {
    background-color: rgb(247, 236, 233);
  }

  .danger-icon-area {
    background-color: rgb(203, 79, 51);
  }

  .icon-area {
    display: flex;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    padding: 0.2rem;
    /* padding: rem; */
    margin-right: 0.6rem;
  }

  .content-area {
    display: flex;
    padding-left: 0.75rem;
    align-items: center;
    font-weight: 700;
  }
`;

const NotificationDrawer = () => {
  const { breakpoint } = useWindowSize();
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.common.headerInfo.notification);

  return (
    <Fragment>
      <Drawer anchor="right" open={isOpened}>
        <ResponsiveContainer breakpoint={breakpoint}>
          <DrawerHeader
            breakpoint={breakpoint}
            style={{ padding: '0.5rem', zIndex: 1, backgroundColor: 'white' }}
          >
            <h1>알림</h1>
            <div>
              <IconButton>
                <AiOutlineClose
                  size={32}
                  onClick={() =>
                    dispatch(
                      setHeaderInfo({
                        name: 'notification',
                        status: false,
                      }),
                    )
                  }
                />
              </IconButton>
            </div>
          </DrawerHeader>
          <NotificationContainer>
            <div className="rounded-box success-area">
              <div className="icon-area success-icon-area">
                <AiFillCheckCircle size={26} color="white" />
              </div>
              <div className="content-area">성공한 메시지가 나타납니다.</div>
            </div>
            <div className="rounded-box information-area">
              <div className="icon-area information-icon-area">
                <IoIosInformationCircle size={26} color="white" />
              </div>
              <div className="content-area">
                정보를 알려주는 메시지가 나타납니다.
              </div>
            </div>
            <div className="rounded-box warning-area">
              <div className="icon-area warning-icon-area">
                <IoIosWarning size={26} color="white" />
              </div>
              <div className="content-area">
                위험 정보를 알려주는 메시지가 나타납니다.
              </div>
            </div>
            <div className="rounded-box danger-area">
              <div className="icon-area danger-icon-area">
                <IoIosWarning size={26} color="white" />
              </div>
              <div className="content-area">
                경고 정보를 알려주는 메시지가 나타납니다.
              </div>
            </div>
          </NotificationContainer>
        </ResponsiveContainer>
      </Drawer>
    </Fragment>
  );
};

export default NotificationDrawer;
