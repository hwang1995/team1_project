import { createSlice } from '@reduxjs/toolkit';

export const noticeSlice = createSlice({
  name: 'notice',
  initialState: {
    activeStep: 'MAIN',
    noticeItem: [
      {
        notice_id: 1,
        notice_title: '공지사항1',
        notice_date: '6월 21일',
        notice_content: '안녕하세요1',
        notice_author: '홍종현',
        notice_head_text: '안녕하세요1',
        notice_head_image: '/assets/image/hospital.png',
      },
      {
        notice_id: 2,
        notice_title: '공지사항2',
        notice_date: '6월 9일',
        notice_content: '안녕하세요2',
        notice_author: '김형윤',
        notice_head_text: '안녕하세요2',
        notice_head_image: '/assets/image/hospital.png',
      },
      {
        notice_id: 3,
        notice_title: '공지사항3',
        notice_date: '6월 9일',
        notice_content: '안녕하세요3',
        notice_author: '박시현',
        notice_head_text: '안녕하세요3',
        notice_head_image: '/assets/image/hospital.png',
      },
      {
        notice_id: 4,
        notice_title: '공지사항4',
        notice_date: '6월 9일',
        notice_content: '안녕하세요4',
        notice_author: '홍종현',
        notice_head_text: '안녕하세요4',
        notice_head_image: '/assets/image/hospital.png',
      },
      {
        notice_id: 5,
        notice_title: '공지사항5',
        notice_content: '안녕하세요5',
        notice_date: '6월 9일',
        notice_author: '황성욱',
        notice_head_text: '안녕하세요5',
        notice_head_image: '/assets/image/hospital.png',
      },
      {
        notice_id: 6,
        notice_title: '공지사항6',
        notice_content: '안녕하세요6',
        notice_date: '6월 9일',
        notice_author: '김형윤',
        notice_head_text: '안녕하세요6',
        notice_head_image: '/assets/image/hospital.png',
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
