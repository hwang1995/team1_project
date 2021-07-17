import React, { Fragment, useEffect, useState } from 'react';
import {
  SwipeableDrawer,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { AiOutlineClose } from 'react-icons/ai';
import { setDrawerStatus } from 'redux/features/history/diagnosisHistorySlice';
import { showDiagnosisHistoryByPatientId } from 'apis/diagnosisAPI';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import StyledTypography from 'components/common/typography/StyledTypography';
import CollapsibleRows from 'components/diagnosis/container/CollapsibleRows';
import HashSpinner from 'components/common/spinner/HashSpinner';

const PatientDiagnosisHistoryDrawer = () => {
  const { breakpoint } = useWindowSize();
  const [isLoading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const dispatch = useDispatch();
  const isOpened = useSelector(
    (state) => state.diagnosisHistory.drawerStatus.diagnosisHistory,
  );

  const patientId = useSelector(
    (state) => state.diagnosisHistory.currentPatientId,
  );
  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    dispatch(
      setDrawerStatus({
        name: 'diagnosisHistory',
        status: open,
      }),
    );
  };

  async function getDiagnosisHistory(patientId) {
    try {
      const result = await showDiagnosisHistoryByPatientId(patientId);
      setHistoryData(result);
      setLoading(true);
    } catch (error) {
      const { message } = error.response.data;
      if (message === undefined) {
        handleAlert('error', error);
        setLoading(true);
        return;
      }
      handleAlert('error', message);
      setLoading(true);
    }
  }

  useEffect(() => {
    if (isOpened) {
      setTimeout(() => {
        getDiagnosisHistory(patientId);
      }, 1000);
    }

    return () => {
      setHistoryData([]);
      setLoading(false);
    };
  }, [isOpened]);

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
            style={{ padding: '0.5rem', backgroundColor: 'white', zIndex: 2 }}
          >
            <h1>진료 기록 보기</h1>
            <div>
              <IconButton>
                <AiOutlineClose
                  size={32}
                  onClick={() =>
                    dispatch(
                      setDrawerStatus({
                        name: 'diagnosisHistory',
                        status: false,
                      }),
                    )
                  }
                />
              </IconButton>
            </div>
          </DrawerHeader>
          {isLoading && historyData.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell size="small" />
                    <TableCell>
                      <StyledTypography
                        variant="subtitle1"
                        component="h5"
                        weight={7}
                      >
                        진료일자
                      </StyledTypography>
                    </TableCell>
                    <TableCell>
                      <StyledTypography
                        variant="subtitle1"
                        component="h5"
                        weight={7}
                      >
                        방문이유
                      </StyledTypography>
                    </TableCell>
                    <TableCell>
                      {' '}
                      <StyledTypography
                        variant="subtitle1"
                        component="h5"
                        weight={7}
                      >
                        의사의견
                      </StyledTypography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {historyData.map((rows) => (
                    <CollapsibleRows data={rows} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {isLoading && historyData.length === 0 && (
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '80vh',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <div style={{ maxWidth: '500px', width: '100%' }}>
                <img
                  src="/assets/image/404/5.png"
                  alt="not found"
                  width="100%"
                />
              </div>
              <StyledTypography variant="h4" component="h4" weight={6}>
                진료 기록을 찾을 수 없습니다.
              </StyledTypography>
            </div>
          )}
          {!isLoading && (
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '90vh',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <HashSpinner />
            </div>
          )}
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default PatientDiagnosisHistoryDrawer;
