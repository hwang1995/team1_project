import React, { Fragment, useEffect, useState } from 'react';
import {
  SwipeableDrawer,
  IconButton,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDiagnosticDrawer,
  setDiagnosticDrawerPage,
} from 'redux/features/diagnostic/diagnosticSlice';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import StyledTypography from 'components/common/typography/StyledTypography';
import StyledButtonGroup from 'components/common/button/StyledButtonGroup';

const getStepContent = (step) => {
  if (step === 'LIST') {
    return <h1>LIST GOOD</h1>;
  }

  if (step === 'RESULT_INPUT') {
    return <h1>RESULT_INPUT GOOD</h1>;
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
            <Button>바코드 출력</Button>
            <Button
              onClick={() => dispatch(setDiagnosticDrawerPage('RESULT_INPUT'))}
            >
              결과 입력
            </Button>
            <Button>엑셀 저장</Button>
            <Button>접수 취소</Button>
            <Button>채혈 완료</Button>
          </StyledButtonGroup>

          {getStepContent(pageStatus)}
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default DiagnosticDrawer;
