import React, { Fragment, useState, useEffect } from 'react';
import { Divider, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { GiMedicines, GiLoveInjection } from 'react-icons/gi';
// 스테퍼 테스트 용
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import useWindowSize from 'hooks/useWindowSize';
import ClrButton from 'components/diagnosis/container/ClrButton';
import MedicineDrawer from './components/MedicineDrawer';
import PageHeader from '../../../components/common/header/PageHeader';
import MenuSidebar from 'components/common/sidebar/MenuSidebar';
import TitleHeader from '../../../components/common/header/TitleHeader';
import DataTable from 'components/diagnosis/table/DataTable';
import DiagnosisDataPage from '../../../components/diagnosis/container/DiagnosisDataInput';
import InjectorDrawer from './components/InjectorDrawer';

const getSteps = () => [
  '진료할 환자를 선택해주세요.',
  '진료를 진행합니다.',
  '진료 완료',
];

const SungwookPage = () => {
  const [isOpened, setOpened] = useState(false);
  const [injectorOpened, setInjectorOpened] = useState(false);
  const [medData, setMedData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { breakpoint } = useWindowSize();

  const [activeStep, setActiveStep] = useState(0);

  const steps = getSteps();

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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <DiagnosisDataPage selectedPatient={selectedPatient} />
            <div style={{ display: 'flex' }}>
              <ClrButton
                setcolor="rgb(70,117,206)"
                size="medium"
                onClick={() => setOpened(!isOpened)}
              >
                <GiMedicines size={28} />
                <span style={{ marginLeft: '0.5rem' }}>약 처방하기</span>
                {/* MedicineDrawer 열기 */}
              </ClrButton>

              <ClrButton
                setcolor="rgb(245, 186, 54)"
                size="medium"
                onClick={() => setInjectorOpened(!injectorOpened)}
              >
                <GiLoveInjection size={28} />
                <span style={{ marginLeft: '0.5rem', fontWeight: 700 }}>
                  주사 처방하기
                </span>
              </ClrButton>
            </div>
          </div>
        );
      case 2:
        return (
          <Fragment>
            <ClrButton
              setcolor="aliceblue"
              size="medium"
              onClick={() =>
                enqueueSnackbar('I Love 3 bun', {
                  variant: 'error',
                })
              }
              style={{ marginLeft: '0.5rem' }}
            >
              Toast 띄우기
            </ClrButton>
            <ClrButton
              setcolor="aliceblue"
              size="medium"
              onClick={() => closeSnackbar()}
              style={{ marginLeft: '0.5rem' }}
            >
              Toast 끄기
            </ClrButton>
          </Fragment>
        );
      default:
        return '이상한데요?';
    }
  };

  useEffect(() => {
    if (medData.length === 0) {
      return;
    }
    console.log(medData);
  }, [medData]);

  useEffect(() => {
    if (breakpoint !== undefined) {
      console.log(breakpoint);
    }
  }, [breakpoint]);

  useEffect(() => {
    if (selectedPatient !== '') {
      console.log('Parent', selectedPatient);
    }
  }, [selectedPatient]);

  return (
    <Fragment>
      <header style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>
        <PageHeader />
        <Divider />
      </header>
      <main>
        <Grid container>
          <Grid item xs={0} sm={4} md={3} lg={2}>
            {breakpoint !== 'xs' ? <MenuSidebar /> : ''}
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <div style={{ height: '90vh', padding: '1rem' }}>
              <TitleHeader>
                <span>진료 | </span>
                <span>진료 등록</span>
              </TitleHeader>

              {/* Stepper를 넣자. */}
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
              {getStepContent(activeStep)}
              <Divider light />

              <br />

              <MedicineDrawer
                isOpened={isOpened}
                setOpened={setOpened}
                setMedData={setMedData}
              />

              <InjectorDrawer
                isOpened={injectorOpened}
                setOpened={setInjectorOpened}
              />
              {/* {medData.length !== 0 &&
                medData.map((data) => (
                  <div>
                    <p>{data.medicine_id}</p>
                    <p>{data.medicine_name}</p>
                  </div>
                ))} */}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                position: 'sticky',
                padding: '1rem',
                bottom: 10,
              }}
            >
              <ClrButton
                setcolor="aliceblue"
                size="medium"
                onClick={handleBack}
              >
                Stepper Back
              </ClrButton>

              <ClrButton
                setcolor="aliceblue"
                size="medium"
                onClick={handleNext}
              >
                Stepper Next
              </ClrButton>
            </div>
          </Grid>
        </Grid>

        {/* <div
          style={{
            padding: '1rem',
            flex: 4,
            height: '100vh',
            overflowY: 'scroll',
          }}
        >
         
        </div> */}
        {/* <div
          style={{
            display: 'block',
            flexDirection: 'column',
            position: 'sticky',
            bottom: 0,
          }}
        >
          <ClrButton setcolor="violet" size="medium" onClick={handleBack}>
            Stepper Back
          </ClrButton>

          <ClrButton setcolor="violet" size="medium" onClick={handleNext}>
            Stepper Next
          </ClrButton>
        </div> */}
      </main>
    </Fragment>
  );
};

export default SungwookPage;
