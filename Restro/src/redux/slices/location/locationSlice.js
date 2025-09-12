import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    Place: "",
    PlaceData: [],
    GeoPlace: "",
    SelectedPlace: "",
    IsPlaceSelected: false,
    ShowSelectedPlace: false
  },
  reducers: {
    setPlace: (state, action) => {
      state.Place = action.payload;
    },
    setPlaceData: (state, action) => {
      state.PlaceData = action.payload;
    },
    setGeoPlace: (state, action) => {
      state.GeoPlace = action.payload;
    },
    setSelectedPlace: (state, action) => {
      state.SelectedPlace = action.payload;
    },
    setIsPlaceSelected: (state, action) => {
      state.IsPlaceSelected = action.payload;
    },
    setShowSelectedPlace: (state, action) => {
      state.ShowSelectedPlace = action.payload;
    },
  },
});

export const { setPlace, setPlaceData, setGeoPlace, setSelectedPlace, setIsPlaceSelected, setShowSelectedPlace } = locationSlice.actions;
export default locationSlice.reducer;
