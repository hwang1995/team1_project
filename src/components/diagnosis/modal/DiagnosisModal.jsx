import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDiagnosisModal,
  setActiveStep,
} from 'redux/features/diagnosis/diagnosisSlice';
import {
  makeStyles,
  Modal,
  Backdrop,
  IconButton,
  Grid,
} from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import SpringFade from 'components/common/fade/SpringFade';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import StyledButton from 'components/common/button/StyledButton';

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

const DiagnosisModal = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { breakpoint } = useWindowSize();

  // Redux 정보 가져오기
  const isOpened = useSelector((state) => state.diagnosis.modalStatus);
  const activeStep = useSelector((state) => state.diagnosis.activeStep);
  const diagnosisInfo = useSelector((state) => state.diagnosis.diagnosisInfo);
  const medicineInfo = useSelector((state) => state.diagnosis.medicineInfo);
  const injectorInfo = useSelector((state) => state.diagnosis.injectorInfo);
  const diagnosticInfo = useSelector((state) => state.diagnosis.diagnosticInfo);

  const handleNextStep = () => {
    dispatch(setActiveStep(activeStep + 1));
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
                  진료의 내용이 아래와 같습니까?
                </StyledTypography>
                <div>
                  <IconButton
                    onClick={() => dispatch(setDiagnosisModal(false))}
                  >
                    <AiOutlineClose size={24} />
                  </IconButton>
                </div>
              </DrawerHeader>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <StyledTypography
                    variant="subtitle1"
                    component="h5"
                    weight={7}
                  >
                    의사소견
                  </StyledTypography>
                </Grid>
                <Grid item xs={9}>
                  <StyledTypography
                    variant="subtitle1"
                    component="h5"
                    weight={3}
                  >
                    {diagnosisInfo.dr_opinion}
                  </StyledTypography>
                </Grid>
                <Grid item xs={3}>
                  <StyledTypography
                    variant="subtitle1"
                    component="h5"
                    weight={7}
                  >
                    약 처방 여부
                  </StyledTypography>
                </Grid>
                <Grid item xs={9}>
                  <StyledTypography
                    variant="subtitle1"
                    component="h5"
                    weight={3}
                  >
                    {medicineInfo.length > 0 ? 'O' : 'X'}
                  </StyledTypography>
                </Grid>
                <Grid item xs={3}>
                  <StyledTypography
                    variant="subtitle1"
                    component="h5"
                    weight={7}
                  >
                    주사 처방 여부
                  </StyledTypography>
                </Grid>
                <Grid item xs={9}>
                  <StyledTypography
                    variant="subtitle1"
                    component="h5"
                    weight={3}
                  >
                    {injectorInfo.length > 0 ? 'O' : 'X'}
                  </StyledTypography>
                </Grid>
                <Grid item xs={3}>
                  <StyledTypography
                    variant="subtitle1"
                    component="h5"
                    weight={7}
                  >
                    진단 검사 여부
                  </StyledTypography>
                </Grid>
                <Grid item xs={9}>
                  <StyledTypography
                    variant="subtitle1"
                    component="h5"
                    weight={3}
                  >
                    {diagnosticInfo.length > 0 ? 'O' : 'X'}
                  </StyledTypography>
                </Grid>
              </Grid>
            </ResponsiveContainer>
            <div>
              <StyledButton onClick={handleNextStep} bgColor="#FEFEFE">
                진료 등록 하기
              </StyledButton>
            </div>
          </div>
        </SpringFade>
      </Modal>
    </Fragment>
  );
};

export default DiagnosisModal;
