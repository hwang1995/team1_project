import { useState , useEffect} from 'react';
import { InfoDrawer } from '../../../../components/common/ComponentItems';
import { FooterDrawer } from '../../../../components/common/ComponentItems';
import InputComponent from '../InputComponent';
import InformationButton from '../InformationButton';
import RgbColor from '../util/rgb';

function ReservationDrawer(props) {
  const [addReason, setReson] = useState('');
  const { reservationTime, doctorInfo, patientInfo } = props;

  // useEffect(() => {
  //   console.log('실행');
  //   console.log('reservation', patientInfo);
  // });

  const resonHandleChange = (event) => {
    setReson(event.target.value);
  };

  

  return (
    <div>
      <InfoDrawer>
        <h3>이름</h3>
        <div>
          <InputComponent
            readOnly
            bordervalue="true"
            widthvalue="15em"
            disableUnderline
            paddingvalue="true"
            value={patientInfo.patient_name !== '' ? patientInfo.patient_name : ""}
          />
        </div>
      </InfoDrawer>
      <InfoDrawer>
        <h3>생년월일</h3>
        <div>
          <InputComponent
            readOnly
            name="patientBirth"
            bordervalue="true"
            widthvalue="15em"
            disableUnderline
            paddingvalue="true"
            value={
              patientInfo.patient_birth !== '' ? patientInfo.patient_birth : ""
            }
          />
        </div>
      </InfoDrawer>
      <InfoDrawer>
        <h3>예약날짜</h3>
        <div>
          <InputComponent
            readOnly
            bordervalue="true"
            widthvalue="15em"
            disableUnderline
            paddingvalue="true"
            value={reservationTime.date}
          />
        </div>
      </InfoDrawer>
      <InfoDrawer>
        <h3>예약시작시간</h3>
        <div>
          <InputComponent
            readOnly
            bordervalue="true"
            widthvalue="15em"
            disableUnderline
            paddingvalue="true"
            value={reservationTime.startTime}
          />
        </div>
      </InfoDrawer>
      <InfoDrawer>
        <h3>예약종료시간</h3>
        <div>
          <InputComponent
            readOnly
            bordervalue="true"
            widthvalue="15em"
            disableUnderline
            paddingvalue="true"
            value={reservationTime.endTime}
          />
        </div>
      </InfoDrawer>

      <InfoDrawer>
        <h3>진료실</h3>
        <div>
          <InputComponent
            readOnly
            name="drRoom"
            bordervalue="true"
            widthvalue="15em"
            disableUnderline
            paddingvalue="true"
            value={doctorInfo.doctor_room}
          />
        </div>
      </InfoDrawer>
      <InfoDrawer>
        <h3>의사</h3>
        <div>
          <InputComponent
            readOnly
            name="doctor"
            bordervalue="true"
            widthvalue="15em"
            disableUnderline
            paddingvalue="true"
            value={doctorInfo.member_name}
          />
        </div>
      </InfoDrawer>
      <InfoDrawer>
        <h3>내원사유</h3>
        <div>
          <InputComponent
            onChange={resonHandleChange}
            bordervalue="true"
            widthvalue="15em"
            disableUnderline
            paddingvalue="true"
          />
        </div>
      </InfoDrawer>
      <FooterDrawer>
        <InformationButton
          name={RgbColor.color_reservation}
          widthvalue="80%"
          heightvalue="3em"
        >
          진료예약
        </InformationButton>
      </FooterDrawer>
    </div>
  );
}

export default ReservationDrawer;
