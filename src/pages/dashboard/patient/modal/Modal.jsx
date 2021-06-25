import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Postcode from "react-daum-postcode";
import {
  setDiagnosisModal,
} from 'redux/features/diagnosis/diagnosisSlice';
import {
  makeStyles,
  Modal,
  Backdrop,
  IconButton,
} from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import SpringFade from 'components/common/fade/SpringFade';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';

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

const AddressModal = ({ setAddress }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { breakpoint } = useWindowSize();

  // Redux 정보 가져오기
  const isOpened = useSelector((state) => state.diagnosis.modalStatus);

  const handleComplete = (data) => {
    setAddress(data);
    dispatch(setDiagnosisModal(false));
  };

  const handleClose = () => dispatch(setDiagnosisModal(false));

  return (
    <Fragment>
      <Modal
        className={classes.modal}
        open={isOpened}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <SpringFade in={isOpened}>
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
                  <IconButton>
                    <AiOutlineClose
                      size={24}
                      onClick={() => dispatch(setDiagnosisModal(false))}
                    />
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
