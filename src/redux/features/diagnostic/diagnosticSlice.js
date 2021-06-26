import { createSlice } from '@reduxjs/toolkit';

export const diagnosticSlice = createSlice({
  name: 'diagnostic',
  initialState: {
    drawerStatus: {
      status: false,
      pageStatus: 'LIST',
    },
  },
  reducers: {
    setDiagnosticDrawer(state, action) {
      state.drawerStatus.status = action.payload;
    },
    setDiagnosticDrawerPage(state, action) {
      state.drawerStatus.pageStatus = action.payload;
    },
  },
});

export const { setDiagnosticDrawer, setDiagnosticDrawerPage } =
  diagnosticSlice.actions;

export default diagnosticSlice.reducer;
