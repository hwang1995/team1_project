import React, { Fragment } from 'react';
import Postcode from 'react-daum-postcode';
import { makeStyles, Modal, Backdrop, IconButton } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import SpringFade from 'components/common/fade/SpringFade';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';

/**
 * 이 페이지 컴포넌트는 주소 데이터를 가져오기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * Sider
 * * Header
 * * 환자 관리 (PatientSearch, Table, ColoredButton)
 * @returns {JSX.Element}
 * @author SI HYUN PARK
 */
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    minHeight: '400px',
    minWidth: '400px',
    maxWidth: '920px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0,0,0,0.12)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AddressModal = ({ isModalOpened, setModalOpened,addressClick }) => {
  const classes = useStyles();
  const { breakpoint } = useWindowSize();

 
  // 주소데이터를 세팅하는 부분
  const handleComplete = (data) => {
    
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }

      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    const postalcode = data.zonecode;
    //주소데이터를 세팅해서 상위 컴포넌트에 주소데이터를 전달한다
    addressClick({ fullAddress, postalcode });
     
    setModalOpened(false);
  };

  const handleClose = () => setModalOpened(false);

  return (
    <Fragment>
      <Modal
        className={classes.modal}
        open={isModalOpened}
        onClose={() => handleClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <SpringFade in={isModalOpened}>
          <div
            className={classes.paper}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ResponsiveContainer breakpoint={breakpoint} style={{ flex: 1 }}>
              <DrawerHeader breakpoint={breakpoint}>
                <StyledTypography variant="h5" component="h5" weight={7}>
                  주소찾기
                </StyledTypography>
                <div>
                  <IconButton
                    onClick={() => setModalOpened(false)}
                  >
                    <AiOutlineClose size={24} />
                  </IconButton>
                </div>
              </DrawerHeader>
            </ResponsiveContainer>
            <Postcode onComplete={handleComplete} />
          </div>
        </SpringFade>
      </Modal>
    </Fragment>
  );
};

export default AddressModal;
