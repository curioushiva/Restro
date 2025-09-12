import { createSlice } from "@reduxjs/toolkit";

const resSlice = createSlice({
  name: "res",
  initialState: {
    ResLoading: true,
    RegionName: "",
    CompleteResData: [],
    Card1Data: [],
    Card2Data: [],
    Card4Data: [],
    Card4SlicedData: [],
    IsCard4DataType: false,
    OriResCardData: [],
    ResCardData: [],
    ResNewLat: null,
    ResNewLng: null,
    ResLoadedOnce: false,
    ResNewLocation: "auto",
  },
  reducers: {
    setResLoading: (state, action) => {
      state.ResLoading = action.payload;
    },
    SetRegionName: (state, action) => {
      state.RegionName = action.payload;
    },
    setResNewLat: (state, action) => {
      state.ResNewLat = action.payload;
    },
    setResNewLng: (state, action) => {
      state.ResNewLng = action.payload;
    },
    setCompleteResData: (state, action) => {
      state.CompleteResData = action.payload;
    },
    setCard1Data: (state, action) => {
      state.Card1Data = action.payload;
    },
    setCard2Data: (state, action) => {
      state.Card2Data = action.payload;
    },
    setCard4Data: (state, action) => {
      state.Card4Data = action.payload;
    },
    setCard4SlicedData: (state, action) => {
      state.Card4SlicedData = action.payload;
    },
    setIsCard4DataType: (state, action) => {
      state.IsCard4DataType = action.payload;
    },
    setOriResCardData: (state, action) => {
      state.OriResCardData = action.payload;
    },
    setResCardData: (state, action) => {
      state.ResCardData = action.payload;
    },
    setResLoadedOnce: (state, action) => {
      state.ResLoadedOnce = action.payload;
    },
    setResNewLocation: (state, action) => {
      state.ResNewLocation = action.payload;
    },
  },
});

export const {
  setResLoading,
  SetRegionName,
  setResNewLat,
  setResNewLng,
  setCompleteResData,
  setCard1Data,
  setCard2Data,
  setCard4Data,
  setCard4SlicedData,
  setIsCard4DataType,
  setOriResCardData,
  setResCardData,
  setResLoadedOnce,
  setResNewLocation,
} = resSlice.actions;
export default resSlice.reducer;
