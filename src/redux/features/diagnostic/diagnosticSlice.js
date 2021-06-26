import { createSlice } from '@reduxjs/toolkit';

export const diagnosticSlice = createSlice({
  name: 'diagnostic',
  initialState: {
    drawerStatus: {
      status: false,
      pageStatus: 'LIST',
    },
    modalStatus: false,
  },
  reducers: {
    setDiagnosticDrawer(state, action) {
      state.drawerStatus.status = action.payload;
    },
    setDiagnosticDrawerPage(state, action) {
      state.drawerStatus.pageStatus = action.payload;
    },
    setDiagnosticModal(state, action) {
      state.modalStatus = action.payload;
    },
  },
});

export const {
  setDiagnosticDrawer,
  setDiagnosticDrawerPage,
  setDiagnosticModal,
} = diagnosticSlice.actions;

export default diagnosticSlice.reducer;
