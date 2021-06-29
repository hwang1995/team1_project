import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TableRow, TableCell } from '@material-ui/core';

import StyledInputBase from 'components/common/input/StyledInputBase';
import useInput from 'hooks/useInput';
import { setDiagnosticDataInput } from 'redux/features/diagnostic/diagnosticSlice';

const DiagnosticDetailInputTableRows = ({ data }) => {
  const input = useInput(0);
  const dispatch = useDispatch();

  // 처음에 값 설정
  useEffect(() => {
    const { diag_inspection_id } = data;
    dispatch(setDiagnosticDataInput({ diag_inspection_id, value: 0 }));
  }, [data, dispatch]);

  const handleOnBlur = () => {
    const value = Number.parseFloat(input.value);
    const { diag_inspection_id } = data;
    dispatch(setDiagnosticDataInput({ diag_inspection_id, value }));
  };
  return (
    <TableRow>
      <TableCell size="small">{data.bundle_code}</TableCell>
      <TableCell size="small">{data.pres_code}</TableCell>
      <TableCell size="small">{data.bundle_name}</TableCell>
      <TableCell size="small">{data.pres_name}</TableCell>
      <TableCell size="small">
        <StyledInputBase
          style={{ maxHeight: '28px' }}
          type="number"
          onBlur={handleOnBlur}
          {...input}
        />
      </TableCell>
      <TableCell size="small">
        {((data.pres_lower_limit + data.pres_upper_limit) / 2).toFixed(2)}{' '}
        {data.pres_unit}
      </TableCell>
      <TableCell size="small">{data.member_name}</TableCell>
      <TableCell size="small">{data.inspector_member_name}</TableCell>
    </TableRow>
  );
};

export default React.memo(DiagnosticDetailInputTableRows);
