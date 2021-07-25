import React, { Fragment } from 'react';
import { SwipeableDrawer } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import ReservationReadContainer from './ReservationReadContainer';

/*
  추가된 예약환자 데이터를 클릭했을 때, 나타나는 드로어
  해당 컴포넌트는 환자의 정보를 보여줄 수 있는 큰틀의 컴포넌트이다.
  readPatient: 환자의 정보가 담겨 있는 객체 데이터 -> ReservationReadContainer 컴포넌트로 보내준다.
*/
const ReservationReadDrawer = ({
  readOpened,
  setReadOpened,
  readPatient,
  setAddDisplay,
}) => {
  const { breakpoint } = useWindowSize();

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    if (!open) {
      setAddDisplay(true);
    }

    setReadOpened(open);
  };

  const handleChangeCloseClick = () => {
    setReadOpened(false);
  };

  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={readOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <ResponsiveContainer
          breakpoint={breakpoint}
          style={{ marginTop: '2em' }}
        >
          <DrawerHeader breakpoint={breakpoint}>
            <h1>예약 환자 </h1>
            <div>
              <AiOutlineClose
                size={32}
                onClick={handleChangeCloseClick}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </DrawerHeader>
          <ReservationReadContainer
            setReadOpened={setReadOpened}
            readPatient={readPatient}
            setAddDisplay={setAddDisplay}
          />
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default ReservationReadDrawer;
