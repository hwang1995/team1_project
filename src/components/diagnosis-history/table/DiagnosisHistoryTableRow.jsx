import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import StyledButton from 'components/common/button/StyledButton';

const DiagnosisHistoryTableRow = ({ data }) => {
  const handleClick = () => {
    alert('You clicked me ?');
  };

  return (
    <TableRow hover>
      <TableCell size="small">{data.patientId}</TableCell>
      <TableCell size="small">{data.patientName}</TableCell>
      <TableCell size="small">{data.patientBirth}</TableCell>
      <TableCell size="small">
        {data.patientGender === 'male' ? '남자' : '여자'}
      </TableCell>
      <TableCell size="small">{data.patientTel}</TableCell>
      <TableCell size="small">
        {data.patientAddr1} {data.patientAddr2} {data.patientPostal}
      </TableCell>
      <TableCell size="small">
        <StyledButton bgColor="#004D80" color="white" onClick={handleClick}>
          상세 보기
        </StyledButton>
      </TableCell>
    </TableRow>
  );
};

export default DiagnosisHistoryTableRow;
