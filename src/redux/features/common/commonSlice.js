import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    loginInfo: {
      member_id: 0,
      member_email: '',
      member_name: '',
      member_authority: '',
      hospital_code: '',
      hospital_name: '',
    },
    sidebarInfo: {
      drawer: false,
      diagnosis: false,
      hospital: false,
      patient: false,
    },
    headerInfo: {
      drawer: false,
      notification: false,
      auth: false,
      diagnosis: false,
      hospital: false,
      patient: false,
    },
  },
  reducers: {
    setLoginInfo(state, action) {
      state.loginInfo = action.payload;
    },
    setSidebarInfo(state, action) {
      const { name, status } = action.payload;
      state.sidebarInfo[name] = status;
    },
    setHeaderInfo(state, action) {
      const { name, status } = action.payload;
      state.headerInfo[name] = status;
    },
  },
});

export const { setLoginInfo, setSidebarInfo, setHeaderInfo } =
  commonSlice.actions;

export default commonSlice.reducer;
