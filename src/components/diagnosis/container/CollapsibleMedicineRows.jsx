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

/**
 * * 목표 : 약품 처방 기록에 대한 테이블 행을 나타내기 위한 컴포넌트
 * @param {object} data
 * @returns {JSX.Element} View
 * @author SUNG WOOK HWANG
 */
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

export default React.memo(CollapsibleMedicineRows);
