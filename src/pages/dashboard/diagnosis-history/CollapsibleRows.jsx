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
import CollapsibleVitalsRows from './CollapsibleVitalsRows';

const CollapsibleRows = ({ data }) => {
  const { pharmacies, injectors, diagnostics, vitals } = data;
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
          {data.start_date}
        </TableCell>
        <TableCell component="th" scope="row">
          {data.visit_purpose}
        </TableCell>
        <TableCell component="th" scope="row">
          {data.dr_opinion}
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
                    {data.dr_opinion}
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
                  <CollapsibleMedicineRows data={pharmacies} />
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
                  <CollapsibleMedicineRows data={injectors} />
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
                  <CollapsibleDiagnosticsRows data={diagnostics} />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <StyledTypography
                    variant="subtitle1"
                    component="div"
                    weight={7}
                  >
                    바이탈 기록
                  </StyledTypography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <CollapsibleVitalsRows data={vitals} />
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