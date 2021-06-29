import { createSlice } from '@reduxjs/toolkit';

export const tutorialSlice = createSlice({
  name: 'notice',
  initialState: {
    activeStep: 'MAIN',
    
  },
  reducers: {
    setActiveStep(state, action) {
      state.activeStep = action.payload;
    }
  }
});

export const {
  setActiveStep
} = tutorialSlice.actions;

export default tutorialSlice.reducer;