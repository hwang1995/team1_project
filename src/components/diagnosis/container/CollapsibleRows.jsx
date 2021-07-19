import React, { useState, Fragment } from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Grid,
} from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import StyledTypography from 'components/common/typography/StyledTypography';
import CollapsibleMedicineRows from './CollapsibleMedicineRows';
import CollapsibleDiagnosticsRows from './CollapsibleDiagnosticsRows';

/**
 * * 목표 : 진단 검사 테이블 행을 나타내기 위한 컴포넌트
 * @param {object} data
 * @returns {JSX.Element} View
 * @author SUNG WOOK HWANG
 */
const CollapsibleRows = ({ data }) => {
  // 약품 정보, 주사 정보, 진단 검사 정보
  const { medicines, injectors, diagnostics } = data;

  // 진단 검사가 열였는지 확인하기 위한 상태
  const [isOpened, setOpened] = useState(false);

  return (
    <Fragment>
      <TableRow onClick={() => setOpened(!isOpened)}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpened(!isOpened)}>
            {isOpened ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {data.startDate}
        </TableCell>
        <TableCell component="th" scope="row">
          {data.visitPurpose}
        </TableCell>
        <TableCell component="th" scope="row">
          {data.drOpinion}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={isOpened} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Grid container style={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} sm={2}>
                  <StyledTypography
                    variant="subtitle1"
                    component="div"
                    weight={7}
                  >
                    의사소견
                  </StyledTypography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <StyledTypography
                    variant="subtitle1"
                    component="div"
                    weight={4}
                  >
                    {data.drOpinion}
                  </StyledTypography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <StyledTypography
                    variant="subtitle1"
                    component="div"
                    weight={7}
                  >
                    약 처방 기록
                  </StyledTypography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  {medicines.length === 0 && (
                    <StyledTypography
                      variant="subtitle1"
                      component="div"
                      weight={7}
                      style={{
                        padding: '1rem',
                      }}
                    >
                      약 처방 내역이 존재하지 않습니다.
                    </StyledTypography>
                  )}
                  {medicines.length > 0 && (
                    <CollapsibleMedicineRows data={medicines} />
                  )}
                </Grid>

                <Grid item xs={12} sm={2}>
                  <StyledTypography
                    variant="subtitle1"
                    component="div"
                    weight={7}
                  >
                    주사 처방 기록
                  </StyledTypography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  {injectors.length === 0 && (
                    <StyledTypography
                      variant="subtitle1"
                      component="div"
                      weight={7}
                      style={{
                        padding: '1rem',
                      }}
                    >
                      주사 처방 내역이 존재하지 않습니다.
                    </StyledTypography>
                  )}
                  {injectors.length > 0 && (
                    <CollapsibleMedicineRows data={injectors} />
                  )}
                </Grid>

                <Grid item xs={12} sm={2}>
                  <StyledTypography
                    variant="subtitle1"
                    component="div"
                    weight={7}
                  >
                    진단 검사 기록
                  </StyledTypography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  {diagnostics.length === 0 && (
                    <StyledTypography
                      variant="subtitle1"
                      component="div"
                      weight={7}
                      style={{
                        padding: '1rem',
                      }}
                    >
                      진단 검사 내역이 존재하지 않습니다.
                    </StyledTypography>
                  )}
                  {diagnostics.length > 0 && (
                    <CollapsibleDiagnosticsRows data={diagnostics} />
                  )}
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default React.memo(CollapsibleRows);
