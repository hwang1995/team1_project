import { useState, useEffect} from 'react';
import {BodyDiv} from "./ComponentItems";
import  {CloseButton} from "./ComponentItems";
import  {SearchDrawer} from "./ComponentItems";
import ReservationDrawer from './ReservationDrawer';
import SearchPatientDrawer from './SearchPatientDrawer';
import { Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer';
import InlineDiv from '../DivComponent/InlineDiv';
import InputComponent from '../InputComponent';
import InformationButton from '../InformationButton';
import RgbColor from '../util/rgb';
import { IconContext } from 'react-icons';
import HeadDrawer from './HeadDrawer';
import { GrClose } from 'react-icons/gr';
import { AiOutlineSearch } from 'react-icons/ai';

function MainDrawer(props) {
  const [searchPatient, setSearchPatient] = useState('');
  const [changeView, setChange] = useState(false);
  const [patientInfo, setPatient] = useState({
    patient_id: '',
    patient_name: '',
    patient_gender: '',
    patient_birth: '',
  });
  const {reservationTime, doctorInfo}= props;

  useEffect(() => {
    setPatient({
      ...patientInfo,
      patient_id: '',
      patient_name: '',
      patient_gender: '',
      patient_birth: '',
    });
  },[props.isClosed]);

  const searchHandleChange = (event) => {
    setSearchPatient(event.target.value);
  }  

  const searchOnClick = (event) => {
    if(searchPatient === ""){
      console.log("값 너어라");
      setChange(false);
    }else{
    setChange(true);
    }
  }

  const closeClick = () => {
    setChange(false);
  }

  const setPatientInfo = (patient) => {
    setPatient({
      ...patientInfo,
      patient_id: patient.patient_id,
      patient_name: patient.patient_name,
      patient_gender: patient.patient_gender,
      patient_birth: patient.patient_birth,
    });
  }

  
  return (
    <Fragment>
      <Drawer anchor="right" open={props.isOpened}>
        <BodyDiv>
          <HeadDrawer style={{ width: 400 }}>
            <h1>진료접수</h1>
            <CloseButton onClick={props.isClosed}>
              <GrClose fontSize="1.7em" />
            </CloseButton>
          </HeadDrawer>
          <SearchDrawer>
            <InlineDiv bordervalue="true">
              <IconContext.Provider
                value={{ style: { verticalAlign: 'middle' } }}
              >
                <AiOutlineSearch size="1.4em" />
              </IconContext.Provider>
              <InputComponent
                name="patientSearch"
                onChange={searchHandleChange}
                bordervalue="false"
                disableUnderline
                placeholder="환자명을 입력해주세요"
              />
            </InlineDiv>
            <InformationButton
              name={RgbColor.color_login}
              widthvalue="100px"
              heightvalue="3em"
              onClick={searchOnClick}
            >
              검색
            </InformationButton>
          </SearchDrawer>
          {changeView === false ? (
            <ReservationDrawer
              reservationTime={reservationTime}
              doctorInfo={doctorInfo}
              patientInfo={patientInfo}
            />
          ) : (
            <SearchPatientDrawer
              closeClick={closeClick}
              searchPatient={searchPatient}
              setPatientInfo={setPatientInfo}
            />
          )}
        </BodyDiv>
      </Drawer>
    </Fragment>
  );
}

export default MainDrawer;
