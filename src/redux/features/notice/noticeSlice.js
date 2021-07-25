import { createSlice } from '@reduxjs/toolkit';

export const noticeSlice = createSlice({
  name: 'notice',
  initialState: {
    activeStep: 'MAIN',
    noticeCurrentIndex: 0,
    noticeCommentIndex: 0,
  },
  reducers: {
    setActiveStep(state, action) {
      state.activeStep = action.payload;
    },

    setNoticeCurrentIndex(state, action) {
      state.noticeCurrentIndex = action.payload;
    },

    setNoticeCommentIndex(state, action) {
      state.noticeCommentIndex = action.payload;
    }
  },
});

export const {
  setActiveStep,
  setNoticeCurrentIndex,
  setNoticeCommentIndex
} = noticeSlice.actions;

export default noticeSlice.reducer;
