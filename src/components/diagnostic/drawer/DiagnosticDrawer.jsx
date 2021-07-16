import React, { Fragment, useState, useEffect } from 'react';
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
  setCurrentDiagTestList,
  resetDiagnosticData,
} from 'redux/features/diagnostic/diagnosticSlice';
import { FcApproval } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { GrPowerReset } from 'react-icons/gr';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';
import { CSVLink } from 'react-csv';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';

import StyledButtonGroup from 'components/common/button/StyledButtonGroup';
import DiagnosticDetailTableHead from '../table/DiagnosticDetailTableHead';
import DiagnosticDetailTableRows from '../table/DiagnosticDetailTableRows';
import DiagnosticDetailInputTableHead from '../table/DiagnosticDetailInputTableHead';
import DiagnosticDetailInputTableRows from '../table/DiagnosticDetailInputTableRows';
import DiagnosticBarcodeModal from '../modal/DiagnosticBarcodeModal';
import DiagnosticBloodDrawModal from '../modal/DIagnosticBloodDrawModal';
import DiagnosticReceptionModal from '../modal/DiagnosticReceptionModal';
import StyledButton from 'components/common/button/StyledButton';

import HashSpinner from 'components/common/spinner/HashSpinner';
import {
  changeDiagnosticTestValue,
  diagnosticChangeStatus,
  showDiagnosticTestListByDiagTestId,
} from 'apis/diagnosisInsepctionAPI';

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

