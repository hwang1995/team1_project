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
    const { diagTestRecordId } = data;
    dispatch(setDiagnosticDataInput({ diagTestRecordId, value: 0 }));
  }, [data, dispatch]);

  const handleOnBlur = () => {
    const value = Number.parseFloat(input.value);
    const { diagTestRecordId } = data;
    dispatch(setDiagnosticDataInput({ diagTestRecordId, value }));
  };
  return (
    <TableRow>
      <TableCell size="small">{data.bundleCode}</TableCell>
      <TableCell size="small">{data.presCode}</TableCell>
      <TableCell size="small">{data.bundleName}</TableCell>
      <TableCell size="small">{data.presName}</TableCell>
      <TableCell size="small">
        <StyledInputBase
          style={{ maxHeight: '28px' }}
          type="number"
          onBlur={handleOnBlur}
          {...input}
        />
      </TableCell>
      <TableCell size="small">{data.diagTestAvgValue}</TableCell>
      <TableCell size="small">{data.doctorName}</TableCell>
      <TableCell size="small">{data.inspectorName}</TableCell>
    </TableRow>
  );
};

export default React.memo(DiagnosticDetailInputTableRows);
