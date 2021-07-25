import { createSlice } from '@reduxjs/toolkit';

export const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState: {
    patient: {
      id: 0,
      diagId: 0,
      startDate: '',
      visitPurpose: '',
      patientId: 0,
      patientName: '',
      patientGender: '',
      patientBirth: '',
    },
    diagnosisInfo: {
      diagId: 0,
      memberId: 0,
      patientId: 0,
      drOpinion: '',
      medicineInfo: [],
      injectorInfo: [],
      diagnosticInfo: [],
      vitalInfo: {},
    },
    medicineInfo: [],
    injectorInfo: [],
    diagnosticInfo: [],
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
        element.medicineId === action.payload.medicineId ? true : false,
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
        if (data.medicineId === action.payload.medicineId) {
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
        element.medicineId === action.payload.medicineId ? true : false,
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
        if (data.medicineId === action.payload.medicineId) {
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
        element.diagInspectionId === action.payload.diagInspectionId
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
        if (data.diagInspectionId === action.payload.diagInspectionId) {
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

    addDiagnosticGroupItem(state, action) {
      action.payload.map((data) => state.diagnosticInfo.push(data));
    },
    removeDiagnosticGroupItem(state, action) {
      const { diagnosticInfo } = state;
      const filteredItem = diagnosticInfo.filter((data) => {
        if (data.bundleCode !== action.payload) {
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
    resetDiagnosisInfos(state) {
      const initialDiagnosisInfo = {
        diagId: 0,
        memberId: 0,
        patientId: 0,
        drOpinion: '',
        medicineInfo: [],
        injectorInfo: [],
        diagnosticInfo: [],
        vitalInfo: {}
      };
      const medicineInfo = [];
      const injectorInfo = [];
      const diagnosticInfo = [];
      state.diagnosisInfo = initialDiagnosisInfo

      state.medicineInfo = medicineInfo;
      state.injectorInfo = injectorInfo;
      state.diagnosticInfo = diagnosticInfo;

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
  setDiagnosisModal,
  setActiveStep,
  resetDiagnosisInfos,

} = diagnosisSlice.actions;

export default diagnosisSlice.reducer;
