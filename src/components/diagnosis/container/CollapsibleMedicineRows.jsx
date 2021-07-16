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

const CollapsibleMedicineRows = ({ data }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              약품 코드
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              약품 명
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              약품 타입
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              약품 규격
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              처방 량
            </StyledTypography>
          </TableCell>
        </TableHead>

        <TableBody>
          {data.map((rows, index) => (
            <Fragment key={index}>
              <TableRow>
                <TableCell size="small">{rows.medicineCode}</TableCell>
                <TableCell size="small">{rows.medicineName}</TableCell>

                <TableCell size="small">{rows.medicineType}</TableCell>
                <TableCell size="small">{rows.medicineUnit}</TableCell>
                <TableCell size="small">{rows.medicineDose}</TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleMedicineRows;
