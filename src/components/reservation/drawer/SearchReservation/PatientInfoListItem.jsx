import React, { Fragment} from 'react';
import moment from 'moment';
import StyledTypography from 'components/common/typography/StyledTypography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

/*
  검색 결과를 리스트로 보여주는 컴포넌트 이다.
  1) searchResults에는 키워드로 검색된 결과에 대한 환자 데이터 정보가 들어있다
  2) setReadPatient는 여기에서 나온 리스트 아이템 (환자 데이터)를 세팅할 수 있는 상태 함수 이다.
  3) pageResult는 검색결과에 따라 검색 해주세요 or 검색결과가 없다는 표시를 해준다
*/
const PatientInfoListItem = ({ searchResults, setReadPatient, setReadOpened, pageResult }) => {

  /*
    리스트 아이템을 클릭 했을 때, paient를 받아
    setReadPatient에 patient를 세팅해준다.
    setReadOpened에 true를 세팅 해주어
    ReservationInfoListContainer 컴포넌트로 변경되도록 한다.
  */
  const handlePatientClick = (patient) => {
    setReadPatient(patient);
    setReadOpened(true);
  };



  // 검색된 결과에 대한 아이템 이다. (환자 데이터)
  const resultItem = (reservation) => {
      return (
        <div key={reservation.id}>
          <Divider variant="inset" component="li" />
          <ListItem
            alignItems="flex-start"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePatientClick(reservation)}
          >
            <ListItemAvatar>
              <Avatar alt={reservation.title} src="" />
            </ListItemAvatar>
            <ListItemText
              primary={
                reservation.title +
                ' / ' +
                reservation.doctorRoom +
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
                    {' ' +
                      reservation.patientBirth[0] +
                      '-' +
                      reservation.patientBirth[1] +
                      '-' +
                      reservation.patientBirth[2]}
                  </StyledTypography>
                </Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      );
    }
  /// 검색어를 입력해주세요
  const resultSearch = () => {
    return (
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
    )
  }

  // 검색 결과가  없습니다.
  const resultNot = () => {
    return (
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
    )
  }
  return (
    <List>
      {searchResults.length > 0 &&
        searchResults.map((reservation) => 
          resultItem(reservation)
        )}
      {searchResults.length === 0 &&
        (pageResult === false ? (
        resultSearch()
        ) : (
          resultNot()
        ))}
    </List>
  );
};

export default PatientInfoListItem;
