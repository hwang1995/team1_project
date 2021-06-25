import React, { Fragment, useEffect, useState } from 'react';
import { SwipeableDrawer, Grid } from '@material-ui/core';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import CollapsibleTable from 'pages/temporary/hyungyoon/components/CollapsibleTable';

const DiagnosticDrawer = ({ isOpened, setOpened }) => {
  const { breakpoint } = useWindowSize();
  // const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (breakpoint !== undefined) {
      console.log('Current breakpoint is', breakpoint);
    }
  }, [breakpoint]);

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpened(open);
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
            <h1>진료 기록 보기</h1>
            <div>
              <AiOutlineClose size={32} onClick={() => setOpened(false)} />
            </div>
          </DrawerHeader>
          <Grid container spacing={1} style={{ padding: '1rem' }}>
            <CollapsibleTable />
          </Grid>
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default DiagnosticDrawer;
