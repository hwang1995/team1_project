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
      search: false,
    },
    diagnosticDataInput: {},
    currentDiagTestId: 0,
    currentDiagTestList: []
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
      const { diagTestRecordId, value } = action.payload;
      state.diagnosticDataInput[diagTestRecordId] = value;
    },
    setCurrentDiagTestId(state, action) {
      state.currentDiagTestId = action.payload;
    },
    setCurrentDiagTestList(state, action) {
      state.currentDiagTestList = action.payload;
    },
    resetDiagnosticData(state) {
      state.diagnosticDataInput = {};
      state.currentDiagTestId = 0;
      state.currentDiagTestList = [];
    }

  },
});

export const {
  setDiagnosticDrawer,
  setDiagnosticDrawerPage,
  setDiagnosticModal,
  setDiagnosticDataInput, setCurrentDiagTestId, setCurrentDiagTestList, resetDiagnosticData
} = diagnosticSlice.actions;

export default diagnosticSlice.reducer;
