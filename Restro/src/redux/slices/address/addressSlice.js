import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    LocationPicker: false,
    usersHome: "",
    AddressLine2: "",
    finalAddress: "",
  },
  reducers: {
    setLocationPicker: (state, action) => {
      state.LocationPicker = action.payload;
    },
    setUsersHome: (state, action) => {
      state.usersHome = action.payload;
    },
    setAddressLine2: (state, action) => {
      state.AddressLine2 = action.payload;
    },
    setFinalAddress: (state, action) => {
      state.finalAddress = action.payload;
    },
  },
});

export const {
  setLocationPicker,
  setUsersHome,
  setAddressLine2,
  setFinalAddress,
} = addressSlice.actions;
export default addressSlice.reducer;
