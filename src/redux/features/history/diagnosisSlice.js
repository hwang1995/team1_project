import { createSlice } from '@reduxjs/toolkit';

export const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState: {
    diagnosisInfo: {
      diag_id: 0,
      member_id: 0,
      patient_id: 0,
      dr_opinion: '',
      medicineInfo: [],
      injectorInfo: [],
      diagnosticInfo: [],
    },
    
    drawerStatus: {
     
      diagnosisHistory: false,
    },
  },
  reducers: {

    
    
    setDiagnosisHistoryDrawer(state, action) {
      state.drawerStatus.diagnosisHistory = action.payload;
    },
    
  },
});

export const {
  setDiagnosisHistoryDrawer,
  
} = diagnosisSlice.actions;

export default diagnosisSlice.reducer;
