import { createSlice } from '@reduxjs/toolkit';

export const diagnosisHistorySlice = createSlice({
  name: 'diagnosisHistory',
  initialState: {
    currentPatientId: 0,
    drawerStatus: {
      diagnosisHistory: false
    },
    modalStatus: {
      search: false
    }
  },
  reducers: {
    setPatientId(state, action) {
      state.currentPatientId = action.payload;
    },
    setDrawerStatus(state, action) {
      const { name, status } = action.payload;
      state.drawerStatus[name] = status;
    },
    setModalStatus(state, action) {
      const { name, status } = action.payload;
      state.modalStatus[name] = status;
    }
  },
});

export const { setPatientId, setDrawerStatus, setModalStatus } = diagnosisHistorySlice.actions;

export default diagnosisHistorySlice.reducer;