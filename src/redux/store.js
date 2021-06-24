import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import reservationReducer from './features/reservation/reservationSlice';
import diagnosisReducer from './features/diagnosis/diagnosisSlice';
import noticeReducer from './features/notice/noticeSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    reservation: reservationReducer,
    diagnosis: diagnosisReducer,
    notice: noticeReducer,
  },
});
