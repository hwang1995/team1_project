import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePage, chaneInputVal } from "redux/features/reservation/reservationSlice";
import StyledTypography from 'components/common/typography/StyledTypography';
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
  const { setPatientInfo } = props;
  const keyword = useSelector((state) => state.reservation.inputVal);
  const dispatch = useDispatch();
  const [searchResults, setResult] = useState([]);

  useEffect(() => {
    filterResult();
  }, [searchResults]);
  
  const closeClick = () => {
    dispatch(changePage('INFO'));
  }

  const patientClick = useCallback((patient) => {
    setPatientInfo(patient);
    closeClick();
    dispatch(chaneInputVal(""));
  });

  const filterResult = () => {
    const result = PatientData.filter(patient => patient.patient_name == keyword);
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
        {searchResults.length > 0 ? (
          searchResults.map((patient) => {
            return (
              <div key={patient.patient_id}>
                <Divider variant="inset" component="li" />
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
          })
        ) : (
          <div style={{ alignItems: 'center' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <img
                src="/assets/image/notFound.png"
                width="100%"
                alt="confirmPicture"
              />
            </div>
            <div
              style={{
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: '1em',
                }}
              >
                <h1>검색 결과가 없습니다 </h1>
              </div>
            </div>
          </div>
        )}
      </List>
    </div>
  );
}

export default ReservationPatientListContainer;
