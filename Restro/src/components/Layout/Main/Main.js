import { useSelector, useDispatch } from "react-redux";
import { setLocationPicker } from "../../../redux/slices/address/addressSlice";
import Card1 from "../../Res/Cards/Card1/Card1";
import Card2 from "../../Res/Cards/Card2/Card2";
import Card4 from "../../Res/Cards/Card4/Card4";
import Card3 from "../../Res/Cards/Card3/Card3";
import Card1Su from "../../Res/Cards/Card1/Shimmer/Card1Su";
import Card2Su from "../../Res/Cards/Card2/Shimmer/Card2Su";
import Card3Su from "../../Res/Cards/Card3/Shimmer/Card3Su";
import Card4Su from "../../Res/Cards/Card4/Shimmer/Card4Su";
import "./Main.css"


const Main = () => {
  const dispatch = useDispatch();
  const { ResLoading, Card1Data, Card2Data, ResCardData, Card4Data } = useSelector((store) => store.res);
  return (
    ResLoading ? (
      <div className="main">
        <Card1Su />
        <Card2Su />
        <Card3Su />
        <Card4Su />
      </div>
    ) : ResCardData ? (
      <div className="main">
        {Card1Data && <Card1 />}
        {Card2Data && <Card2 />}
        {ResCardData && <Card3 />}
        {Card4Data.length !== 0 && <Card4 />}
      </div>
    ) : (
      <div className="restaurantUnavail">
        <div className="UnavailMsg">
          <h1>Unserviceable</h1>
          <h2>Not serving your area right now :(</h2>
        </div>
        <div className="UnavailFix">
          <h2>Please try a different location</h2>
          <button
            onClick={() => {
              dispatch(setLocationPicker(true));
            }}
          >
            Update Location
          </button>
        </div>
      </div>
    )
  );
};

export default Main;
