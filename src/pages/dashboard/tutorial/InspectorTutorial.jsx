import React, { Fragment } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';



SwiperCore.use([Navigation]);
/**
 * 이 페이지 컴포넌트는 검사자의 사용자가이드를 보여주기 위해 작성하는 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * - InspectorTutorial
 * @returns {JSX.Element}
 * 
 * @author HYEONG YUN KIM
 */
const InspectorTutorial = () => {

  return (
    <Fragment>
      
      <Swiper
        spaceBetween={50}
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
            src="/assets/image/tutorial/common/프레젠테이션1/슬라이드10.png"
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
            src="/assets/image/tutorial/common/프레젠테이션1/슬라이드11.png"
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
            src="/assets/image/tutorial/common/프레젠테이션1/슬라이드12.png"
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
            src="/assets/image/tutorial/common/프레젠테이션1/슬라이드13.png"
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
            src="/assets/image/tutorial/common/프레젠테이션1/슬라이드14.png"
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
            src="/assets/image/tutorial/common/프레젠테이션1/슬라이드15.png"
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
            src="/assets/image/tutorial/common/프레젠테이션1/슬라이드16.png"
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
            src="/assets/image/tutorial/common/프레젠테이션1/슬라이드18.png"
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
            src="/assets/image/tutorial/common/프레젠테이션1/슬라이드19.png"
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
            src="/assets/image/tutorial/common/프레젠테이션1/슬라이드20.png"
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
            src="/assets/image/tutorial/common/프레젠테이션1/슬라이드21.png"
            alt="Logo"
            width="100%"
          />
        </SwiperSlide>
      </Swiper>
    </Fragment>
  );
};

export default InspectorTutorial;