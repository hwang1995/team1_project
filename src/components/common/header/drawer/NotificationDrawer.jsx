import React, { Fragment, useState, useEffect } from 'react';
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
import { getNotificationByTopic } from 'apis/pushAPI';
import Spinner from 'components/common/spinner/Spinner';

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

/**
 * * 각 병원의 각 포지션에 맞는 알림 리스트를 보여주기 위한 컴포넌트
 * @returns {JSX.Element} view
 * @author SUNG WOOK HWANG
 */
const NotificationDrawer = () => {
  const { breakpoint } = useWindowSize();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [pushList, setPushList] = useState([]);
  const isOpened = useSelector((state) => state.common.headerInfo.notification);
  const { hospitalCode, memberAuthority } = useSelector(
    (state) => state.common.loginInfo,
  );

  useEffect(() => {
    if (isOpened) {
      async function getPushTopicList() {
        try {
          if (memberAuthority === 'ROLE_DEVELOP') {
            const result = await getNotificationByTopic(`/${hospitalCode}`);
            setPushList(result);
            // setLoading(true);
          } else if (memberAuthority === 'ROLE_DIRECTOR') {
            const result = await getNotificationByTopic(
              `/${hospitalCode}/director`,
            );
            setPushList(result);
          } else if (memberAuthority === 'ROLE_DOCTOR') {
            const result = await getNotificationByTopic(
              `/${hospitalCode}/doctor`,
            );
            setPushList(result);
          } else if (memberAuthority === 'ROLE_NURSE') {
            const result = await getNotificationByTopic(
              `/${hospitalCode}/nurse`,
            );
            setPushList(result);
          } else if (memberAuthority === 'ROLE_INSPECTOR') {
            const result = await getNotificationByTopic(
              `/${hospitalCode}/inspector`,
            );
            setPushList(result);
          }
        } catch (e) {
          console.log(e.response.data);
        }
      }

      setTimeout(() => {
        getPushTopicList();
        setLoading(true);
      }, 1000);
    }

    return () => {
      setPushList([]);
      setLoading(false);
    };
  }, [isOpened, hospitalCode, memberAuthority]);

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
            {isLoading &&
              pushList.length > 0 &&
              pushList.map((data) => {
                const { priority } = data;
                console.log(data, 'hello');
                if (priority === 'success') {
                  return <SuccessItem data={data} />;
                } else if (priority === 'information' || priority === 'info') {
                  return <InformationItem data={data} />;
                } else if (priority === 'warning') {
                  return <WarningItem data={data} />;
                } else if (priority === 'danger' || priority === 'error') {
                  return <DangerItem data={data} />;
                }
                return <></>;
              })}
            {!isLoading && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100vh',
                  // backgroundColor: 'red',
                }}
              >
                <Spinner />
              </div>
            )}
          </NotificationContainer>
        </ResponsiveContainer>
      </Drawer>
    </Fragment>
  );
};

const SuccessItem = ({ data }) => (
  <div className="rounded-box success-area">
    <div className="icon-area success-icon-area">
      <AiFillCheckCircle size={26} color="white" />
    </div>
    <div className="content-area">{data.message}</div>
  </div>
);

const InformationItem = ({ data }) => (
  <div className="rounded-box information-area">
    <div className="icon-area information-icon-area">
      <IoIosInformationCircle size={26} color="white" />
    </div>
    <div className="content-area">{data.message}</div>
  </div>
);

const WarningItem = ({ data }) => (
  <div className="rounded-box warning-area">
    <div className="icon-area warning-icon-area">
      <IoIosWarning size={26} color="white" />
    </div>
    <div className="content-area">{data.message}</div>
  </div>
);

const DangerItem = ({ data }) => (
  <div className="rounded-box danger-area">
    <div className="icon-area danger-icon-area">
      <IoIosWarning size={26} color="white" />
    </div>
    <div className="content-area">{data.message}</div>
  </div>
);

export default NotificationDrawer;
