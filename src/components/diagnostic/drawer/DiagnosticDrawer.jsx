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
import { FcApproval } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';

import StyledButtonGroup from 'components/common/button/StyledButtonGroup';
import diagnosticDetailHistory from 'pages/dashboard/diagnostic/diagnosticDetailHistory.json';
import DiagnosticDetailTableHead from '../table/DiagnosticDetailTableHead';
import DiagnosticDetailTableRows from '../table/DiagnosticDetailTableRows';
import DiagnosticDetailInputTableHead from '../table/DiagnosticDetailInputTableHead';
import DiagnosticDetailInputTableRows from '../table/DiagnosticDetailInputTableRows';
import DiagnosticBarcodeModal from '../modal/DiagnosticBarcodeModal';
import DiagnosticBloodDrawModal from '../modal/DIagnosticBloodDrawModal';
import DiagnosticReceptionModal from '../modal/DiagnosticReceptionModal';
import StyledButton from 'components/common/button/StyledButton';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const SuccessPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 70%;
  align-items: center;
  justify-content: center;
  p {
    margin-top: 1.5rem;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }
`;

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

  if (step === 'INPUT_COMPLETED') {
    return (
      <SuccessPage>
        <FcApproval size={300} />
        <p>진단 검사 결과가 성공적으로 추가되었습니다.</p>
      </SuccessPage>
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

  const toggleModal = (name, status) => {
    dispatch(
      setDiagnosticModal({
        name,
        status,
      }),
    );
  };

  const togglePage = (page) => {
    dispatch(setDiagnosticDrawerPage(page));
  };

  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={isOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <ResponsiveContainer
          style={{
            height: '100%',
          }}
        >
          <DrawerHeader
            breakpoint={breakpoint}
            style={{ padding: '0.5rem', backgroundColor: 'white', zIndex: 1 }}
          >
            <h1>진단 검사 상세</h1>
            <div>
              <IconButton onClick={() => dispatch(setDiagnosticDrawer(false))}>
                <AiOutlineClose size={32} />
              </IconButton>
            </div>
          </DrawerHeader>
          {pageStatus === 'LIST' && (
            <StyledButtonGroup size="medium" color="primary">
              <Button onClick={() => toggleModal('barcode', true)}>
                바코드 출력
              </Button>
              <Button onClick={() => togglePage('RESULT_INPUT')}>
                결과 입력
              </Button>
              <Button>엑셀 저장</Button>
              <Button onClick={() => toggleModal('reception', true)}>
                접수 취소
              </Button>
              <Button onClick={() => toggleModal('bloodDraw', true)}>
                채혈 완료
              </Button>
            </StyledButtonGroup>
          )}

          {pageStatus === 'RESULT_INPUT' && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <StyledButton
                bgColor="white"
                width="10%"
                style={{
                  minWidth: '6rem',
                }}
                onClick={() => togglePage('LIST')}
              >
                <IoIosArrowBack size={16} /> 상세 보기
              </StyledButton>
              <StyledButton
                bgColor="white"
                width="10%"
                style={{
                  minWidth: '6rem',
                }}
                onClick={() => togglePage('INPUT_COMPLETED')}
              >
                추가 하기 <IoIosArrowForward size={16} />
              </StyledButton>
            </div>
          )}
          {pageStatus === 'INPUT_COMPLETED' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <StyledButton
                bgColor="white"
                width="10%"
                style={{
                  minWidth: '6rem',
                }}
                onClick={() => togglePage('LIST')}
              >
                상세 보기 <IoIosArrowForward size={16} />
              </StyledButton>
            </div>
          )}

          {getStepContent(pageStatus)}
          <DiagnosticBarcodeModal />
          <DiagnosticBloodDrawModal />
          <DiagnosticReceptionModal />
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default DiagnosticDrawer;
