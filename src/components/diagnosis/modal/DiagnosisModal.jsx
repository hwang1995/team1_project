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
import { registDiagnosisInfo } from 'apis/diagnosisAPI';
import { useSnackbar } from 'notistack';
import { sendMqttMessage } from 'apis/pushAPI';
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

/**
 * * 진료를 실시하고 결과를 추가하기 전에 띄우는 모달이며, 여기에서 진행 버튼을 클릭한다면 서버에 결과를 넘어가게 하는 것이 목표
 * @returns {JSX.Element} View
 * @author SUNG WOOK HWANG
 */
const DiagnosisModal = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { breakpoint } = useWindowSize();

  // Redux 정보 가져오기
  const isOpened = useSelector((state) => state.diagnosis.modalStatus);
  const loginInfo = useSelector((state) => state.common.loginInfo);
  const activeStep = useSelector((state) => state.diagnosis.activeStep);
  const diagnosisInfo = useSelector((state) => state.diagnosis.diagnosisInfo);
  const medicineInfo = useSelector((state) => state.diagnosis.medicineInfo);
  const injectorInfo = useSelector((state) => state.diagnosis.injectorInfo);
  const diagnosticInfo = useSelector((state) => state.diagnosis.diagnosticInfo);
  const vitalInfo = useSelector(
    (state) => state.diagnosis.diagnosisInfo.vitalInfo,
  );
  const { patientName } = useSelector((state) => state.diagnosis.patient);

  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  const handleNextStep = async () => {
    try {
      const { hospitalCode } = loginInfo;
      const diagnostics = diagnosticInfo.map(
        ({ diagInspectionId }) => diagInspectionId,
      );

      const medicines = medicineInfo.map(
        ({ medicineId, count, medicineType }) => ({
          medicineId,
          medicineDose: count,
          medicineType,
        }),
      );

      const injectors = injectorInfo.map(
        ({ medicineId, count, medicineType }) => ({
          medicineId,
          medicineDose: count,
          medicineType,
        }),
      );

      const { diagId, memberId, patientId, drOpinion } = diagnosisInfo;
      const vital = !vitalInfo ? {} : vitalInfo;
      const sendInfo = {
        diagId,
        memberId,
        patientId,
        drOpinion,
        hospitalCode,
        medicines,
        injectors,
        diagnostics,
        vital,
      };
      await registDiagnosisInfo(sendInfo);

      if (diagnostics.length > 0) {
        // push 메시지를 날려준다.
        const sendMessageInfo = {
          topic: `/${hospitalCode}/inspector`,
          priority: 'success',
          message: `${patientName}님이 진단 검사를 요청하셨습니다.`,
        };
        await sendMqttMessage(sendMessageInfo);
      }
      handleAlert('success', '등록에 성공하였습니다.');
      dispatch(setActiveStep(activeStep + 1));
      dispatch(setDiagnosisModal(false));
    } catch (error) {
      const { message } = error.response.data;
      handleAlert('error', message);
    }
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
                    {diagnosisInfo.drOpinion}
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
                <Grid item xs={3}>
                  <StyledTypography
                    variant="subtitle1"
                    component="h5"
                    weight={7}
                  >
                    바이탈 체크 여부
                  </StyledTypography>
                </Grid>
                <Grid item xs={9}>
                  <StyledTypography
                    variant="subtitle1"
                    component="h5"
                    weight={3}
                  >
                    {vitalInfo ? 'O' : 'X'}
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
