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
 * * 목표 : 진단 검사의 대한 테이블 행을 나타내기 위한 컴포넌트
 * @param {object} data
 * @returns {JSX.Element} View
 * @author SUNG WOOK HWANG
 */
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
            <Fragment key={rows.diagInspectionId}>
              <TableRow>
                <TableCell size="small">{rows.bundleCode}</TableCell>
                <TableCell size="small">{rows.bundleName}</TableCell>
                <TableCell size="small">{rows.presCode}</TableCell>
                <TableCell size="small">{rows.presName}</TableCell>
                <TableCell size="small">{rows.presUpperLimit}</TableCell>
                <TableCell size="small">{rows.presLowerLimit}</TableCell>
                <TableCell size="small">{rows.presUnit}</TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(CollapsibleDiagnosticsRows);
