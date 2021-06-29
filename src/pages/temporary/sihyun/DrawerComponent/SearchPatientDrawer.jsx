import {useEffect} from "react";
import {SearchList} from "../../../../components/common/ComponentItems";
import {SearchTypography} from "../../../../components/common/ComponentItems";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PatientData from "../json/patient.json";
import { CloseButton } from '../../../../components/common/ComponentItems';
import { GrClose } from 'react-icons/gr';
import { Fragment } from 'react';


function SearchPatientDrawer(props) {

  const { searchPatient, closeClick, setPatientInfo } = props;

  useEffect(()=>{
    console.log("keyword", searchPatient);
  })

  const patientClick = (patient) => {
    console.log(patient);
    setPatientInfo(patient);
    closeClick();
  }

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <CloseButton onClick={closeClick}>
          <GrClose fontSize="1em" />
        </CloseButton>
      </div>
      <SearchList>
        <Divider variant="inset" component="li" />
        {PatientData.map((patient) => (
          <div key={patient.patient_id}>
            <ListItem
              alignItems="flex-start"
              style={{ cursor: 'pointer' }}
              onClick={() => patientClick(patient)}
            >
              <ListItemAvatar>
                <Avatar
                  alt={patient.patient_name}
                  src="/static/Img/Karina.jpeg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={patient.patient_name + ' / ' + patient.patient_gender}
                secondary={
                  <Fragment>
                    <SearchTypography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {' ' + patient.patient_birth}
                    </SearchTypography>
                  </Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </SearchList>
    </div>
  );
}

export default SearchPatientDrawer;