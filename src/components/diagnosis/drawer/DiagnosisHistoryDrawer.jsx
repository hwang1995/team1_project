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
import { AiOutlineClose } from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import { setDiagnosisHistoryDrawer } from 'redux/features/diagnosis/diagnosisSlice';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import StyledTypography from 'components/common/typography/StyledTypography';
import CollapsibleRows from '../container/CollapsibleRows';
import { showDiagnosisHistoryByPatientId } from 'apis/diagnosisAPI';
import HashSpinner from 'components/common/spinner/HashSpinner';

/**
 * * 목표 : 진료 기록을 보여주기 위한 Drawer 컴포넌트
 * @returns {JSX.Element} view
 * @author SUNG WOOK HWANG
 */
const DiagnosisHistoryDrawer = () => {
  // 해상도 breakpoint를 설정하기 위한 Custom Hook
  const { breakpoint } = useWindowSize();

  // Spinner를 띄우기 위한 상태
  const [isLoading, setLoading] = useState(false);

  // 진료 기록을 저장하기 위한 상태
  const [historyData, setHistoryData] = useState([]);
  const dispatch = useDispatch();

  // 진료 Drawer의 상태
  const isOpened = useSelector(
    (state) => state.diagnosis.drawerStatus.diagnosisHistory,
  );
  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  // Redux store에 저장되어있는 환자 정보
  const patientInfo = useSelector((state) => state.diagnosis.patient);

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    dispatch(setDiagnosisHistoryDrawer(open));
  };

  /**
   * * 목표 : isOpened가 바꼈을 시에 작동하는 side-effect
   */
  useEffect(() => {
    if (isOpened) {
      const { patientId } = patientInfo;
      async function getDiagnosisHistory(patientId) {
        try {
          const result = await showDiagnosisHistoryByPatientId(patientId);
          setHistoryData(result);
          setLoading(true);
        } catch (error) {
          const { message } = error.response.data;
          handleAlert('error', message);
          setLoading(true);
        }
      }

      getDiagnosisHistory(patientId);
    }
    return () => {
      setHistoryData([]);
      setLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened]);
  const { REACT_APP_BUCKET_PATH } = process.env;
  const IMAGE_PATH = '/assets/image/404/';
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
                  onClick={() => dispatch(setDiagnosisHistoryDrawer(false))}
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
                  src={REACT_APP_BUCKET_PATH + IMAGE_PATH + '5.png'}
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

export default DiagnosisHistoryDrawer;
