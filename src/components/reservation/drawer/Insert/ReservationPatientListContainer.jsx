import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatientInfo } from 'apis/reservationAPI';
import { changePage, chaneInputVal } from "redux/features/reservation/reservationSlice";
import List from "@material-ui/core/List"
import PatientItem from "./Item/Item";
import ResertValue from "./Item/Result";
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { GrClose } from 'react-icons/gr';
import ClockSpinner from 'components/common/spinner/ClockSpinner';

/*
  SearchBox에서 키워드를 통해 검색한 결과를 나타내는 컴포넌트 이다.
  PatientItem을 통해 검색한 결과 리스트 (환자리스트)를 볼수 있다.
  ResertValue는 검색 결과가 없을 때 세팅한 컴포넌트이다.

  setPatientInfo -> 여기에 환자 데이터를 세팅할 수 있다.
*/
function ReservationPatientListContainer(props) {
  const { setPatientInfo} = props;

  /*
   리덕스에서 세팅된 검색 키워드 value를 가져온다.
  */
  const keyword = useSelector((state) => state.reservation.inputVal);
  const loginInfo = useSelector((state) => state.common.loginInfo);
  const dispatch = useDispatch();

  // 키원드를 통해 얻은 데이터를 담을 상태 데이터
  const [searchResults, setResult] = useState([]);

  // clockSpinner에 쓰일 boolean
  const [isLoading, setLoading] = useState(true);

  // 검색결과 데이터가 존재한다면, 1로 세팅 존재하지않는다면 2로 세팅하여 setLoading 값에 대한 변화를줌, 65번쨰줄 useEffect 참조
  const [page, setPage] = useState(0);


  /*
    keyword 값이 변경될 때 마다, keyword에 맞는 환자데이터를 가져온다
    갖고오는 부분이다.
  */
  useEffect(() => {
    
    setPage(0);
    const patientListData = async () => {
      try {
         const hospitalCode = loginInfo.hospitalCode;
        const patientName = keyword;
        const { data } = await getPatientInfo({
          hospitalCode,
          patientName
        });
        
        setResult(data.data);
        setPage(2);
      } catch (error) {
        setPage(1);
      }
    };
   try{
    patientListData();
   }catch(error) {
   }
  }, [keyword, loginInfo]); // 바뀌는 값 기준

/*
  page=2 일때는 환자데이터가 존재, page = 0 일때는 환자데이터 가져오기시작, page=1 때는 환자데이터가 존재하지 않음
  0일때는 spinner를 실행하기위해서, 그 외에는 spinner를 멈추기 위해서 세팅을 함
*/
  useEffect(() => {
    if(page>0){
      setLoading(false);
    }else {
      setLoading(true);
    }
  }, [page])






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
      console.log("click", patient);
      setPatientInfo(patient);
      closeClick();
      dispatch(chaneInputVal(''));
    },
    [dispatch, closeClick, setPatientInfo],
  );

// clockspinner 컴포넌트
 const clockSpinner = () => {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ClockSpinner isLoading={isLoading} />
      </div>
    );
  };

// 환자결과 값을 리스트로 나타내는 컴포넌트
  const listContent = () => {
    return (
      <div>
    
      <DrawerHeader onClick={closeClick}>
        <div style={{ cursor: 'pointer', marginTop: '1em' }}>
          <GrClose fontSize="1em" />
        </div>
      </DrawerHeader>
     
      <List>
        { (page> 1 )  && 
          searchResults.map((patient) => {
            return (
              <PatientItem
                key={patient.patientId}
                patient={patient}
                patientClick={patientClick}
              />
            );
          })
        
        }
        {(page === 1 )&& 
           <ResertValue />
        
        }
      </List>
      
    
    </div>
    )
  }

  return (
    <div>
      {isLoading && clockSpinner()}
      {!isLoading && listContent()};
    </div>
  );
}

export default ReservationPatientListContainer;
