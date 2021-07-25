import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import ColorCircleContainer from 'components/common/container/ColorCircleContainer';
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

const DiagnosticDetailTableRows = ({ data }) => {
  return (
    <TableRow hover>
      <TableCell size="small">{data.bundleCode}</TableCell>
      <TableCell size="small">{data.presCode}</TableCell>
      <TableCell size="small">{data.bundleName}</TableCell>
      <TableCell size="small">{data.presName}</TableCell>
      <TableCell size="small">
        {data.diagTestValue === 0.0 && 'X'}{' '}
        {data.diagTestValue !== 0.0 && data.diagTestValue}
      </TableCell>
      <TableCell size="small">{data.diagTestAvgValue}</TableCell>
      <TableCell size="small">
        {data.presSpecimenName === '' && (
          <StyledTypography variant="subtitle2" component="h5" weight={9}>
            X
          </StyledTypography>
        )}

        {data.presSpecimenName !== '' && (
          <StyledTypography variant="subtitle2" component="h5" weight={9}>
            {data.presSpecimenName}
          </StyledTypography>
        )}
      </TableCell>

      <TableCell size="small">
        {data.presVessel === '' && (
          <StyledTypography variant="subtitle2" component="h5" weight={9}>
            X
          </StyledTypography>
        )}
        {data.presVessel !== '' && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ColorCircleContainer size={10} color={data.presVessel} />
            <StyledTypography
              variant="subtitle2"
              component="h5"
              weight={9}
              style={{ marginLeft: '0.75rem' }}
            >
              {data.presVessel}
            </StyledTypography>
          </div>
        )}
      </TableCell>
      <TableCell size="small">{data.doctorName}</TableCell>
      <TableCell size="small">
        {data.inspectorName ? data.inspectorName : '지정되지 않음'}
      </TableCell>
      <TableCell size="small">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ColorCircleContainer size={10} color={data.diagTestStatus} />
          {data.diagTestStatus === 'DIAGNOSTIC_PENDING' && (
            <StyledTypography
              variant="subtitle2"
              component="h5"
              weight={9}
              style={{ marginLeft: '0.75rem' }}
            >
              대기
            </StyledTypography>
          )}
          {data.diagTestStatus === 'DIAGNOSTIC_REGISTER' && (
            <StyledTypography
              variant="subtitle2"
              component="h5"
              weight={7}
              style={{ marginLeft: '0.75rem' }}
            >
              접수
            </StyledTypography>
          )}
          {data.diagTestStatus === 'DIAGNOSTIC_COMPLETED' && (
            <StyledTypography
              variant="subtitle2"
              component="h5"
              weight={7}
              style={{ marginLeft: '0.75rem' }}
            >
              완료
            </StyledTypography>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default DiagnosticDetailTableRows;
