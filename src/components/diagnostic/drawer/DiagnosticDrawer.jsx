import React, { Fragment } from 'react';
import {
  SwipeableDrawer,
  IconButton,
  Button,
  TableContainer,
  Table,
  TableBody,
  Paper,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDiagnosticDrawer,
  setDiagnosticDrawerPage,
  setDiagnosticModal,
} from 'redux/features/diagnostic/diagnosticSlice';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';

import StyledButtonGroup from 'components/common/button/StyledButtonGroup';
import diagnosticDetailHistory from 'pages/dashboard/diagnostic/diagnosticDetailHistory.json';
import DiagnosticDetailTableHead from '../table/DiagnosticDetailTableHead';
import DiagnosticDetailTableRows from '../table/DiagnosticDetailTableRows';
import DiagnosticDetailInputTableHead from '../table/DiagnosticDetailInputTableHead';
import DiagnosticDetailInputTableRows from '../table/DiagnosticDetailInputTableRows';
import DiagnosticModal from '../modal/DiagnosticModal';

const getStepContent = (step) => {
  if (step === 'LIST') {
    return (
      <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
        <Table style={{ minWidth: '930px', overflowX: 'scroll' }}>
          <DiagnosticDetailTableHead />
          <TableBody>
            {diagnosticDetailHistory.map((data) => (
              <Fragment key={data.diag_inspection_id}>
                <DiagnosticDetailTableRows data={data} />
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (step === 'RESULT_INPUT') {
    return (
      <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
        <Table style={{ minWidth: '930px', overflowX: 'scroll' }}>
          <DiagnosticDetailInputTableHead />
          <TableBody>
            {diagnosticDetailHistory.map((data) => (
              <Fragment key={data.diag_inspection_id}>
                <DiagnosticDetailInputTableRows data={data} />
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};

const DiagnosticDrawer = () => {
  const { breakpoint } = useWindowSize();

  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.diagnostic.drawerStatus.status);
  const pageStatus = useSelector(
    (state) => state.diagnostic.drawerStatus.pageStatus,
  );

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    dispatch(setDiagnosticDrawer(open));
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
          <DrawerHeader
            breakpoint={breakpoint}
            style={{ padding: '0.5rem', backgroundColor: 'white' }}
          >
            <h1>진단 검사 상세</h1>
            <div>
              <IconButton>
                <AiOutlineClose
                  size={32}
                  onClick={() => dispatch(setDiagnosticDrawer(false))}
                />
              </IconButton>
            </div>
          </DrawerHeader>

          <StyledButtonGroup size="large" color="primary">
            <Button onClick={() => dispatch(setDiagnosticModal(true))}>
              바코드 출력
            </Button>
            <Button
              onClick={() => dispatch(setDiagnosticDrawerPage('RESULT_INPUT'))}
            >
              결과 입력
            </Button>
            <Button>엑셀 저장</Button>
            <Button onClick={() => dispatch(setDiagnosticModal(true))}>
              접수 취소
            </Button>
            <Button onClick={() => dispatch(setDiagnosticModal(true))}>
              채혈 완료
            </Button>
          </StyledButtonGroup>

          {getStepContent(pageStatus)}
          <DiagnosticModal />
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default DiagnosticDrawer;
