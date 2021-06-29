import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePage, chaneInputVal } from "redux/features/reservation/reservationSlice";
import List from "@material-ui/core/List"
import PatientItem from "./Item/Item";
import ResertValue from "./Item/Result";
import PatientData from '../../../../pages/temporary/sihyun/json/patient.json';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { GrClose } from 'react-icons/gr';

/*
  SearchBox에서 키워드를 통해 검색한 결과를 나타내는 컴포넌트 이다.
  PatientItem을 통해 검색한 결과 리스트 (환자리스트)를 볼수 있다.
  ResertValue는 검색 결과가 없을 때 세팅한 컴포넌트이다.

  setPatientInfo -> 여기에 환자 데이터를 세팅할 수 있다.
*/
function ReservationPatientListContainer(props) {
  const { setPatientInfo } = props;

  /*
   리덕스에서 세팅된 검색 키워드 value를 가져온다.
  */
  const keyword = useSelector((state) => state.reservation.inputVal);
  const dispatch = useDispatch();

  /*
    filter를 통해 keyword 와 같은 환자 데이터들을 세팅할 상태 데이터이다.
  */
  const [searchResults, setResult] = useState([]);

  /*
    keyword 값이 변경될 때 마다, filter를 통해 검색어에 맞는 환자데이터를 
    갖고오는 부분이다.
  */
  useEffect(() => {
    const result = PatientData.filter((patient) => {
      if (patient.patient_name === keyword) {
        return true;
      }
      return false;
    });
    setResult(result);
  }, [keyword]); // 바뀌는 값 기준

  /*
    ReservationDrawer에서의 
    컴포넌트 변경 부분이다. 완료버튼을 누르면 다시 한번 확인하는 화면이 나타난다
  */
  const closeClick = useCallback(() => {
    dispatch(changePage('INFO'));
  }, [dispatch]);

  /*
    PatientItem에 props로 보내는 클릭 이벤트 함수이다.
    PatientItem에서 가져온 patient 데이터를 ReservationDrawer를 통해 가져온 props의
    setPatientInfo에 세팅한다.
  */
  const patientClick = useCallback(
    (patient) => {
      setPatientInfo(patient);
      closeClick();
      dispatch(chaneInputVal(''));
    },
    [dispatch, closeClick, setPatientInfo],
  );

  return (
    <div>
      <DrawerHeader onClick={closeClick}>
        <div style={{ cursor: 'pointer', marginTop: '1em' }}>
          <GrClose fontSize="1em" />
        </div>
      </DrawerHeader>

      <List>
        {searchResults.length > 0 ? (
          searchResults.map((patient) => {
            return (
              <PatientItem
                key={patient.patient_id}
                patient={patient}
                patientClick={patientClick}
              />
            );
          })
        ) : (
          <ResertValue />
        )}
      </List>
    </div>
  );
}

export default ReservationPatientListContainer;
