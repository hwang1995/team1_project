import React, { Fragment, useEffect, useState } from 'react';
import { SwipeableDrawer, Grid } from '@material-ui/core';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { AiOutlineClose } from 'react-icons/ai';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import CollapsibleTable from 'pages/temporary/hyungyoon/components/CollapsibleTable';

<<<<<<< HEAD:src/pages/dashboard/diagnostic/DiagnosticDrawer.jsx
const DiagnosticDrawer = ({ isOpened, setOpened, patientName }) => {
=======
const DiagnosticDrawer = ({ isOpened, setOpened }) => {
  const { breakpoint } = useWindowSize();
>>>>>>> ecf16a459395cbb23c8865341070e4299c75e152:src/pages/dashboard/diagnosis-history/DiagnosticDrawer.jsx
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
<<<<<<< HEAD:src/pages/dashboard/diagnostic/DiagnosticDrawer.jsx
        width="2000px"
=======
>>>>>>> ecf16a459395cbb23c8865341070e4299c75e152:src/pages/dashboard/diagnosis-history/DiagnosticDrawer.jsx
        anchor="right"
        open={isOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <ResponsiveContainer>
<<<<<<< HEAD:src/pages/dashboard/diagnostic/DiagnosticDrawer.jsx
          <DrawerHeader>
=======
          <DrawerHeader breakpoint={breakpoint}>
>>>>>>> ecf16a459395cbb23c8865341070e4299c75e152:src/pages/dashboard/diagnosis-history/DiagnosticDrawer.jsx
            <h1>진료 기록 보기</h1>
            <div>
              <AiOutlineClose size={32} onClick={() => setOpened(false)} />
            </div>
          </DrawerHeader>
          <Grid container spacing={1} style={{ padding: '1rem' }}>
<<<<<<< HEAD:src/pages/dashboard/diagnostic/DiagnosticDrawer.jsx
            <CollapsibleTable patientName={patientName} />
=======
            <CollapsibleTable />
>>>>>>> ecf16a459395cbb23c8865341070e4299c75e152:src/pages/dashboard/diagnosis-history/DiagnosticDrawer.jsx
          </Grid>
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default DiagnosticDrawer;
