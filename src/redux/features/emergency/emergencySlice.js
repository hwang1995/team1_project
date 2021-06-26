import { createSlice } from '@reduxjs/toolkit';

export const emergencySlice = createSlice({
  name: 'emergency',
  initialState: {
    activeStep: 'MAIN',
    emergencyItem: [
      {
        emergency_id: 1,
        emergency_name: '송파구 소방서',
        emergency_tel: '010-212-8282',
      },
      {
        emergency_id: 2,
        emergency_name: '더존병원 응급실',
        emergency_tel: '02-721-8282',
      },
      {
        emergency_id: 3,
        emergency_name: '더존병원 홍길동 교수님',
        emergency_tel: '010-9993-8282',
      },
      {
        emergency_id: 4,
        emergency_name: '더존병원 구급대원',
        emergency_tel: '010-2132-8282',
      },
      {
        emergency_id: 5,
        emergency_name: '더존제약 영업사원',
        emergency_tel: '010-2112-8282',
      },
      {
        emergency_id: 6,
        emergency_name: '더존헬스케어 영업사원',
        emergency_tel: '010-1234-8282',
      },
    ],
    emergencyCurrentIndex: 0,
  },
  reducers: {
    setActiveStep(state, action) {
      state.activeStep = action.payload;
    },
    addEmergencyItem(state, action) {
      const newState = state.emergencyItem;
      newState.push(action.payload);
      state.emergencyItem = newState;
    },
    
    removeEmergencyItem(state, action) {
      const filteredItem = state.emergencyItem.filter((data) => {
        if (data.emergency_id !== action.payload.emergency_id) {
          return true;
        }
        return false;
      });
      state.emergencyItem = filteredItem;
    },
    setEmergencyCurrentIndex(state, action) {
      state.emergencyCurrentIndex = action.payload;
    },
  },
});

export const {
  setActiveStep,
  addEmergencyItem,
  removeEmergencyItem,
  setEmergencyCurrentIndex,
} = emergencySlice.actions;

export default emergencySlice.reducer;
