import React from 'react';
import Rows from '../diagnosis';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'diag_id', headerName: '순번', width: 120, type: 'number' },
  { field: 'patient_name', headerName: '환자 이름', width: 150 },
  { field: 'patient_birth', headerName: '생년월일', width: 150 },
  { field: 'patient_gender', headerName: '성별', width: 120 },
  { field: 'start_date', headerName: '예약 시간', width: 150 },
  { field: 'visit_purpose', headerName: '내원 사유', width: 400 },
];

const DataTable = ({ setPatient }) => {
  const handleClick = (event) => {
    setPatient(event.row);
  };
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={Rows}
        columns={columns}
        pageSize={5}
        onCellClick={handleClick}
      ></DataGrid>
    </div>
  );
};

export default DataTable;
