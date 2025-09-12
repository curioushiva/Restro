import {
  createSlice,
} from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    detailsType: "signup",
    userName: "",
    email: "",
    pass: "",
    isAddressAdded: false,
    isLoggedIn: false,
  },
  reducers: {
    setDetailsType: (state, action) => {
      state.detailsType = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setImmutableEmail: (state, action) => {
      state.immutableEmail = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPass: (state, action) => {
      state.pass = action.payload;
    },
    setIsAddressAdded: (state, action) => {
      state.isAddressAdded = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  setDetailsType,
  setUserName,
  setEmail,
  setPass,
  setIsAddressAdded,
  setIsLoggedIn,
} = accountSlice.actions;
export default accountSlice.reducer;
