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

const getDiagTestValueEl = (diagTestValue, presUpperLimit, presLowerLimit) => {
  if (diagTestValue === 0) {
    return (
      <TableCell size="small" style={{ color: '#3b5bdb', fontWeight: 700 }}>
        X
      </TableCell>
    );
  }
  // #1. diagTestValue < presLowerLimit || diagTestValue > presUpperLimit
  // #f03e3e
  if (diagTestValue > presUpperLimit) {
    return (
      <TableCell size="small" style={{ color: '#f03e3e', fontWeight: 900 }}>
        {diagTestValue}
      </TableCell>
    );
  }

  if (presLowerLimit > diagTestValue) {
    return (
      <TableCell size="small" style={{ color: '#3b5bdb', fontWeight: 700 }}>
        {diagTestValue}
      </TableCell>
    );
  }

  // #2. presLowerLimit <= diagTestValue <= presUpperLimit
  if (presLowerLimit <= diagTestValue && diagTestValue <= presUpperLimit) {
    return (
      <TableCell size="small" style={{ fontWeight: 700 }}>
        {diagTestValue}
      </TableCell>
    );
  }
  // #3. diagTestValue === 0
};

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
              검사 값
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

                {getDiagTestValueEl(
                  rows.diagTestValue,
                  rows.presUpperLimit,
                  rows.presLowerLimit,
                )}

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
