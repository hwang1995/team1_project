import React, { useState } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { useSelector, useDispatch } from 'react-redux';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';
import PageTransition from 'components/common/transition/PageTransition';
import ContentContainer from 'components/common/container/ContentContainer';
import DoctorTutorial from './DoctorTutorial';
import NurseTutorial from './NurseTutorial';
import InspectorTutorial from './InspectorTutorial';
import {
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from '@material-ui/core';
import { setActiveStep } from 'redux/features/tutorial/tutorialSlice';
import TitleHeader from 'components/common/header/TitleHeader';
import CommonTutorial from './CommonTutorial';
import OwnerTutorial from './OwnerTutorial';

SwiperCore.use([Navigation]);

const TutorialPage = () => {
  const [auth, setAuth] = useState('COMMON');
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.tutorial.activeStep);

  const getStepContent = (step) => {
    console.log(step);
    switch (step) {
      case 'COMMON':
        return <CommonTutorial />;
      case 'DOCTOR':
        return <DoctorTutorial />;
      case 'NURSE':
        return <NurseTutorial />;
      case 'INSPECTOR':
        return <InspectorTutorial />;
      case 'OWNER':
        return <OwnerTutorial />;
      default:
        return <CommonTutorial />;
    }
  };

  // const handleChangeAuth = (event) => {
  //   setAuth(event.target.value);
  // };

  const handleClick = (auth) => {
    setAuth(auth);
    dispatch(setActiveStep(auth));
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
            {/* <StyledButton onClick={handleClick}>하이루딘</StyledButton> */}
            <PageTransition>
              <ContentContainer>
                <TitleHeader>
                  <div style={{ flex: 4 }}>
                    <span>사용자가이드 | {auth}</span>
                    <span>튜토리얼</span>
                  </div>

                  <FormControl style={{ width: '100%', flex: 1 }}>
                    <Select
                      value={auth}
                      onChange={(e) => handleClick(e.target.value)}
                    >
                      <MenuItem
                        value="COMMON"
                        onClick={() => handleClick('COMMON')}
                      >
                        공통
                      </MenuItem>
                      <MenuItem
                        value="DOCTOR"
                        onClick={() => handleClick('DOCTOR')}
                      >
                        의사
                      </MenuItem>
                      <MenuItem
                        value="NURSE"
                        onClick={() => handleClick('NURSE')}
                      >
                        간호사
                      </MenuItem>
                      <MenuItem
                        value="INSPECTOR"
                        onClick={() => handleClick('INSPECTOR')}
                      >
                        검사자
                      </MenuItem>
                      <MenuItem
                        value="OWNER"
                        onClick={() => handleClick('OWNER')}
                      >
                        병원장
                      </MenuItem>
                    </Select>
                  </FormControl>
                </TitleHeader>
                {getStepContent(activeStep)}
              </ContentContainer>
            </PageTransition>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default TutorialPage;
