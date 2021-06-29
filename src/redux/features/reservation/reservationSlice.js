import { createSlice } from '@reduxjs/toolkit';

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    pageStatus: 'INFO',
    inputVal: '',
    reservationInfo: [],
  },
  reducers: {
    changePage(state, action) {
      state.pageStatus = action.payload;
    },
    chaneInputVal(state, action) {
      state.inputVal = action.payload;
    },
    setReservationTime(state, action) {
      const newReservationInfo = state.reservationInfo.concat(action.payload);
      state.reservationInfo = newReservationInfo;
    },
    upateReservationTime(state, action) {
      const newReservationInfo = state.reservationInfo.map((reservationInfo) => {
        if(action.payload.id === reservationInfo.id){
          const newInfo = { ...reservationInfo, drOpinion: action.payload.drOpinion };
          return newInfo;
        }else{
          return reservationInfo;
        }
      })
     state.reservationInfo = newReservationInfo;
    },
    removeReservationTime(state, action) {
      const newReservationInfo = state.reservationInfo.filter((reservationInfo) => {
        if(action.payload === reservationInfo.id) {
          return false;
        }
        return true;
      })
       state.reservationInfo = newReservationInfo;
    }
  },
});

export const { changePage, chaneInputVal, setReservationTime, upateReservationTime,removeReservationTime } = reservationSlice.actions;

export default reservationSlice.reducer;
