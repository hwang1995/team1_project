import React, { Fragment,useState} from 'react';
import moment from 'moment';
import StyledTypography from 'components/common/typography/StyledTypography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const PatientInfoListItem = ({ searchResults, setReadPatient, setReadOpened }) => {

  const handlePatientClick = (patient) => {
    setReadPatient(patient);
    setReadOpened(true);
  };
  return (
    <List>
      {searchResults.map((reservation) => {
        return (
          <div key={reservation.id}>
            <Divider variant="inset" component="li" />
            <ListItem
              alignItems="flex-start"
              style={{ cursor: 'pointer' }}
              onClick={() => handlePatientClick(reservation)}
            >
              <ListItemAvatar>
                <Avatar alt={reservation.title} src="/static/Img/Karina.jpeg" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  reservation.title +
                  ' / ' +
                  reservation.drRoom +
                  ' ( ' +
                  moment(reservation.start).format('LT') +
                  ' ~ ' +
                  moment(reservation.end).format('LT') +
                  ' )'
                }
                secondary={
                  <Fragment>
                    <StyledTypography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {' ' + reservation.birth}
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
  );
};

export default PatientInfoListItem;
