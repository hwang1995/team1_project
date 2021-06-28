import { createSlice } from '@reduxjs/toolkit';

export const emergencySlice = createSlice({
  name: 'emergency',
  initialState: {
    activeStep: 'MAIN',
    emergencyItem: [
      {
        emergency_id: 1,
        emergency_name: '병원 대표번호',
        emergency_tel: '02-212-8282',
        emergency_line: '내선',
      },
      {
        emergency_id: 2,
        emergency_name: '송파구 보건소',
        emergency_tel: '02-2147-3455',
        emergency_line: '외선',
      },
      {
        emergency_id: 3,
        emergency_name: '더존병원 응급실',
        emergency_tel: '02-721-8282',
        emergency_line: '내선',
      },
      {
        emergency_id: 4,
        emergency_name: '더존병원 홍길동 교수',
        emergency_tel: '010-9993-8282',
        emergency_line: '내선',
      },
      {
        emergency_id: 5,
        emergency_name: '더존병원 구급대원',
        emergency_tel: '010-2132-8282',
        emergency_line: '내선',
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