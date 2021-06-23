import React, { Fragment, useEffect, useState } from 'react';
import {
  SwipeableDrawer,
  Grid,
  Divider,
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
import { setDiagnosisHistoryDrawer } from 'redux/features/diagnosis/diagnosisSlice';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import diagnosisHistory from 'pages/dashboard/diagnosis/diagnosisHistory.json';
import StyledTypography from 'components/common/typography/StyledTypography';
import CollapsibleRows from '../container/CollapsibleRows';

const DiagnosisHistoryDrawer = () => {
  const { breakpoint } = useWindowSize();
  const [searchVal, setSearchVal] = useState('');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isOpened = useSelector(
    (state) => state.diagnosis.drawerStatus.diagnosisHistory,
  );

  const { data } = diagnosisHistory;

  console.log(data);
  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    dispatch(setDiagnosisHistoryDrawer(open));
  };

  useEffect(() => {
    if (searchVal === '') {
      return;
    }
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
    console.log('검색 창에서 searchVal의 값이 변경되었습니다.', searchVal);
  }, [searchVal]);

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
                {data.map((rows) => (
                  <CollapsibleRows data={rows} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default DiagnosisHistoryDrawer;
