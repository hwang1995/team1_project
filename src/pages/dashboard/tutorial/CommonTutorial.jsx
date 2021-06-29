import React, { Fragment } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

SwiperCore.use([Navigation]);
const CommonTutorial = () => {
  return (
    <Fragment>
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
          <img
            src="/assets/image/tutorial/common/slide/슬라이드1.png"
            alt="Logo"
            width="100%"
          />
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
          <img
            src="/assets/image/tutorial/common/slide/슬라이드2.png"
            alt="Logo"
            width="100%"
          />
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
          <img
            src="/assets/image/tutorial/common/slide/슬라이드3.png"
            alt="Logo"
            width="100%"
          />
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
          <img
            src="/assets/image/tutorial/common/slide/슬라이드4.png"
            alt="Logo"
            width="100%"
          />
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
          <img
            src="/assets/image/tutorial/common/slide/슬라이드5.png"
            alt="Logo"
            width="100%"
          />
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
          <img
            src="/assets/image/tutorial/common/slide/슬라이드6.png"
            alt="Logo"
            width="100%"
          />
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
          <img
            src="/assets/image/tutorial/common/slide/슬라이드7.png"
            alt="Logo"
            width="100%"
          />
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
          <img
            src="/assets/image/tutorial/common/slide/슬라이드8.png"
            alt="Logo"
            width="90%"
          />
        </SwiperSlide>
      </Swiper>
    </Fragment>
  );
};

export default CommonTutorial;
