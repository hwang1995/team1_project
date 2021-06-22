import { useEffect, useCallback, useState } from 'react';
import StyledTypography from 'components/common/typography/StyledTypography';
import ErrorPage from "../../../pages/ErrorPage";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import List from "@material-ui/core/List"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PatientData from '../../../pages/temporary/sihyun/json/patient.json';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { GrClose } from 'react-icons/gr';
import { Fragment } from 'react';

function ReservationPatientListContainer(props) {
  const { searchVal, closeClick, setPatientInfo, setSearchVal } = props;
  const [searchResults, setResult] = useState([]);

  useEffect(() => {
    //console.log('keyword', searchVal);
    filterResult();
    //console.log('ddd', searchResults);
  }, [searchVal]);

  const patientClick = useCallback((patient) => {
    console.log(patient);
    setPatientInfo(patient);
    console.log(searchVal);
    closeClick();
  });

  const filterResult = () => {
    const result = PatientData.filter(patient => patient.patient_name == searchVal);
    setResult(result);
    
  }



  return (
    <div>
      <DrawerHeader onClick={closeClick}>
        <div style={{ cursor: 'pointer', marginTop: '1em' }}>
          <GrClose fontSize="1em" />
        </div>
      </DrawerHeader>

      <List>
        <Divider variant="inset" component="li" />
          {searchResults.map((patient) => {
              return (
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
                      primary={
                        patient.patient_name + ' / ' + patient.patient_gender
                      }
                      secondary={
                        <Fragment>
                          <StyledTypography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {' ' + patient.patient_birth}
                          </StyledTypography>
                        </Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              );
               
            })}
      </List>
    </div>
  );
}

export default ReservationPatientListContainer;
