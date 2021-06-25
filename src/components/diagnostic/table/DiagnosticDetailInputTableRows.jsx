import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import StyledInputBase from 'components/common/input/StyledInputBase';

const DiagnosticDetailInputTableRows = ({ data }) => {
  return (
    <TableRow>
      <TableCell>{data.bundle_code}</TableCell>
      <TableCell>{data.pres_code}</TableCell>
      <TableCell>{data.bundle_name}</TableCell>
      <TableCell>{data.pres_name}</TableCell>
      <TableCell>
        <StyledInputBase style={{ maxHeight: '28px' }} type="number" />
      </TableCell>
      <TableCell>
        {((data.pres_lower_limit + data.pres_upper_limit) / 2).toFixed(2)}{' '}
        {data.pres_unit}
      </TableCell>
      <TableCell>{data.member_name}</TableCell>
      <TableCell>{data.inspector_member_name}</TableCell>
    </TableRow>
  );
};

export default DiagnosticDetailInputTableRows;
