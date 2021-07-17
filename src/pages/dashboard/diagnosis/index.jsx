import React, { useEffect, Fragment } from 'react';
import {
  Divider,
  Grid,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from '@material-ui/core';
import { GiMedicines, GiLoveInjection } from 'react-icons/gi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaDiagnoses } from 'react-icons/fa';
import { RiChatHistoryFill } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
  setMedicineDrawer,
  setInjectorDrawer,
  setDiagnosticDrawer,
  setDiagnosisHistoryDrawer,
  setDiagnosisModal,
  setActiveStep,
  resetDiagnosisInfos,
} from 'redux/features/diagnosis/diagnosisSlice';
import StyledButton from 'components/common/button/StyledButton';

import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';
import DataTable from 'components/diagnosis/table/DataTable';
import DiagnosisDataPage from 'components/diagnosis/container/DiagnosisDataInput';
import MedicineDrawer from 'components/diagnosis/drawer/MedicineDrawer';
import InjectorDrawer from 'components/diagnosis/drawer/InjectorDrawer';
import StyledTypography from 'components/common/typography/StyledTypography';
import DiagnosticDrawer from 'components/diagnosis/drawer/DiagnosticDrawer';
import DiagnosisHistoryDrawer from 'components/diagnosis/drawer/DiagnosisHistoryDrawer';
import DiagnosisModal from 'components/diagnosis/modal/DiagnosisModal';
import PageTransition from 'components/common/transition/PageTransition';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';

const getSteps = () => [
  '진료할 환자를 선택해주세요.',
  '진료를 진행합니다.',
  '진료 완료',
];

const DiagnosisPage = () => {
  // 페이지 상태를 가져오기 위한 함수
  const steps = getSteps();

  const dispatch = useDispatch();

  // Redux store에 저장된 환자 정보
  const patientInfo = useSelector((state) => state.diagnosis.patient);

  // Redux store에 저장된 진료 정보
  const diagnosisInfo = useSelector((state) => state.diagnosis.diagnosisInfo);
  const activeStep = useSelector((state) => state.diagnosis.activeStep);
  const { enqueueSnackbar } = useSnackbar();

  // Alert를 띄우기 위한 함수
  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  // 다음 버튼을 눌렀을 시에 반응하는 이벤트 함수
  const handleNext = () => {
    if (patientInfo.patientId === 0) {
      handleAlert('error', '환자를 선택해주세요.');
      // alert('환자를 선택해주세요.');
      return;
    } else if (activeStep === 1 && diagnosisInfo.drOpinion === '') {
      handleAlert('error', '의사 의견을 입력해주세요.');
      // alert('의사 의견을 입력해주세요.');
      return;
    } else if (activeStep === 1 && diagnosisInfo.drOpinion !== '') {
      dispatch(setDiagnosisModal(true));
      return;
    }

    if (activeStep === 2) {
      dispatch(setActiveStep(0));
      return;
    }
    dispatch(setActiveStep(activeStep + 1));
  };

  const handleBack = () => {
    if (activeStep < 1) {
      return;
    }
    dispatch(setActiveStep(activeStep - 1));
  };

  useEffect(() => {
    return () => {
      dispatch(setActiveStep(0));
      dispatch(resetDiagnosisInfos());
    };
  }, []);
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <DataTable />;
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <DiagnosisDataPage />
            <Grid container spacing={2}>
              <Grid item xs={5} sm={3} md={2}>
                <StyledButton
                  size="medium"
                  bgColor="#003049"
                  onClick={() => dispatch(setMedicineDrawer(true))}
                >
                  <GiMedicines size={28} color="white" />
                  <span style={{ marginLeft: '0.5rem', color: 'white' }}>
                    약 처방하기
                  </span>
                </StyledButton>
              </Grid>
              <Grid item xs={5} sm={3} md={2}>
                <StyledButton
                  size="medium"
                  bgColor="#FCBF49"
                  onClick={() => dispatch(setInjectorDrawer(true))}
                >
                  <GiLoveInjection size={28} />
                  <span style={{ marginLeft: '0.5rem' }}>주사 처방하기</span>
                </StyledButton>
              </Grid>
              <Grid item xs={5} sm={3} md={2}>
                <StyledButton
                  size="medium"
                  bgColor="#003049"
                  onClick={() => dispatch(setDiagnosticDrawer(true))}
                >
                  <FaDiagnoses size={28} color="white" />
                  <span style={{ marginLeft: '0.5rem', color: 'white' }}>
                    진단 검사 추가하기
                  </span>
                </StyledButton>
              </Grid>
              <Grid item xs={5} sm={3} md={2}>
                <StyledButton
                  size="medium"
                  bgColor="#003049"
                  onClick={() => dispatch(setDiagnosisHistoryDrawer(true))}
                >
                  <RiChatHistoryFill size={28} color="white" />
                  <span style={{ marginLeft: '0.5rem', color: 'white' }}>
                    진료 기록 보기
                  </span>
                </StyledButton>
              </Grid>
            </Grid>
          </div>
        );
      case 2:
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: '90%',
            }}
          >
            <img
              src="/assets/image/success-icon-10.png"
              width="10%"
              alt="success"
              style={{
                marginBottom: '2rem',
              }}
            />
            <StyledTypography variant="h4" component="h4" weight={9}>
              진료가 완료되었습니다.
            </StyledTypography>
          </div>
        );
      default:
        return 'hello';
    }
  };
  return (
    <div>
      <header
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1,
        }}
      >
        <ResponsivePageHeader />
        <Divider />
      </header>
      <main>
        <Grid container>
          <Grid item xs={12}>
            <PageTransition>
              <ContentContainer>
                <TitleHeader>
                  <span>진료 | </span>
                  <span>진료 등록</span>
                </TitleHeader>

                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                <Divider light />
                {getStepContent(activeStep)}

                {/* Medicine Drawer */}
                {activeStep === 1 && (
                  <Fragment>
                    <MedicineDrawer />
                    <InjectorDrawer />
                    <DiagnosticDrawer />
                    <DiagnosisHistoryDrawer />
                    <DiagnosisModal />
                  </Fragment>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'fixed',
                    padding: '0.5rem',
                    width: 'calc(100% - 100px)',
                    bottom: 10,
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    type="button"
                    size="small"
                    style={{
                      border: '1px solid rgba(0,0,0,0.12)',
                      marginRight: '0.5rem',
                      padding: '0.5rem',
                    }}
                    onClick={handleBack}
                  >
                    <IoIosArrowBack />
                  </IconButton>
                  <IconButton
                    type="button"
                    size="small"
                    style={{
                      border: '1px solid rgba(0,0,0,0.12)',
                      marginRight: '0.5rem',
                      padding: '0.5rem',
                    }}
                    onClick={handleNext}
                  >
                    <IoIosArrowForward />
                  </IconButton>
                </div>
              </ContentContainer>
            </PageTransition>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default DiagnosisPage;
