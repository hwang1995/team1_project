import { createSlice } from '@reduxjs/toolkit';

export const diagnosticSlice = createSlice({
  name: 'diagnostic',
  initialState: {
    drawerStatus: {
      status: false,
      pageStatus: 'LIST',
    },
    modalStatus: {
      barcode: false,
      reception: false,
      bloodDraw: false,
    },
    diagnosticDataInput: {},
  },
  reducers: {
    setDiagnosticDrawer(state, action) {
      state.drawerStatus.status = action.payload;
    },
    setDiagnosticDrawerPage(state, action) {
      state.drawerStatus.pageStatus = action.payload;
    },
    setDiagnosticModal(state, action) {
      const { name, status } = action.payload;
      state.modalStatus[name] = status;
    },
    setDiagnosticDataInput(state, action) {
      const { diag_inspection_id, value } = action.payload;
      state.diagnosticDataInput[diag_inspection_id] = value;
    },
  },
});

export const {
  setDiagnosticDrawer,
  setDiagnosticDrawerPage,
  setDiagnosticModal,
  setDiagnosticDataInput,
} = diagnosticSlice.actions;

export default diagnosticSlice.reducer;
