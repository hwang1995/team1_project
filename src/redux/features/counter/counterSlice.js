import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// 액션 생성자는 각각의 경우의 리듀서 함수를 생성함.
export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
