import { createSlice } from '@reduxjs/toolkit';

export const memberSlice = createSlice({
  name: 'member',
  initialState: {
    modalStatus: false,
    addressInfo: {
      member_postal: '',
      member_addr1: '',
    },
  },
  reducers: {
    setModalStatus(state, action) {
      state.modalStatus = action.payload;
    },
    setAddressInfo(state, action) {
      const { member_postal, member_addr1 } = action.payload;
      state.addressInfo = {
        member_postal,
        member_addr1,
      };
    },
  },
});

export const { setModalStatus, setAddressInfo } = memberSlice.actions;

export default memberSlice.reducer;