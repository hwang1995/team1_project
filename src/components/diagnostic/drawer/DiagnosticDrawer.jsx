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
import { sendMqttMessage } from 'apis/pushAPI';

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

/**
 * * ?????? ????????? ?????? ??? ????????? ??????, ??????, ?????? ????????? ?????? ????????? ???????????? ?????? ???????????? (Template)
 * @returns {JSX.Element} view
 * @author SUNG WOOK HWANG
 */
const DiagnosticDrawer = () => {
  const { breakpoint } = useWindowSize();
  const [isLoading, setLoading] = useState(true);

  // ?????? ????????? ????????? ???????????? ?????? ??????
  const [diagnosticInfo, setDiagnosticInfo] = useState([]);
  const dispatch = useDispatch();

  // ????????? ?????????????????? ????????? diagTestId??? Redux store??? ????????????.
  const diagTestId = useSelector((state) => state.diagnostic.currentDiagTestId);
  const diagDataInput = useSelector(
    (state) => state.diagnostic.diagnosticDataInput,
  );
  const isOpened = useSelector((state) => state.diagnostic.drawerStatus.status);
  // const modalStatus = useSelector((state) => state.diagnostic.modalStatus);
  const { memberAuthority, memberId, hospitalCode } = useSelector(
    (state) => state.common.loginInfo,
  );

  // Static Data
  const headers = [
    { label: '?????? ??????', key: 'bundleCode' },
    { label: '?????? ???', key: 'bundleName' },
    { label: '?????? ??????', key: 'presCode' },
    { label: '?????? ???', key: 'presName' },
    { label: '??????', key: 'presVessel' },
    { label: '?????? ???', key: 'presSpecimenName' },
    { label: '?????? ???', key: 'diagTestAvgValue' },
    { label: '?????? ?????? ?????? ID', key: 'diagTestRecordId' },
    { label: '?????? ???', key: 'diagTestValue' },
    { label: '??????', key: 'diagTestStatus' },
    { label: '?????????', key: 'doctorName' },
    { label: '???????????????', key: 'inspectorName' },
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

  /**
   * Drawer??? ????????????, ???????????? ????????? 'INPUT_COMPLETED'??? ????????? effect ?????????
   * ?????? ????????? ????????? ?????? ????????? ????????? side-effect??? ????????????
   * Drawer??? ?????? ?????? ?????? ????????? ????????? ????????? ????????? Redux action??? dispatch?????? side-effect??? ????????????.
   *
   */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened, pageStatus]);

  const togglePage = (page) => {
    dispatch(setDiagnosticDrawerPage(page));
  };

  const handleUpdateResult = async () => {
    try {
      // 1. ?????? ?????? ???????????? ?????????.
      const diagTestRecordIdList = Object.keys(diagDataInput);

      const sendListInfo = diagTestRecordIdList.map((diagTestRecordId) => ({
        diagTestRecordId: Number.parseInt(diagTestRecordId),
        diagTestValue: Number.parseFloat(diagDataInput[diagTestRecordId]),
        inspectorMemberId: Number.parseInt(memberId),
      }));
      // 2. ?????? ?????? ?????? ?????? ?????? ?????????.
      await changeDiagnosticTestValue(sendListInfo);

      const statusInfo = {
        status: 'completed',
        diagTestId,
      };

      // 3. ?????? ????????? ?????? ????????? ?????????.
      await diagnosticChangeStatus(statusInfo);

      // 4. ?????? ????????? ????????? ????????? ??????????????? ????????? ?????????.
      const sendDoctorMessageInfo = {
        topic: `/${hospitalCode}/doctor`,
        priority: 'success',
        message: `${diagTestId}?????? ?????? ????????? ?????????????????????.`,
      };

      const sendNurseMessageInfo = {
        topic: `/${hospitalCode}/nurse`,
        priority: 'success',
        message: `${diagTestId}?????? ?????? ????????? ?????????????????????.`,
      };

      await sendMqttMessage(sendDoctorMessageInfo);

      await sendMqttMessage(sendNurseMessageInfo);

      togglePage('INPUT_COMPLETED');
    } catch (error) {
      const { message } = error.response.data;
      handleAlert('error', message);
    }
  };

  const handleReceptionCancel = () => {
    if (diagnosticInfo[0].diagTestStatus === 'DIAGNOSTIC_COMPLETED') {
      handleAlert('error', '?????? ????????? ????????? ??????????????? ????????? ??? ????????????.');
      return;
    }

    if (diagnosticInfo[0].diagTestStatus === 'DIAGNOSTIC_REGISTER') {
      toggleModal('reception', true);
      return;
    }

    handleAlert('error', '?????? ????????? ???????????? ???????????? ????????? ??? ????????????.');
    return;
  };

  const handleBloodDraw = () => {
    if (diagnosticInfo[0].diagTestStatus === 'DIAGNOSTIC_COMPLETED') {
      handleAlert(
        'error',
        '?????? ????????? ????????? ??????????????? ?????? ????????? ??? ??? ????????????.',
      );
      return;
    }
    if (diagnosticInfo[0].diagTestStatus === 'DIAGNOSTIC_REGISTER') {
      toggleModal('bloodDraw', true);
      return;
    }

    if (diagnosticInfo[0].diagTestStatus === 'DIAGNOSTIC_PENDING') {
      handleAlert('error', '?????? ????????? ???????????? ?????? ????????? ??? ??? ????????????.');
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
          <p>?????? ?????? ????????? ??????????????? ?????????????????????.</p>
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
            <h1>?????? ?????? ??????</h1>
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
                  ????????? ??????
                </Button>
                <Button onClick={() => togglePage('RESULT_INPUT')}>
                  ?????? ??????
                </Button>

                <Button>
                  <CSVLink data={diagnosticInfo} headers={headers}>
                    <span style={{ color: '#3F51B5' }}>?????? ??????</span>
                  </CSVLink>
                </Button>
                <Button onClick={() => handleReceptionCancel()}>
                  ?????? ??????
                </Button>
                <Button onClick={() => handleBloodDraw()}>?????? ??????</Button>
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
                    <span style={{ color: '#3F51B5' }}>?????? ??????</span>
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
                <IoIosArrowBack size={16} /> ?????? ??????
              </StyledButton>
              <StyledButton
                bgColor="white"
                width="10%"
                style={{
                  minWidth: '6rem',
                }}
                onClick={() => handleUpdateResult()}
              >
                ?????? ?????? <IoIosArrowForward size={16} />
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
                ?????? ?????? <IoIosArrowForward size={16} />
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
