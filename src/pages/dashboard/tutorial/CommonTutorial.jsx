import React, { Fragment } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

SwiperCore.use([Navigation]);
/**
 * 이 페이지 컴포넌트는 공통부분의 튜토리얼을 보여주기 위해 작성하는 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * - CommonTutorial
 * @returns {JSX.Element}
 * @author HYEONG YUN KIM
 */
const CommonTutorial = () => {
  const { REACT_APP_BUCKET_PATH } = process.env;
  const IMAGE_PATH = '/assets/image/tutorial/common/slide/';

  return (
    <Fragment>
      <Swiper spaceBetween={50} navigation={true}>
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
            // src="/assets/image/tutorial/common/slide/슬라이드1.PNG"
            src={REACT_APP_BUCKET_PATH + IMAGE_PATH + '슬라이드1.PNG'}
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
            src={REACT_APP_BUCKET_PATH + IMAGE_PATH + '슬라이드2.PNG'}
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
            src={REACT_APP_BUCKET_PATH + IMAGE_PATH + '슬라이드3.PNG'}
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
            src={REACT_APP_BUCKET_PATH + IMAGE_PATH + '슬라이드4.PNG'}
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
            src={REACT_APP_BUCKET_PATH + IMAGE_PATH + '슬라이드5.PNG'}
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
            src={REACT_APP_BUCKET_PATH + IMAGE_PATH + '슬라이드6.PNG'}
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
            src={REACT_APP_BUCKET_PATH + IMAGE_PATH + '슬라이드7.PNG'}
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
            src={REACT_APP_BUCKET_PATH + IMAGE_PATH + '슬라이드8.PNG'}
            alt="Logo"
            width="90%"
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
            src={REACT_APP_BUCKET_PATH + IMAGE_PATH + '슬라이드9.PNG'}
            alt="Logo"
            width="90%"
          />
        </SwiperSlide>
      </Swiper>
    </Fragment>
  );
};

export default CommonTutorial;
