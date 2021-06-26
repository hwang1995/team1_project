import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import ColorCircleContainer from 'components/common/container/ColorCircleContainer';

const DiagnosticDetailTableRows = ({ data }) => {
  return (
    <TableRow>
      <TableCell>{data.bundle_code}</TableCell>
      <TableCell>{data.pres_code}</TableCell>
      <TableCell>{data.bundle_name}</TableCell>
      <TableCell>{data.pres_name}</TableCell>
      <TableCell>
        {data.diag_test_value === null && 'X'}{' '}
        {data.diag_test_value !== null && data.diag_test_value}
      </TableCell>
      <TableCell>
        {' '}
        {((data.pres_lower_limit + data.pres_upper_limit) / 2).toFixed(2)}{' '}
        {data.pres_unit}
      </TableCell>
      <TableCell>
        {data.pres_specimen_name === '' && (
          <StyledTypography variant="subtitle2" component="h5" weight={9}>
            X
          </StyledTypography>
        )}

        {data.pres_specimen_name !== '' && (
          <StyledTypography variant="subtitle2" component="h5" weight={9}>
            {data.pres_specimen_name}
          </StyledTypography>
        )}
      </TableCell>

      <TableCell>
        {data.pres_vessel === '' && (
          <StyledTypography variant="subtitle2" component="h5" weight={9}>
            X
          </StyledTypography>
        )}
        {data.pres_vessel !== '' && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ColorCircleContainer size={10} color={data.pres_vessel} />
            <StyledTypography
              variant="subtitle2"
              component="h5"
              weight={9}
              style={{ marginLeft: '0.75rem' }}
            >
              {data.pres_vessel}
            </StyledTypography>
          </div>
        )}
      </TableCell>
      <TableCell>{data.member_name}</TableCell>
      <TableCell>{data.inspector_member_name}</TableCell>
      <TableCell>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ColorCircleContainer size={10} color={data.diag_test_status} />
          {data.diag_test_status === 'PENDING' && (
            <StyledTypography
              variant="subtitle2"
              component="h5"
              weight={9}
              style={{ marginLeft: '0.75rem' }}
            >
              대기
            </StyledTypography>
          )}
          {data.diag_test_status === 'REGISTER' && (
            <StyledTypography
              variant="subtitle2"
              component="h5"
              weight={7}
              style={{ marginLeft: '0.75rem' }}
            >
              접수
            </StyledTypography>
          )}
          {data.diag_test_status === 'COMPLETED' && (
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
