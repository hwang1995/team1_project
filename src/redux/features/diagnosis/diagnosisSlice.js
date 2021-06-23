import { createSlice } from '@reduxjs/toolkit';

export const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState: {
    patient: {
      id: 0,
      diag_id: 0,
      start_date: '',
      end_date: '',
      visit_purpose: '',
      reservation_status: '',
      member_id: 0,
      patient_id: 0,
      patient_name: '',
      patient_gender: '',
      patient_birth: '',
    },
    diagnosisInfo: {
      diag_id: 0,
      member_id: 0,
      patient_id: 0,
      dr_opinion: '',
      medicineInfo: [],
      injectorInfo: [],
      diagnosticInfo: [],
    },
    medicineInfo: [],
    injectorInfo: [],
    diagnosticInfo: [],
    searchDiagnosticInfo: [],
    drawerStatus: {
      medicine: false,
      injector: false,
      diagnostic: false,
      diagnosisHistory: false,
    },
    modalStatus: false,
    activeStep: 0,
  },
  reducers: {
    setPatient(state, action) {
      state.patient = action.payload;
    },
    setMedicineDrawer(state, action) {
      state.drawerStatus.medicine = action.payload;
    },
    setInjectorDrawer(state, action) {
      state.drawerStatus.injector = action.payload;
    },
    setDiagnosisInfo(state, action) {
      const { medicineInfo, injectorInfo, diagnosticInfo } = state;
      const newState = {
        ...action.payload,
        medicineInfo,
        injectorInfo,
        diagnosticInfo,
      };
      state.diagnosisInfo = newState;
    },
    addMedicineInfo(state, action) {
      const { medicineInfo } = state;
      // 아무런 값이 없는 경우
      const isExistItem = medicineInfo.findIndex((element) =>
        element.medicine_id === action.payload.medicine_id ? true : false,
      );

      // 배열에 요소가 없거나, 새로운 아이템인 경우 바로 상태에 추가시킨다.
      if (medicineInfo.length === 0 || isExistItem === -1) {
        medicineInfo.push(action.payload);
      } else if (isExistItem !== -1) {
        // 값이 있는데 값을 추가하고 싶은 경우
        medicineInfo[isExistItem] = {
          ...medicineInfo[isExistItem],
          count: action.payload.count,
        };
      }
    },
    removeMedicineInfo(state, action) {
      const { medicineInfo } = state;
      const newState = medicineInfo.filter((data) => {
        if (data.medicine_id === action.payload.medicine_id) {
          return false;
        }
        return true;
      });
      state.medicineInfo = newState;
    },
    addInjectorInfo(state, action) {
      const { injectorInfo } = state;
      // 아무런 값이 없는 경우
      const isExistItem = injectorInfo.findIndex((element) =>
        element.medicine_id === action.payload.medicine_id ? true : false,
      );

      // 배열에 요소가 없거나, 새로운 아이템인 경우 바로 상태에 추가시킨다.
      if (injectorInfo.length === 0 || isExistItem === -1) {
        injectorInfo.push(action.payload);
      } else if (isExistItem !== -1) {
        // 값이 있는데 값을 추가하고 싶은 경우
        injectorInfo[isExistItem] = {
          ...injectorInfo[isExistItem],
          count: action.payload.count,
        };
      }
    },
    removeInjectorInfo(state, action) {
      const { injectorInfo } = state;
      const newState = injectorInfo.filter((data) => {
        if (data.medicine_id === action.payload.medicine_id) {
          return false;
        }
        return true;
      });
      state.injectorInfo = newState;
    },
    addDiagnosticInfo(state, action) {
      const { diagnosticInfo } = state;
      // 아무런 값이 없는 경우
      const isExistItem = diagnosticInfo.findIndex((element) =>
        element.diag_inspection_id === action.payload.diag_inspection_id
          ? true
          : false,
      );

      // 배열에 요소가 없거나, 새로운 아이템인 경우 바로 상태에 추가시킨다.
      if (diagnosticInfo.length === 0 || isExistItem === -1) {
        diagnosticInfo.push(action.payload);
      } else if (isExistItem !== -1) {
        // 값이 있는데 값을 추가하고 싶은 경우
        diagnosticInfo[isExistItem] = {
          ...diagnosticInfo[isExistItem],
          count: action.payload.count,
        };
      }
    },
    removeDiagnosticInfo(state, action) {
      const { diagnosticInfo } = state;
      const newState = diagnosticInfo.filter((data) => {
        if (data.diag_inspection_id === action.payload.diag_inspection_id) {
          return false;
        }
        return true;
      });
      state.diagnosticInfo = newState;
    },
    setDiagnosticDrawer(state, action) {
      state.drawerStatus.diagnostic = action.payload;
    },
    setDiagnosisHistoryDrawer(state, action) {
      state.drawerStatus.diagnosisHistory = action.payload;
    },
    setSearchDiagnosticInfo(state, action) {
      state.searchDiagnosticInfo = action.payload;
    },
    addDiagnosticGroupItem(state, action) {
      // 1. searchDiagnosticInfo의 정보를 가져온다.
      const { bundle_code } = action.payload;
      const { searchDiagnosticInfo } = state;

      searchDiagnosticInfo
        .filter((data) => {
          if (data.bundle_code === bundle_code) {
            return true;
          }
          return false;
        })
        .map((data) => state.diagnosticInfo.push(data));
    },
    removeDiagnosticGroupItem(state, action) {
      const { diagnosticInfo } = state;
      const filteredItem = diagnosticInfo.filter((data) => {
        if (data.bundle_code !== action.payload) {
          return true;
        }
        return false;
      });
      state.diagnosticInfo = filteredItem;
    },
    setDiagnosisModal(state, action) {
      state.modalStatus = action.payload;
    },
    setActiveStep(state, action) {
      state.activeStep = action.payload;
    },
  },
});

export const {
  setPatient,
  setDiagnosisInfo,
  addMedicineInfo,
  removeMedicineInfo,
  addInjectorInfo,
  removeInjectorInfo,
  addDiagnosticInfo,
  removeDiagnosticInfo,
  setMedicineDrawer,
  setInjectorDrawer,
  setDiagnosticDrawer,
  setDiagnosisHistoryDrawer,
  addDiagnosticGroupItem,
  removeDiagnosticGroupItem,
  setSearchDiagnosticInfo,
  setDiagnosisModal,
  setActiveStep,
} = diagnosisSlice.actions;

export default diagnosisSlice.reducer;
