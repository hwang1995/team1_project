import React, {Fragment} from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import StyledTypography from 'components/common/typography/StyledTypography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

/*
  환자 검색 결과에 대한 환자 데이터 리스트 안의 ListItem에 환자 데이터를 세팅하는 부분이다.
*/
const Item = ({ patient, patientClick }) => {
  return (
    <div>
      <Divider variant="inset" component="li" />
      <ListItem
        alignItems="flex-start"
        style={{ cursor: 'pointer' }}
        onClick={() => patientClick(patient)}
      >
        <ListItemAvatar>
          <Avatar alt={patient.patientName} src="/assets/image/patient.png" />
        </ListItemAvatar>
        <ListItemText
          primary={patient.patientName + ' / ' + patient.patientGender}
          secondary={
            <Fragment>
              <StyledTypography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {' ' + patient.patientBirth}
              </StyledTypography>
            </Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default React.memo(Item);
