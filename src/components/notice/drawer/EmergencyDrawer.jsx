import React, { Fragment} from 'react';
import { SwipeableDrawer } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';

import EmergencyDrawerWrite from './EmergencyDrawerWrite';
import EmergencyDrawerMain from './EmergencyDrawerMain';


const EmergencyDrawer = ({ emergencyOpened, setEmergencyOpened }) => {
  const { breakpoint } = useWindowSize();
  const activeStep = useSelector((state) => state.emergency.activeStep);

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setEmergencyOpened(open);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 'MAIN':
        return <EmergencyDrawerMain />;
      case 'WRITE':
        return <EmergencyDrawerWrite />;
      default:
        return <EmergencyDrawerMain />;
    }
  };

  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={emergencyOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <ResponsiveContainer  breakpoint={breakpoint}>
          <DrawerHeader breakpoint={breakpoint}>
            <h1>병원 전화번호</h1>
            <div>
              <AiOutlineClose size={32} onClick={() => setEmergencyOpened(false)} />
            </div>
          </DrawerHeader>

          {getStepContent(activeStep)}
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default EmergencyDrawer;
