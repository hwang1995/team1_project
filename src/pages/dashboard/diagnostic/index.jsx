import React, { useState, Fragment } from 'react';
import {
  Divider,
  Grid,
  Table,
  TableContainer,
  TableBody,
  Hidden,
  Paper,
  IconButton,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setDiagnosticModal } from 'redux/features/diagnostic/diagnosticSlice';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { GrPowerReset } from 'react-icons/gr';
import { motion } from 'framer-motion';
import PuffLoader from 'react-spinners/PuffLoader';
import PageHeader from 'components/common/header/PageHeader';
import MenuSidebar from 'components/common/sidebar/MenuSidebar';
import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';

// import SearchBox from 'components/common/search/SearchBox';
import diagnosticHistory from './diagnosticHistory';
import DiagnosticTableHead from 'components/diagnostic/table/DiagnosticTableHead';
import DiagnosticTableRow from 'components/diagnostic/table/DiagnosticTableRow';
import DiagnosticDrawer from 'components/diagnostic/drawer/DiagnosticDrawer';
import useCalendar from 'hooks/useCalendar';
import PageTransition from 'components/common/transition/PageTransition';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';
import DiagnosticSearchModal from 'components/diagnostic/modal/DiagnosticSearchModal';

/**
 * 이 페이지 컴포넌트는 진단 검사 페이지를 작성하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * 진단 검사 (PatientSearch, ColoredButton, Table, DiagnosticDrawer )
 * * Sider
 * * Header
 * @returns {JSX.Element}
 */
const DiagnosticPage = () => {
  const dispatch = useDispatch();

  const [searchVal, setSearchVal] = useState('');
  const [calInfo, getPrevWeek, getNextWeek, reset] = useCalendar();

  const buttonSetting = {
    rest: { scale: 1 },
    hover: { scale: 1.2 },
    pressed: { scale: 0.95 },
  };

  return (
    <div>
      {/* DiagnosticPage를 작성합니다. 들어가야할 컴포넌트는 위의 주석에 설명되어
      있으니 참조하시면 됩니다. */}
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
                        console.log('gogo');
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

                <TableContainer
                  component={Paper}
                  style={{
                    marginTop: '1.5rem',
                  }}
                >
                  <Table style={{ minWidth: '930px', overflowX: 'scroll' }}>
                    <DiagnosticTableHead />
                    <TableBody>
                      {diagnosticHistory.map((data) => (
                        <Fragment key={data.diag_test_id}>
                          <DiagnosticTableRow data={data} />
                        </Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <DiagnosticDrawer />
              </ContentContainer>
            </PageTransition>
          </Grid>
        </Grid>
      </main>
      <DiagnosticSearchModal />
    </div>
  );
};

export default DiagnosticPage;