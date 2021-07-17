import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import { useSnackbar } from 'notistack';
import { setPatient } from 'redux/features/diagnosis/diagnosisSlice';
import { getDiagnosisList } from 'apis/diagnosisAPI';
import HashSpinner from 'components/common/spinner/HashSpinner';
import StyledTypography from 'components/common/typography/StyledTypography';

const columns = [
  { field: 'diagId', headerName: '순번', width: 120, type: 'number' },
  { field: 'patientName', headerName: '환자 이름', width: 150 },
  { field: 'patientBirth', headerName: '생년월일', width: 150 },
  { field: 'patientGender', headerName: '성별', width: 120 },
  { field: 'startDate', headerName: '예약 시간', width: 200 },
  { field: 'visitPurpose', headerName: '내원 사유', width: 700 },
];
const DataTable = () => {
  const [isLoading, setLoading] = useState(true);
  const authInfo = useSelector((state) => state.common.loginInfo);
  const [diagnosisList, setDiagnosisList] = useState([]);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };
  useEffect(() => {
    async function getDiagnosis() {
      try {
        const result = await getDiagnosisList(authInfo);

        const newResult = result.map((data, index) => ({ id: index, ...data }));
        setDiagnosisList(newResult);
        console.log(result);
        setLoading(false);
      } catch (error) {
        const { message } = error.response.data;
        handleAlert('error', message);
        setLoading(false);
      }
    }
    setTimeout(() => {
      getDiagnosis();
    }, 1000);
  }, []);

  const handleClick = (event) => {
    const { row } = event;
    // console.log('dataTable', event.row);
    dispatch(setPatient(row));
  };
  return (
    <Fragment>
      {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '80vh',
          }}
        >
          <HashSpinner />
        </div>
      )}
      {!isLoading && diagnosisList.length > 0 && (
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={diagnosisList}
            columns={columns}
            pageSize={5}
            onCellClick={handleClick}
          />
        </div>
      )}

      {!isLoading && diagnosisList.length === 0 && (
        <div
          style={{
            height: '80vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <img src="/assets/image/404/3.png" alt="not found" width="100%" />
          </div>
          <StyledTypography
            variant="h4"
            component="h5"
            weight={7}
            style={{
              marginTop: '1rem',
            }}
          >
            검색 시점에 해당 병원의 진료 목록이 존재하지 않습니다.
          </StyledTypography>
        </div>
      )}
    </Fragment>
  );
};

export default DataTable;
