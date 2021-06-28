import React, { useEffect } from 'react';
import { Divider, Grid, Container } from '@material-ui/core';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';
import PageTransition from 'components/common/transition/PageTransition';
import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';

SwiperCore.use([Navigation]);

const TutorialPage = () => {
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
                <Swiper
                  spaceBetween={50}
                  // slidesPerView={1}
                  navigation={true}
                >
                  <SwiperSlide
                    style={{
                      width: '100%',
                      height: '100vh',
                      backgroundColor: ' aliceblue',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    GAZUA
                  </SwiperSlide>
                  <SwiperSlide
                    style={{
                      width: '100%',
                      height: '100vh',
                      backgroundColor: ' aliceblue',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    HWA SEONG
                  </SwiperSlide>
                  <SwiperSlide
                    style={{
                      width: '100%',
                      height: '100vh',
                      backgroundColor: ' aliceblue',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    IAM HUNGRY
                  </SwiperSlide>
                </Swiper>
              </ContentContainer>
            </PageTransition>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default TutorialPage;
