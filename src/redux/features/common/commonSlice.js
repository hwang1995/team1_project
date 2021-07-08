import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    authToken: '',
    loginInfo: {
      memberId: 0,
      memberEmail: '',
      memberName: '',
      memberAuthority: '',
      hospitalCode: '',
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
      // Stringify된 JSON을 파싱해서 Redux의 상태로 적용

      state.loginInfo = action.payload;
      // state.loginInfo = a.payload;
    },
    setSidebarInfo(state, action) {
      const { name, status } = action.payload;
      state.sidebarInfo[name] = status;
    },
    setHeaderInfo(state, action) {
      const { name, status } = action.payload;
      state.headerInfo[name] = status;
    },
    setAuthToken(state, action) {
      state.authToken = action.payload;
    }
  },
});

export const { setLoginInfo, setSidebarInfo, setHeaderInfo, setAuthToken } =
  commonSlice.actions;

export default commonSlice.reducer;
