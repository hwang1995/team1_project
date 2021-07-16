import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeStyles,
  Modal,
  Backdrop,
  IconButton,
  Grid,
  Button,
  Table,
  Paper,
  TableBody,
  TableContainer,
} from '@material-ui/core';
import { IoIosArrowBack } from 'react-icons/io';
import { DataGrid } from '@material-ui/data-grid';
import { useSnackbar } from 'notistack';
import { AiOutlineClose } from 'react-icons/ai';
import { GrPowerReset } from 'react-icons/gr';
import { motion } from 'framer-motion';
import SpringFade from 'components/common/fade/SpringFade';
import StyledTypography from 'components/common/typography/StyledTypography';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { setDiagnosticModal } from 'redux/features/diagnostic/diagnosticSlice';
import SearchBox from 'components/common/search/SearchBox';
import { getPatientsList } from 'apis/patientAPI';
import HashSpinner from 'components/common/spinner/HashSpinner';
import {
  searchPatientInfoByName,
  showDiagnosticTestListByPatientId,
} from 'apis/searchAPI';
import DiagnosticTableRow from '../table/DiagnosticTableRow';
import DiagnosticTableHead from '../table/DiagnosticTableHead';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    minHeight: '400px',
    minWidth: '400px',
    maxWidth: '920px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0,0,0,0.12)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const DiagnosticSearchModal = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { breakpoint } = useWindowSize();
  const [isLoading, setLoading] = useState(true);
  const [pageStatus, setPageStatus] = useState('SEARCH');
  const [patientList, setPatientList] = useState([]);
  const [patientDetailList, setPatientDetailList] = useState([]);
  const [selectedPatientInfo, setSelectedPatientInfo] = useState({});
  const [searchVal, setSearchVal] = useState('');
  const { hospitalCode } = useSelector((state) => state.common.loginInfo);
  const isOpened = useSelector((state) => state.diagnostic.modalStatus.search);

  const handleClose = () => {
    dispatch(
      setDiagnosticModal({
        name: 'search',
        status: false,
      }),
    );
    setLoading(true);
    setPageStatus('SEARCH');
    setPatientList([]);
    setSelectedPatientInfo({});
    setSearchVal('');
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  const buttonSetting = {
    rest: { scale: 1 },
    hover: { scale: 1.2 },
    pressed: { scale: 0.95 },
  };
  /**
   * * 목표 : 해당 병원의 환자를 가지고 오기 위한 async 함수
   * @param {string} hospitalCode
   */
  async function getPatientsInfo(hospitalCode) {
    try {
      const result = await getPatientsList(hospitalCode);
      const newResult = result.data.data.map((data, index) => {
        const { patientGender } = data;
        return {
          id: index + 1,
          ...data,
          patientGender: patientGender === 'male' ? '남자' : '여자',
        };
      });
      setPatientList(newResult);
      setSelectedPatientInfo({});
      setLoading(false);
    } catch (error) {
      const { message } = error.response.data;
      handleAlert('error', message);
      setLoading(false);
    }
  }

  async function getPatientsInfoByName(patientInfo) {
    try {
      const result = await searchPatientInfoByName(patientInfo);
      const newResult = result.map((data, index) => {
        const { patientGender } = data;
        return {
          id: index + 1,
          ...data,
          patientGender: patientGender === 'male' ? '남자' : '여자',
        };
      });
      setPatientList(newResult);
      setSelectedPatientInfo({});
      setLoading(false);
    } catch (error) {
      // console.log(error);
      const { message } = error.response.data;
      if (message === undefined) {
        handleAlert('error', '알 수 없는 이유로 검색에 실패하였습니다.');
        setLoading(false);
        return;
      }
      handleAlert('error', message);
      setLoading(false);
    }
  }

  async function getDiagnosticInfoByPatientId(patientId) {
    try {
      const result = await showDiagnosticTestListByPatientId(patientId);
      if (result.length > 0) {
        setPatientDetailList(result);
        const { patientName } = result[0];
        handleAlert(
          'success',
          `${patientName}님의 진단 검사가 ${result.length}건 조회되었습니다.`,
        );
        setPageStatus('DETAIL');
      }

      // console.log(result);
      setLoading(false);
    } catch (error) {
      const { message } = error.response.data;
      if (message === undefined) {
        handleAlert('error', '알 수 없는 이유로 검색에 실패하였습니다.');
        setLoading(false);
        return;
      }
      handleAlert('error', message);
      setLoading(false);
    }
  }
  useEffect(() => {
    if (isOpened) {
      setLoading(true);

      setTimeout(() => {
        getPatientsInfo(hospitalCode);
      }, 1000);
    }
  }, [isOpened]);

  useEffect(() => {
    if (searchVal === '') {
      return;
    }

    const patientInfo = {
      hospitalCode,
      patientName: searchVal,
    };
    setLoading(true);
    setTimeout(() => {
      getPatientsInfoByName(patientInfo);
    }, 1000);

    console.log(searchVal);
  }, [searchVal]);

  const columns = [
    { field: 'patientName', headerName: '이름', width: 150 },
    { field: 'patientBirth', headerName: '생년월일', width: 150 },
    { field: 'patientGender', headerName: '성별', width: 120 },
    { field: 'patientTel', headerName: '연락처', width: 150 },
    { field: 'recentDate', headerName: '최근 진료 일자', width: 200 },
    { field: 'patientAddr1', headerName: '주소 1', width: 300 },
    { field: 'patientAddr2', headerName: '주소 2', width: 150 },
    { field: 'patientPostal', headerName: '우편번호', width: 140 },
  ];

  const handleReset = () => {
    setLoading(true);
    setPageStatus('SEARCH');
    setTimeout(() => {
      getPatientsInfo(hospitalCode);
    }, 1000);
  };

  const handlePatientClick = (e) => {
    const { row } = e;
    setSelectedPatientInfo(row);
  };

  const handlePatientToDiagnosticInfo = () => {
    setLoading(true);

    const { patientId } = selectedPatientInfo;
    setTimeout(() => {
      getDiagnosticInfoByPatientId(patientId);
    }, 1000);
  };

  const getStepContent = (step) => {
    if (step === 'SEARCH') {
      return (
        <>
          {isLoading && (
            <div
              style={{
                width: '100%',
                height: '30vh',
                minHeight: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <HashSpinner />
            </div>
          )}
          {!isLoading && (
            <Grid container justify="center">
              <Grid item xs={12}>
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <SearchBox
                      setSearchVal={setSearchVal}
                      placeholder="환자 이름을 검색해주세요."
                      noRemove
                    />
                  </div>

                  <motion.div
                    variants={buttonSetting}
                    initial="rest"
                    whileHover="hover"
                    whileTap="pressed"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
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
              </Grid>
              <Grid item xs={12} style={{ marginTop: '2em' }}>
                <div style={{ height: 300, width: '100%' }}>
                  <DataGrid
                    rows={patientList}
                    columns={columns}
                    onCellClick={handlePatientClick}
                    pageSize={10}
                  />
                </div>
                {Object.keys(selectedPatientInfo).length > 1 && (
                  <div style={{ marginTop: '1rem' }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handlePatientToDiagnosticInfo()}
                    >
                      더 보기
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          )}
        </>
      );
    }

    if (step === 'DETAIL') {
      return (
        <>
          {!isLoading && (
            <Grid container justify="center">
              <Grid
                item
                xs={12}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: '0.7rem',
                  borderTop: '1px solid rgba(0,0,0,0.12)',
                }}
              >
                <motion.div
                  variants={buttonSetting}
                  initial="rest"
                  whileHover="hover"
                  whileTap="pressed"
                  style={{
                    display: 'flex',

                    alignItems: 'center',
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
                    <IoIosArrowBack />
                  </IconButton>
                </motion.div>
                <StyledTypography
                  variant="subtitle1"
                  component="span"
                  weight={6}
                  style={{
                    marginLeft: '0.5rem',
                  }}
                >
                  이전으로 돌아가기
                </StyledTypography>
                <br />
              </Grid>

              <Grid
                item
                xs={12}
                style={{
                  marginTop: '0.5em',
                  borderTop: '1px solid rgba(0,0,0,0.12)',
                }}
              >
                <TableContainer
                  component={Paper}
                  style={{
                    marginTop: '1.5rem',
                  }}
                >
                  <Table style={{ minWidth: '930px', overflowX: 'scroll' }}>
                    <DiagnosticTableHead />
                    <TableBody>
                      {patientDetailList.map((data) => (
                        <Fragment key={data.diagTestId}>
                          <DiagnosticTableRow data={data} />
                        </Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </>
      );
    }
  };

  return (
    <Fragment>
      <Modal
        className={classes.modal}
        open={isOpened}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <SpringFade in={isOpened}>
          <div
            className={classes.paper}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <ResponsiveContainer breakpoint={breakpoint} style={{ flex: 1 }}>
              <DrawerHeader breakpoint={breakpoint}>
                <StyledTypography variant="h5" component="h5" weight={7}>
                  {pageStatus === 'SEARCH' && '환자 검색'}
                  {pageStatus === 'DETAIL' && '환자가 받은 진단 검사 기록'}
                </StyledTypography>
                <div>
                  <IconButton onClick={handleClose}>
                    <AiOutlineClose size={24} />
                  </IconButton>
                </div>
              </DrawerHeader>
              {getStepContent(pageStatus)}
            </ResponsiveContainer>
          </div>
        </SpringFade>
      </Modal>
    </Fragment>
  );
};

export default DiagnosticSearchModal;
