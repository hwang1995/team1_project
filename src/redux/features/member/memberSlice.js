import { createSlice } from '@reduxjs/toolkit';

export const memberSlice = createSlice({
  name: 'member',
  initialState: {
    modalStatus: false,
    addressInfo: {
      member_postal: '',
      member_addr1: '',
    },
    gender: '',
    imageModalStatus: false,
  },
  reducers: {
    setModalStatus(state, action) {
      state.modalStatus = action.payload; //http.body
    },
    setAddressInfo(state, action) {
      const { member_postal, member_addr1 } = action.payload;
      console.log('값 저장', action.payload);
      state.addressInfo = {
        member_postal,
        member_addr1,
      };
    },
    setGenderStatus(state, action) {
      state.gender = action.payload;
    },

    setImageModalStatus(state, action) {
      state.imageModalStatus = action.payload;
    },
  },
});

export const {
  setModalStatus,
  setAddressInfo,
  setGenderStatus,
  setImageModalStatus,
} = memberSlice.actions;

export default memberSlice.reducer;
