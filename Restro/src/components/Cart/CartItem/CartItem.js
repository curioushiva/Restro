import { ResItemsImgUrl } from "../../../utils/ConstData";
import { VegIcon } from "../../../utils/ConstData";
import { nonVegIcon } from "../../../utils/ConstData";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../../../redux/slices/cart/cartSlice";
import "./CartItem.css";

const CartItem = ({ singleMenuItem }) => {
  const dispatch = useDispatch();
  const {
    itemAttribute,
    name,
    price,
    defaultPrice,
    finalPrice,
    imageId,
    quantity,
  } = singleMenuItem;

  return (
    <div className="C-CTG2-Items">
      <div className="C-CTG2I-L">
        <img
          src={itemAttribute?.vegClassifier === "NONVEG" ? nonVegIcon : VegIcon}
        />
        <h1>{name}</h1>
        <h2> ₹ {Math.floor(((price ?? finalPrice ?? defaultPrice) / 100) * quantity)}</h2>
      </div>
      <div className="C-CTG2I-R">
        <div className="C-CTG2IR-Cont">
          {imageId ? (
            <img src={ResItemsImgUrl + imageId} />
          ) : (
            <div className="C-CTG2IR-Cont-noImg"></div>
          )}
          <div className="addCustom">
            <button onClick={() => dispatch(removeItem(singleMenuItem))}>-</button>
            <h1>{quantity}</h1>
            <button onClick={() => dispatch(addItem(singleMenuItem))}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
