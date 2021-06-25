import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './features/reservation/reservationSlice';
import diagnosisReducer from './features/diagnosis/diagnosisSlice';
<<<<<<< HEAD
import noticeReducer from './features/notice/noticeSlice';

=======
import memberReducer from './features/member/memberSlice';
import commonReducer from './features/common/commonSlice';
import diagnosticReducer from './features/diagnostic/diagnosticSlice';
>>>>>>> ecf16a459395cbb23c8865341070e4299c75e152
export default configureStore({
  reducer: {
    common: commonReducer,
    reservation: reservationReducer,
    diagnosis: diagnosisReducer,
<<<<<<< HEAD
    notice: noticeReducer,
=======
    diagnostic: diagnosticReducer,
    member: memberReducer,
>>>>>>> ecf16a459395cbb23c8865341070e4299c75e152
  },
});
