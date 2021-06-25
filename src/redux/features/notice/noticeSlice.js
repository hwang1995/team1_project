import { createSlice } from '@reduxjs/toolkit';

export const noticeSlice = createSlice({
  name: 'notice',
  initialState: {
    activeStep: 'MAIN',
    noticeItem: [
      {
        notice_id: 1,
        notice_title: '종현이 멋죠요.',
        notice_date: '6월 21일',
        notice_content: '안녕하세요',
        notice_author: 'Dr. Hong',
      },
      {
        notice_id: 2,
        notice_title: '가즈아.',
        notice_date: '6월 9일',
        notice_content: '안녕하세요',
        notice_author: 'Dr. Hong',
      },
      {
        notice_id: 3,
        notice_title: '가즈아.',
        notice_date: '6월 9일',
        notice_content: '안녕하세요',
        notice_author: 'Dr. Hong',
      },
      {
        notice_id: 4,
        notice_title: '가즈아.',
        notice_date: '6월 9일',
        notice_content: '안녕하세요',
        notice_author: 'Dr. Hong',
      },
      {
        notice_id: 5,
        notice_title: '가즈아.',
        notice_content: '안녕하세요',
        notice_date: '6월 9일',
        notice_author: 'Dr. Hong',
      },
      {
        notice_id: 6,
        notice_title: '가즈아.',
        notice_content: '안녕하세요',
        notice_date: '6월 9일',
        notice_author: 'Dr. Hong',
      },
    ],
    noticeCurrentIndex: 0,
  },
  reducers: {
    setActiveStep(state, action) {
      state.activeStep = action.payload;
    },
    addNoticeItem(state, action) {
      const newState = state.noticeItem;
      newState.push(action.payload);
      state.noticeItem = newState;
    },
    modifyNoticeItem(state, action) {
      const newState = state.noticeItem;
      const isExistedItem = newState.findIndex((data) =>
        data.notice_id === action.payload.notice_id ? true : false,
      );

      // 배열에 아이템이 없지 않다면 값을 바꾼다.
      if (isExistedItem !== -1) {
        newState[isExistedItem] = action.payload;
        state.noticeItem = newState;
      }
    },
    removeNoticeItem(state, action) {
      const filteredItem = state.noticeItem.filter((data) => {
        if (data.notice_id !== action.payload.notice_id) {
          return true;
        }
        return false;
      });
      state.noticeItem = filteredItem;
    },
    setNoticeCurrentIndex(state, action) {
      state.noticeCurrentIndex = action.payload;
    },
  },
});

export const {
  setActiveStep,
  addNoticeItem,
  modifyNoticeItem,
  removeNoticeItem,
  setNoticeCurrentIndex,
} = noticeSlice.actions;

export default noticeSlice.reducer;
