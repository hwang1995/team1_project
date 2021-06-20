import React, { useState, Fragment } from 'react';
import {
  Divider,
  Grid,
  Hidden,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from '@material-ui/core';
import { GiMedicines, GiLoveInjection } from 'react-icons/gi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import useWindowSize from 'hooks/useWindowSize';
import StyledButton from 'components/common/button/StyledButton';
import PageHeader from 'components/common/header/PageHeader';
import MenuSidebar from 'components/common/sidebar/MenuSidebar';
import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';
import DataTable from 'components/diagnosis/table/DataTable';
import DiagnosisDataPage from 'components/diagnosis/container/DiagnosisDataInput';
import MedicineDrawer from 'components/diagnosis/drawer/MedicineDrawer';
import StyledTypography from 'components/common/typography/StyledTypography';
const getSteps = () => [
  '진료할 환자를 선택해주세요.',
  '진료를 진행합니다.',
  '진료 완료',
];

const DiagnosisPage = () => {
  const steps = getSteps();
  const { breakpoint } = useWindowSize();
  const [isOpened, setOpened] = useState(false);
  const [injectorOpened, setInjectorOpened] = useState(false);
  const [medData, setMedData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevState) => {
      if (selectedPatient === '') {
        alert('환자를 선택해주세요');
        return prevState;
      }
      return prevState + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevState) => {
      if (prevState < 1) {
        return prevState;
      }
      return prevState - 1;
    });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <DataTable setPatient={setSelectedPatient} />;
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <DiagnosisDataPage selectedPatient={selectedPatient} />
            <Grid container spacing={2}>
              <Grid item xs={5} sm={3} md={2}>
                <StyledButton
                  size="medium"
                  bgColor="#003049"
                  onClick={() => setOpened((prevState) => !prevState)}
                >
                  <GiMedicines size={28} color="white" />
                  <span style={{ marginLeft: '0.5rem', color: 'white' }}>
                    약 처방하기
                  </span>
                </StyledButton>
              </Grid>
              <Grid item xs={5} sm={3} md={2}>
                <StyledButton size="medium" bgColor="#FCBF49">
                  <GiLoveInjection size={28} />
                  <span style={{ marginLeft: '0.5rem' }}>주사 처방하기</span>
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
        <PageHeader />
        <Divider />
      </header>
      <main>
        <Grid container>
          <Grid item xs={false} sm={4} md={3} lg={2}>
            <Hidden xsDown>
              <MenuSidebar />
            </Hidden>
          </Grid>

          <Grid item xs={12} sm={8} md={9} lg={10}>
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
              <MedicineDrawer
                isOpened={isOpened}
                setOpened={setOpened}
                setMedData={setMedData}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  position: 'fixed',
                  padding: '0.5rem',
                  width: '80%',
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
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default DiagnosisPage;
