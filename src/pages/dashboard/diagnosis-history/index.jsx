import React, { useState, useEffect, Fragment } from 'react';
import {
  Grid,
  IconButton,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
} from '@material-ui/core';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';
import PageTransition from 'components/common/transition/PageTransition';
import { AiOutlineSearch } from 'react-icons/ai';
import { GrPowerReset } from 'react-icons/gr';
import { getPatientsList } from 'apis/patientAPI';
import HashSpinner from 'components/common/spinner/HashSpinner';
import DiagnosisHistoryTableHead from 'components/diagnosis-history/table/DiagnosisHistoryTableHead';
import DiagnosisHistoryTableRow from 'components/diagnosis-history/table/DiagnosisHistoryTableRow';
import PatientDiagnosisHistoryDrawer from 'components/diagnosis-history/drawer/PatientDiagnosisHistoryDrawer';
import DiagnosisHistorySearchModal from 'components/diagnosis-history/modal/DiagnosisHistorySearchModal';
import { setModalStatus } from 'redux/features/history/diagnosisHistorySlice';

/**
 * * 목표 : 진료 기록을 보여주기 위한 페이지 컴포넌트
 *
 * @returns {JSX.Element} View
 * @author SUNG WOOK HWANG
 */
const DiagnosisHistoryPage = () => {
  const dispatch = useDispatch();

  // Loading의 상태를 저장
  const [isLoading, setLoading] = useState(true);

  // 환자의 정보를 저장 하기 위한 상태
  const [patientList, setPatientList] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  // Redux store에 저장된 병원코드
  const { hospitalCode } = useSelector((state) => state.common.loginInfo);

  // Redux store에 저장된 현재 환자의 ID
  const currentPatientId = useSelector(
    (state) => state.diagnosisHistory.currentPatientId,
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  const handleSearchModal = () => {
    dispatch(
      setModalStatus({
        name: 'search',
        status: true,
      }),
    );
  };
  const buttonSetting = {
    rest: { scale: 1 },
    hover: { scale: 1.2 },
    pressed: { scale: 0.95 },
  };

  /**
   * * 목표 : 병원코드를 통해 환자 정보를 가지고 오기 위한 함수
   * @param {string} hospitalCode
   * @returns {object} result
   */
  async function getPatientInfo(hospitalCode) {
    try {
      const result = await getPatientsList(hospitalCode);
      setPatientList(result.data.data);
      console.log(result.data.data.length);
      setLoading(false);
    } catch (error) {
      const { message } = error.response.data;
      if (message !== undefined) {
        handleAlert('error', message);
        setLoading(false);
        return;
      }
      handleAlert('error', error);
      setLoading(false);
      return;
    }
  }

  /**
   * 렌더링 시에 발생되는 side-effect
   */
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getPatientInfo(hospitalCode);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  /**
   * 초기화 버튼을 클릭시에 초기화가 되면서 값도 다시 불러온다.
   */
  const handleReset = () => {
    setLoading(true);
    setPatientList([]);
    setPage(0);
    setRowsPerPage(5);
    setTimeout(() => {
      getPatientInfo(hospitalCode);
    }, 1000);
  };

  return (
    <div>
      <header
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1,
        }}
      >
        <ResponsivePageHeader />
      </header>
      <main>
        <Grid container>
          <Grid item xs={12}>
            <PageTransition>
              <ContentContainer>
                <TitleHeader>
                  <span>진료 | </span>
                  <span>진료 기록 보기</span>
                </TitleHeader>
                <div
                  className="icon-area"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderTop: '1px solid rgba(0,0,0,0.08)',
                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                  }}
                >
                  <motion.div
                    variants={buttonSetting}
                    initial="rest"
                    whileHover="hover"
                    whileTap="pressed"
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
                      onClick={() => handleSearchModal()}
                    >
                      <AiOutlineSearch />
                    </IconButton>
                  </motion.div>

                  <motion.div
                    variants={buttonSetting}
                    initial="rest"
                    whileHover="hover"
                    whileTap="pressed"
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

                {isLoading && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100vw',
                      height: '80vh',
                    }}
                  >
                    <HashSpinner />
                  </div>
                )}

                {!isLoading && patientList.length > 0 && (
                  <Fragment>
                    <TableContainer
                      component={Paper}
                      style={{
                        marginTop: '1.5rem',
                      }}
                    >
                      <Table style={{ minWidth: '930px', overflowX: 'scroll' }}>
                        {/* TableHead */}
                        <DiagnosisHistoryTableHead />
                        <TableBody>
                          {patientList
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage,
                            )
                            .map((data, index) => (
                              <Fragment key={data.patientId + 'Patients'}>
                                <DiagnosisHistoryTableRow data={data} />
                              </Fragment>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 30, 50]}
                      component="div"
                      count={patientList.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </Fragment>
                )}
                {currentPatientId !== 0 && <PatientDiagnosisHistoryDrawer />}
                <DiagnosisHistorySearchModal />
              </ContentContainer>
            </PageTransition>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default DiagnosisHistoryPage;
