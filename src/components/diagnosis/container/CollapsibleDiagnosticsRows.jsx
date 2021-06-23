import React, { Fragment } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';

const CollapsibleDiagnosticsRows = ({ data }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              그룹 코드
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              그룹 명
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              처방 코드
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              처방 명
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              상한 값
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              하한 값
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              규격
            </StyledTypography>
          </TableCell>
        </TableHead>

        <TableBody>
          {data.map((rows) => (
            <Fragment key={rows.diag_inspection_id}>
              <TableRow>
                <TableCell size="small">{rows.bundle_code}</TableCell>
                <TableCell size="small">{rows.bundle_name}</TableCell>
                <TableCell size="small">{rows.pres_code}</TableCell>
                <TableCell size="small">{rows.pres_name}</TableCell>
                <TableCell size="small">{rows.pres_upper_limit}</TableCell>
                <TableCell size="small">{rows.pres_lower_limit}</TableCell>
                <TableCell size="small">{rows.pres_unit}</TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleDiagnosticsRows;
