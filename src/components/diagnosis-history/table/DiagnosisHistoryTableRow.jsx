import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import StyledButton from 'components/common/button/StyledButton';
import {
  setDrawerStatus,
  setPatientId,
} from 'redux/features/history/diagnosisHistorySlice';

/**
 * * 진료 기록의 정보를 보여주기 위한 테이블 행 컴포넌트 (Template)
 * @param {object} data
 * @returns {JSX.Element} view
 * @author SUNG WOOK HWANG
 */
const DiagnosisHistoryTableRow = ({ data }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const { patientId } = data;
    dispatch(setPatientId(patientId));

    // 환자의 정보를 세팅 후 DiagnosisHistory Drawer를 연다.
    dispatch(
      setDrawerStatus({
        name: 'diagnosisHistory',
        status: true,
      }),
    );
  };

  return (
    <TableRow hover>
      <TableCell size="small">{data.patientId}</TableCell>
      <TableCell
        size="small"
        style={{
          fontWeight: 700,
        }}
      >
        {data.patientName}
      </TableCell>
      <TableCell size="small">{data.patientBirth}</TableCell>
      <TableCell size="small">
        {data.patientGender === 'male' ? '남자' : '여자'}
      </TableCell>
      <TableCell size="small">{data.patientTel}</TableCell>
      <TableCell size="small">
        {data.patientAddr1} {data.patientAddr2} {data.patientPostal}
      </TableCell>
      <TableCell size="small" onClick={handleClick}>
        <StyledButton bgColor="#004D80" color="white">
          상세 보기
        </StyledButton>
      </TableCell>
    </TableRow>
  );
};

export default React.memo(DiagnosisHistoryTableRow);
