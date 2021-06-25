import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import ColorCircleContainer from 'components/common/container/ColorCircleContainer';
import StyledButton from 'components/common/button/StyledButton';

const DiagnosticTableRow = ({ data }) => {
  return (
    <TableRow>
      <TableCell size="small">{data.diag_test_id}</TableCell>
      <TableCell size="small">{data.patient_name}</TableCell>
      <TableCell size="small">{data.patient_birth}</TableCell>
      <TableCell size="small">
        {data.patient_gender === 'MAN' ? '남자' : '여자'}
      </TableCell>
      <TableCell size="small">{data.created_date}</TableCell>
      <TableCell size="small">{data.doctor_room}</TableCell>
      <TableCell size="small">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ColorCircleContainer size={10} color={data.inspection_status} />
          {data.inspection_status === 'PENDING' && (
            <StyledTypography
              variant="subtitle2"
              component="h5"
              weight={9}
              style={{ marginLeft: '0.75rem' }}
            >
              대기
            </StyledTypography>
          )}
          {data.inspection_status === 'REGISTER' && (
            <StyledTypography
              variant="subtitle2"
              component="h5"
              weight={7}
              style={{ marginLeft: '0.75rem' }}
            >
              접수
            </StyledTypography>
          )}
          {data.inspection_status === 'COMPLETED' && (
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
      <TableCell size="small">
        <StyledButton bgColor="#004D80" color="white">
          검사 보기
        </StyledButton>
      </TableCell>
    </TableRow>
  );
};

export default DiagnosticTableRow;
