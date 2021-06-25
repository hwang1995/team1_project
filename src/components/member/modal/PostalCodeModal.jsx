import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setModalStatus,
  setAddressInfo,
} from 'redux/features/member/memberSlice';
import { makeStyles, Modal, Backdrop, IconButton } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import SpringFade from 'components/common/fade/SpringFade';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DaumPostcode from 'react-daum-postcode';
// import StyledButton from 'components/common/button/StyledButton';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
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

const PostalCodeModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { breakpoint } = useWindowSize();

  const isModalOpened = useSelector((state) => state.member.modalStatus);

  const handleClose = () => dispatch(setModalStatus(false));

  const handleComplete = (data) => {
    const { address, addressType, bname, buildingName, zonecode } = data;
    let fullAddress = address;
    let extraAddress = '';

    if (addressType === 'R') {
      if (bname !== '') {
        extraAddress += bname;
      }

      if (buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${buildingName}` : buildingName;
      }

      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    dispatch(
      setAddressInfo({
        member_postal: zonecode,
        member_addr1: fullAddress,
      }),
    );
    dispatch(setModalStatus(!isModalOpened));
  };
  return (
    <Fragment>
      <Modal
        className={classes.modal}
        open={isModalOpened}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          justifyContent: 'center',
        }}
      >
        <SpringFade in={isModalOpened}>
          <div
            className={classes.paper}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <ResponsiveContainer breakpoint={breakpoint} style={{ flex: 1 }}>
              <DrawerHeader breakpoint={breakpoint}>
                <StyledTypography variant="h5" component="h5" weight={7}>
                  도로명 주소 찾기
                </StyledTypography>
                <div>
                  <IconButton>
                    <AiOutlineClose
                      size={24}
                      onClick={() => dispatch(setModalStatus(false))}
                    />
                  </IconButton>
                </div>
              </DrawerHeader>

              <DaumPostcode onComplete={handleComplete} />
            </ResponsiveContainer>
          </div>
        </SpringFade>
      </Modal>
    </Fragment>
  );
};

export default PostalCodeModal;
