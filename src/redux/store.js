import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './features/reservation/reservationSlice';
import diagnosisReducer from './features/diagnosis/diagnosisSlice';
import noticeReducer from './features/notice/noticeSlice';

import memberReducer from './features/member/memberSlice';
import commonReducer from './features/common/commonSlice';
import diagnosticReducer from './features/diagnostic/diagnosticSlice';
export default configureStore({
  reducer: {
    common: commonReducer,
    reservation: reservationReducer,
    diagnosis: diagnosisReducer,
    notice: noticeReducer,
    diagnostic: diagnosticReducer,
    member: memberReducer,
  },
});
