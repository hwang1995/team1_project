import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
  setCurrentDiagTestId,
  setDiagnosticDrawer,
  setDiagnosticDrawerPage,
} from 'redux/features/diagnostic/diagnosticSlice';
import StyledTypography from 'components/common/typography/StyledTypography';
import ColorCircleContainer from 'components/common/container/ColorCircleContainer';
import StyledButton from 'components/common/button/StyledButton';
const DiagnosticTableRow = ({ data }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentDiagTestId(data.diagTestId));

    dispatch(setDiagnosticDrawer(true));
    dispatch(setDiagnosticDrawerPage('LIST'));
  };
  return (
    <TableRow hover>
      <TableCell size="small">{data.diagTestId}</TableCell>
      <TableCell size="small">{data.patientName}</TableCell>
      <TableCell size="small">{data.patientBirth}</TableCell>
      <TableCell size="small">
        {data.patientGender === 'male' ? '남자' : '여자'}
      </TableCell>
      <TableCell size="small">{data.createdDate}</TableCell>
      <TableCell size="small">{data.doctorRoom}</TableCell>
      <TableCell size="small">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ColorCircleContainer size={10} color={data.inspectionStatus} />
          {data.inspectionStatus === 'DIAGNOSTIC_PENDING' && (
            <StyledTypography
              variant="subtitle2"
              component="h5"
              weight={9}
              style={{ marginLeft: '0.75rem' }}
            >
              대기
            </StyledTypography>
          )}
          {data.inspectionStatus === 'DIAGNOSTIC_REGISTER' && (
            <StyledTypography
              variant="subtitle2"
              component="h5"
              weight={7}
              style={{ marginLeft: '0.75rem' }}
            >
              접수
            </StyledTypography>
          )}
          {data.inspectionStatus === 'DIAGNOSTIC_COMPLETED' && (
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
      <TableCell
        size="small"
        style={{
          minWidth: '100px',
        }}
      >
        <StyledButton bgColor="#004D80" color="white" onClick={handleClick}>
          검사 보기
        </StyledButton>
      </TableCell>
    </TableRow>
  );
};

export default DiagnosticTableRow;
