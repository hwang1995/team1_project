import React, { Fragment } from 'react';
import { SwipeableDrawer} from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import ReservationReadContainer from './ReservationReadContainer';
const ReservationReadDrawer = ({ readOpened, setReadOpened, readPatient }) => {
  const { breakpoint } = useWindowSize();

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
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
          />
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default ReservationReadDrawer;
