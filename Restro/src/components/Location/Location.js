import { BsX, BsGeo } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  setPlace,
  setPlaceData,
  setGeoPlace,
  setSelectedPlace,
  setIsPlaceSelected,
  setShowSelectedPlace,
} from "../../redux/slices/location/locationSlice";
import "./Location.css";

import {
  setLocationPicker,
} from "../../redux/slices/address/addressSlice";

const Location = () => {
  const { Place, PlaceData, SelectedPlace, ShowSelectedPlace } = useSelector(
    (store) => store.location
  );
  const { LocationPicker } = useSelector((store) => store.address);
  const dispatch = useDispatch();

  return LocationPicker ? (
    <div className="locationCont">
      <div className="locChild-1">
        <div className="locWrapper">
          <div className="lc-1">
            <BsX onClick={() => dispatch(setLocationPicker(false))} />
          </div>
          <div className="lc-2">
            <input
              placeholder="Search Location"
              value={Place}
              onChange={(e) => {
                const value = e.target.value;
                dispatch(setPlace(value));
                if (value === "") {
                  dispatch(setPlaceData([]));
                  { SelectedPlace && dispatch(setShowSelectedPlace(true)); }
                } else {
                  dispatch(setShowSelectedPlace(false));
                }
              }}
            />
            <button
              onClick={() => {
                dispatch(setPlace(""));
                dispatch(setPlaceData([]));
                { SelectedPlace && dispatch(setShowSelectedPlace(true)); }
              }}
            >
              <h3>Clear</h3>
            </button>
          </div>
          <div className="lc-3">
            {ShowSelectedPlace ? (
              <div className="mainLoc mainLocAfter">
                <div className="loc-1">
                  <BsGeo />
                </div>
                <div className="loc-2">
                  <h1>{SelectedPlace?.structured_formatting?.main_text}</h1>
                  <h2>
                    {SelectedPlace?.structured_formatting?.secondary_text}
                  </h2>
                </div>
              </div>
            ) : (
              PlaceData.map((val, idx) => {
                const { structured_formatting } = val;
                return (
                  <div
                    key={idx}
                    className="mainLoc"
                    onClick={() => {
                      dispatch(setGeoPlace(val));
                      dispatch(setPlaceData([]));
                      dispatch(setSelectedPlace(val));
                      dispatch(setIsPlaceSelected(true));
                      dispatch(setShowSelectedPlace(true));
                    }}
                  >
                    <div className="loc-1">
                      <BsGeo />
                    </div>
                    <div className="loc-2">
                      <h1>{structured_formatting?.main_text}</h1>
                      <h2>{structured_formatting?.secondary_text}</h2>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div
        className="locChild-2"
        onClick={() => dispatch(setLocationPicker(false))}
      ></div>
    </div>
  ) : null;
};

export default Location;
