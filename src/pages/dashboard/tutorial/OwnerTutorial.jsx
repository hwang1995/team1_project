import React, { Fragment} from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';


SwiperCore.use([Navigation]);
const OwnerTutorial = () => {

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
            src="/assets/image/tutorial/owner/슬라이드1.jpg"
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
            src="/assets/image/tutorial/owner/슬라이드3.jpg"
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
            src="/assets/image/tutorial/owner/슬라이드2.jpg"
            alt="Logo"
            width="90%"
          />
        </SwiperSlide>
      </Swiper>
    </Fragment>
  );
};

export default OwnerTutorial;