const DiagnosticDrawer = () => {
  const { breakpoint } = useWindowSize();
  const [isLoading, setLoading] = useState(true);
  const [diagnosticInfo, setDiagnosticInfo] = useState([]);
  const dispatch = useDispatch();
  const diagTestId = useSelector((state) => state.diagnostic.currentDiagTestId);
  const diagDataInput = useSelector(
    (state) => state.diagnostic.diagnosticDataInput,
  );
  const isOpened = useSelector((state) => state.diagnostic.drawerStatus.status);
  const modalStatus = useSelector((state) => state.diagnostic.modalStatus);
  const { memberAuthority, memberId } = useSelector(
    (state) => state.common.loginInfo,
  );

  // Static Data
  const headers = [
    { label: '묶음 코드', key: 'bundleCode' },
    { label: '묶음 명', key: 'bundleName' },
    { label: '처방 코드', key: 'presCode' },
    { label: '처방 명', key: 'presName' },
    { label: '용기', key: 'presVessel' },
    { label: '검체 명', key: 'presSpecimenName' },
    { label: '평균 값', key: 'diagTestAvgValue' },
    { label: '진단 검사 기록 ID', key: 'diagTestRecordId' },
    { label: '결과 값', key: 'diagTestValue' },
    { label: '상태', key: 'diagTestStatus' },
    { label: '진료의', key: 'doctorName' },
    { label: '검사담당자', key: 'inspectorName' },
  ];
  const pageStatus = useSelector(
    (state) => state.diagnostic.drawerStatus.pageStatus,
  );

  const buttonSetting = {
    rest: { scale: 1 },
    hover: { scale: 1.2 },
    pressed: { scale: 0.95 },
  };

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
  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  const showDiagnosticTestList = async (diagTestId) => {
    try {
      const result = await showDiagnosticTestListByDiagTestId(diagTestId);
      setDiagnosticInfo(result);
      dispatch(setCurrentDiagTestList(result));
      setLoading(false);
    } catch (error) {
      const { message } = error.response.data;
      handleAlert('error', message);
      setDiagnosticInfo([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpened || pageStatus === 'INPUT_COMPLETED') {
      setLoading(true);
      setTimeout(() => {
        showDiagnosticTestList(diagTestId);
      }, 1000);
    }
    if (!isOpened) {
      dispatch(resetDiagnosticData());
    }
  }, [isOpened, pageStatus]);

  const togglePage = (page) => {
    dispatch(setDiagnosticDrawerPage(page));
  };

  const handleUpdateResult = async () => {
    try {
      // 1. 보낼 값을 리스트로 만든다.
      const diagTestRecordIdList = Object.keys(diagDataInput);

      const sendListInfo = diagTestRecordIdList.map((diagTestRecordId) => ({
        diagTestRecordId: Number.parseInt(diagTestRecordId),
        diagTestValue: Number.parseFloat(diagDataInput[diagTestRecordId]),
        inspectorMemberId: Number.parseInt(memberId),
      }));
      // 2. 진단 검사 상세 결과 값을 보낸다.
      await changeDiagnosticTestValue(sendListInfo);

      const statusInfo = {
        status: 'completed',
        diagTestId,
      };

      // 3. 진단 검사의 값을 완료로 바꾼다.
      await diagnosticChangeStatus(statusInfo);

      togglePage('INPUT_COMPLETED');
    } catch (error) {
      const { message } = error.response.data;
      handleAlert('error', message);
    }
  };

  const handleReceptionCancel = () => {
    if (diagnosticInfo[0].diagTestStatus === 'DIAGNOSTIC_COMPLETED') {
      handleAlert('error', '진단 검사가 완료된 상태에서는 취소할 수 없습니다.');
      return;
    }

    if (diagnosticInfo[0].diagTestStatus === 'DIAGNOSTIC_REGISTER') {
      toggleModal('reception', true);
      return;
    }

    handleAlert('error', '진단 검사가 진행중이 아니라면 취소할 수 없습니다.');
    return;
  };

  const handleBloodDraw = () => {
    if (diagnosticInfo[0].diagTestStatus === 'DIAGNOSTIC_COMPLETED') {
      handleAlert(
        'error',
        '진단 검사가 완료된 상태에서는 채혈 완료를 할 수 없습니다.',
      );
      return;
    }
    if (diagnosticInfo[0].diagTestStatus === 'DIAGNOSTIC_REGISTER') {
      toggleModal('bloodDraw', true);
      return;
    }

    if (diagnosticInfo[0].diagTestStatus === 'DIAGNOSTIC_PENDING') {
      handleAlert('error', '진단 검사를 진행해야 채혈 완료를 할 수 있습니다.');
      return;
    }
    // toggleModal('bloodDraw', true);
  };

  const getStepContent = (step) => {
    if (step === 'LIST') {
      return (
        <Fragment>
          {isLoading && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '80vh',
              }}
            >
              <HashSpinner />
            </div>
          )}
          {!isLoading && diagnosticInfo.length > 0 && (
            <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
              <Table style={{ minWidth: '930px', overflowX: 'scroll' }}>
                <DiagnosticDetailTableHead />
                <TableBody>
                  {diagnosticInfo.map((data) => (
                    <Fragment key={data.diagInspectionId}>
                      <DiagnosticDetailTableRows data={data} />
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Fragment>
      );
    }

    if (step === 'RESULT_INPUT') {
      return (
        <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
          <Table style={{ minWidth: '930px', overflowX: 'scroll' }}>
            <DiagnosticDetailInputTableHead />
            <TableBody>
              {diagnosticInfo.map((data) => (
                <Fragment key={data.diagInspectionId}>
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

  const handleReset = () => {
    setLoading(true);
    setTimeout(() => {
      showDiagnosticTestList(diagTestId);
    }, 1000);
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
          {pageStatus === 'LIST' && memberAuthority === 'ROLE_INSPECTOR' && (
            <div
              style={{
                display: 'flex',
              }}
            >
              <StyledButtonGroup size="medium" color="primary">
                <Button onClick={() => toggleModal('barcode', true)}>
                  바코드 출력
                </Button>
                <Button onClick={() => togglePage('RESULT_INPUT')}>
                  결과 입력
                </Button>

                <Button>
                  <CSVLink data={diagnosticInfo} headers={headers}>
                    <span style={{ color: '#3F51B5' }}>엑셀 저장</span>
                  </CSVLink>
                </Button>
                <Button onClick={() => handleReceptionCancel()}>
                  접수 취소
                </Button>
                <Button onClick={() => handleBloodDraw()}>채혈 완료</Button>
              </StyledButtonGroup>
              <motion.div
                variants={buttonSetting}
                initial="rest"
                whileHover="hover"
                whileTap="pressed"
                style={{
                  marginLeft: '0.5rem',
                }}
              >
                <IconButton
                  type="button"
                  size="small"
                  style={{
                    border: '1px solid rgba(0,0,0,0.12)',
                    marginLeft: '0.5rem',
                    marginRight: '0.5rem',
                    padding: '0.5rem',
                  }}
                  onClick={() => handleReset()}
                >
                  <GrPowerReset />
                </IconButton>
              </motion.div>
            </div>
          )}
          {pageStatus === 'LIST' && memberAuthority !== 'ROLE_INSPECTOR' && (
            <div style={{ display: 'flex' }}>
              <StyledButtonGroup size="medium" color="primary">
                <Button>
                  <CSVLink data={diagnosticInfo} headers={headers}>
                    <span style={{ color: '#3F51B5' }}>엑셀 저장</span>
                  </CSVLink>
                </Button>
              </StyledButtonGroup>
              <motion.div
                variants={buttonSetting}
                initial="rest"
                whileHover="hover"
                whileTap="pressed"
                style={{
                  marginLeft: '0.5rem',
                }}
              >
                <IconButton
                  type="button"
                  size="small"
                  style={{
                    border: '1px solid rgba(0,0,0,0.12)',
                    marginLeft: '0.5rem',
                    marginRight: '0.5rem',
                    padding: '0.5rem',
                  }}
                  onClick={() => handleReset()}
                >
                  <GrPowerReset />
                </IconButton>
              </motion.div>
            </div>
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
                onClick={() => handleUpdateResult()}
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
