import React, { Fragment, useEffect, useState } from 'react';
import {
  Grid,
  Table,
  TableContainer,
  TableBody,
  Paper,
  IconButton,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { setDiagnosticModal } from 'redux/features/diagnostic/diagnosticSlice';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { GrPowerReset } from 'react-icons/gr';
import { motion } from 'framer-motion';

import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';

// import SearchBox from 'components/common/search/SearchBox';
import DiagnosticTableHead from 'components/diagnostic/table/DiagnosticTableHead';
import DiagnosticTableRow from 'components/diagnostic/table/DiagnosticTableRow';
import DiagnosticDrawer from 'components/diagnostic/drawer/DiagnosticDrawer';
import useCalendar from 'hooks/useCalendar';
import PageTransition from 'components/common/transition/PageTransition';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';
import DiagnosticSearchModal from 'components/diagnostic/modal/DiagnosticSearchModal';
import { showWeeklyDiagnosticTestListByHospitalCode } from 'apis/diagnosisInsepctionAPI';
import HashSpinner from 'components/common/spinner/HashSpinner';
import StyledTypography from 'components/common/typography/StyledTypography';

/**
 * 이 페이지 컴포넌트는 진단 검사 페이지를 작성하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * 진단 검사 (PatientSearch, ColoredButton, Table, DiagnosticDrawer )
 * * Sider
 * * Header
 * @returns {JSX.Element}
 * @author SUNG WOOK HWANG
 */
const DiagnosticPage = () => {
  const dispatch = useDispatch();

  // 로딩 중 상태
  const [isLoading, setLoading] = useState(true);
  const [calInfo, sendCalInfo, getPrevWeek, getNextWeek, reset] = useCalendar();

  // 진단 정보
  const [diagnosticInfo, setDiagnosticInfo] = useState([]);

  // Redux store에 있는 병원 코드
  const { hospitalCode } = useSelector((state) => state.common.loginInfo);

  // Redux store에 있는 진단 검사 ID
  const currentDiagTestId = useSelector(
    (state) => state.diagnostic.currentDiagTestId,
  );
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
   * * 목표 : 진단 검사를 가져오기 위한 함수
   * @param {object} sendInfo
   * @return {object} result
   */
  async function getDiagnosticInfos(sendInfo) {
    try {
      const result = await showWeeklyDiagnosticTestListByHospitalCode(sendInfo);
      setDiagnosticInfo(result);
      setLoading(false);
    } catch (error) {
      setDiagnosticInfo([]);
      const { message } = error.response.data;
      setLoading(false);
      handleAlert('error', message);
    }
  }

  /**
   * * 목표 : 처음에 들어올 때에 현재 주간과 병원 코드로 데이터를 가지고 오기 위한 side-effect
   * @author SUNG WOOK HWANG
   */
  useEffect(() => {
    setLoading(true);

    const { startDate, endDate } = sendCalInfo;
    const sendInfo = {
      startDate,
      endDate,
      hospitalCode,
    };
    setTimeout(() => {
      getDiagnosticInfos(sendInfo);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendCalInfo]);

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
                  <span>진단 검사 보기</span>
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
                      onClick={() => {
                        dispatch(
                          setDiagnosticModal({
                            name: 'search',
                            status: true,
                          }),
                        );
                      }}
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
                      onClick={reset}
                    >
                      <GrPowerReset />
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
                      onClick={getPrevWeek}
                    >
                      <IoIosArrowBack />
                    </IconButton>
                  </motion.div>

                  <motion.div
                    variants={buttonSetting}
                    initial="rest"
                    whileHover="hover"
                    whileTap="pressed"
                  >
                    {' '}
                    <IconButton
                      type="button"
                      size="small"
                      style={{
                        border: '1px solid rgba(0,0,0,0.12)',
                        marginLeft: '0.5rem',
                        marginRight: '0.5rem',
                        padding: '0.5rem',
                      }}
                      onClick={getNextWeek}
                    >
                      <IoIosArrowForward />
                    </IconButton>
                  </motion.div>

                  <span>
                    {calInfo.startDate} ~ {calInfo.endDate}
                  </span>
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

                {!isLoading && diagnosticInfo.length > 0 && (
                  <TableContainer
                    component={Paper}
                    style={{
                      marginTop: '1.5rem',
                    }}
                  >
                    <Table style={{ minWidth: '930px', overflowX: 'scroll' }}>
                      <DiagnosticTableHead />
                      <TableBody>
                        {diagnosticInfo.map((data) => (
                          <Fragment key={data.diagTestId}>
                            <DiagnosticTableRow data={data} />
                          </Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}

                {!isLoading && diagnosticInfo.length === 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '80vh',
                    }}
                  >
                    <div style={{ width: '100%', maxWidth: '500px' }}>
                      <img
                        src="/assets/image/404/3.png"
                        alt="not found"
                        width="100%"
                      />
                    </div>
                    <StyledTypography
                      variant="h4"
                      component="h5"
                      weight={7}
                      style={{
                        marginTop: '1rem',
                      }}
                    >
                      해당 주의 해당 병원의 진단 검사 목록이 존재하지 않습니다.
                    </StyledTypography>
                  </div>
                )}
                {currentDiagTestId !== 0 && <DiagnosticDrawer />}

                <DiagnosticSearchModal />
              </ContentContainer>
            </PageTransition>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default DiagnosticPage;
