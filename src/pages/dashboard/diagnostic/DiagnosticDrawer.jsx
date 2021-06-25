import React, { Fragment, useEffect, useState } from 'react';
import { SwipeableDrawer, Grid } from '@material-ui/core';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { AiOutlineClose } from 'react-icons/ai';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import CollapsibleTable from 'pages/temporary/hyungyoon/components/CollapsibleTable';

const DiagnosticDrawer = ({ isOpened, setOpened, patientName }) => {
  // const [isLoading, setLoading] = useState(false);
  console.log('patientName : ', patientName);
  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpened(open);
  };

  return (
    <Fragment>
      <SwipeableDrawer
        width="2000px"
        anchor="right"
        open={isOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <ResponsiveContainer>
          <DrawerHeader>
            <h1>진료 기록 보기</h1>
            <div>
              <AiOutlineClose size={32} onClick={() => setOpened(false)} />
            </div>
          </DrawerHeader>
          <Grid container spacing={1} style={{ padding: '1rem' }}>
            <CollapsibleTable patientName={patientName} />
          </Grid>
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default DiagnosticDrawer;
