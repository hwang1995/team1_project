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
  },
});

export const { setLoginInfo, setSidebarInfo } = commonSlice.actions;

export default commonSlice.reducer;
