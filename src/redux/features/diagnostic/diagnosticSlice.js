import { createSlice } from '@reduxjs/toolkit';

export const diagnosticSlice = createSlice({
  name: 'diagnostic',
  initialState: { drawerStatus: false },
  reducers: {
    setDiagnosticDrawer(state, action) {
      state.drawerStatus = action.payload;
    },
  },
});

export const { setDiagnosticDrawer } = diagnosticSlice.actions;

export default diagnosticSlice.reducer;
