import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './features/reservation/reservationSlice';
import diagnosisReducer from './features/diagnosis/diagnosisSlice';
import noticeReducer from './features/notice/noticeSlice';
import emergencyReducer from './features/emergency/emergencySlice';

import memberReducer from './features/member/memberSlice';
import commonReducer, { setAuthToken, setLoginInfo } from './features/common/commonSlice';
import diagnosticReducer from './features/diagnostic/diagnosticSlice';
import tutorialReducer from './features/tutorial/tutorialSlice';
import { addAuthHeader } from 'apis/axiosConfig';


const store = configureStore({
  reducer: {
    common: commonReducer,
    reservation: reservationReducer,
    diagnosis: diagnosisReducer,
    notice: noticeReducer,
    diagnostic: diagnosticReducer,
    member: memberReducer,
    emergency: emergencyReducer,
    tutorial: tutorialReducer,
  },
});

// Axios에 인증 헤더 추가
if (sessionStorage.getItem("authToken")) {
  addAuthHeader(sessionStorage.getItem('authToken'));
}
// const testInfo = {
//   memberId: 1000,
//   memberEmail: '',
//   memberName: '',
//   memberAuthority: '',
//   hospitalCode: '',
// }
// store.dispatch(setLoginInfo(sessionStorage.getItem("userInfo") || ''));
// store.dispatch(setAuthToken(sessionStorage.getItem("authToken") || ''));
export default store;