import React, { Fragment,useState} from 'react';
import moment from 'moment';
import StyledTypography from 'components/common/typography/StyledTypography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const PatientInfoListItem = ({ searchResults, setReadPatient, setReadOpened, pageResult }) => {

  const handlePatientClick = (patient) => {
    setReadPatient(patient);
    setReadOpened(true);
  };
  return (
    <List>
      {searchResults.length > 0 ? (
        searchResults.map((reservation) => {
          return (
            <div key={reservation.id}>
              <Divider variant="inset" component="li" />
              <ListItem
                alignItems="flex-start"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePatientClick(reservation)}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={reservation.title}
                    src="/static/Img/Karina.jpeg"
                  />
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
        })
      ) : pageResult === false ? (
        <div style={{ alignItems: 'center' }}>
          <div style={{ width: '80%' }}>
            <img
              src="/assets/image/pleaseSearching.png"
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
              <h1>검색어를 입력해주세요 </h1>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ alignItems: 'center' }}>
          <div style={{ width: '100%', textAlign:"center" }}>
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
  );
};

export default PatientInfoListItem;
