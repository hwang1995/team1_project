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
  },
  reducers: {
    setPatient(state, action) {
      state.patient = action.payload;
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
        element.medicine_id === action.payload.medicine_id ? true : false
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
        element.medicine_id === action.payload.medicine_id ? true : false
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
        element.medicine_id === action.payload.medicine_id ? true : false
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
        if (data.medicine_id === action.payload.medicine_id) {
          return false;
        }
        return true;
      });
      state.diagnosticInfo = newState;
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
} = diagnosisSlice.actions;

export default diagnosisSlice.reducer;
