import { createSlice } from '@reduxjs/toolkit';

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    pageStatus: 'INFO',
  },
  reducers: {
    changePage(state, action) {
      const { page } = action.payload;
      if (page === '') {
        state.pageStatus = page;
      }
    },
  },
});

export const { changePage } = reservationSlice.actions;

export default reservationSlice.reducer;
