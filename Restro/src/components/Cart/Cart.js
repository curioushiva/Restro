import { useSelector } from "react-redux";
import CartItem from "./CartItem/CartItem";
import { clearCart } from "../../redux/slices/cart/cartSlice";
import { Link } from "react-router";
import { RiMapPinLine } from "@remixicon/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import usecartTexts from "../../hooks/carthook/useCartTexts";
import { useSelector, useDispatch } from "react-redux";
import { BsPerson } from "react-icons/bs";
import { setImmutableOrderItemsList, setOrderItemsList } from "../../redux/slices/orders/ordersSlice";
import { setIsOdered, setIsCODCheck } from "../../redux/slices/cart/cartSlice";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, isCODCheck, forDelTime } = useSelector((store) => store.cart);
  const { finalAddress } = useSelector((store) => store.address);
  const { userName, isLoggedIn } = useSelector((store) => store.account);
  const [cartVibes, cartTaglines, orderPlacedVibes, thankYouVibes] = usecartTexts();

  const [ranTextOne] = useState(() => Math.floor(Math.random() * 51));
  const [ranTextTwo] = useState(() => Math.floor(Math.random() * 51));
  const [deliveryCharge] = useState(() => Math.floor(Math.random() * (50 - 30 + 1)) + 30);
  const [ranOrderNum] = useState(() => Math.floor(Math.random() * (25000 - 20000 + 1)) + 20000);

  const [isAccCSS, setisACCCSS] = useState("cartAccount");
  const [isCartEmpty, setisCartEmpty] = useState("true")

  const itemsTotalPrice = items.reduce((total, item) => { return (total + ((item.price ?? item.finalPrice ?? item.defaultPrice) / 100) * item.quantity); }, 0);
  const finalTotalPrice = Math.floor(itemsTotalPrice + deliveryCharge);
  const orderDeliveryTime = forDelTime?.info?.sla?.slaString;

  const orderPlaced = () => {
    setTimeout(() => {
      dispatch(setIsOdered(true));
      setisCartEmpty(false);
      const newOrder = {
        orderTotal: `₹${finalTotalPrice}`,
        orderId: `#${ranOrderNum}`,
        orderDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        orderDelTime: `${orderDeliveryTime}`,
        orderStatus: `Open`,
        orderItems: items
      };
      dispatch(setOrderItemsList(newOrder));
      const savedOrders = {
        orderTotal: `₹${finalTotalPrice}`,
        orderId: `#${ranOrderNum}`,
        orderDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        orderStatus: `Closed`,
        orderItems: items
      }
      dispatch(setImmutableOrderItemsList(savedOrders));
      dispatch(clearCart());
    }, 500);
  };

  return items.length === 0 ? (
    isCartEmpty ? (
      <div className="E-cartCont">
        <div className="E-cartWrapper">
          <h1>{cartVibes[ranTextOne]}</h1>
          <h2>{cartTaglines[ranTextTwo]}</h2>
          <Link to="/">
            <button>Add Items</button>
          </Link>
        </div>
      </div>
    ) : (
      <div className="E-cartCont">
        <div className="E-cartWrapper">
          <h1>Confirmation</h1>
          <h2>{orderPlacedVibes[ranTextOne]}</h2>
          <h4>{thankYouVibes[ranTextTwo]}</h4>
          <Link to="/orders"><button>Orders</button></Link>
        </div>
      </div >
    )
  ) : (
    <div className="cartCont">
      <div className="cartWrapper">
        <div className="cart-L">
          <div className="CLheading">
            <h1>Items List</h1>
          </div>
          <div className="CLitems">
            {items.map((val) => (
              <CartItem singleMenuItem={val} key={val.id} />
            ))}
          </div>
        </div>
        <div className="cart-R">
          <div className="CRheading">
            <div className="cartAcc-1"></div>
            <h1>Bill Details</h1>
          </div>
          <div className="CRitemsP">
            <div className="cartButtons">
              <button
                onClick={() => {
                  dispatch(clearCart());
                }}
              >
                Clear Cart
              </button>
              <button onClick={() => navigate(-1)}>Add Items</button>
              <button>
                <Link to="/">Explore</Link>
              </button>
            </div>
            {isLoggedIn ? (
              finalAddress ? (
                <div className="cartAccount">
                  <div className="cartAcc-1">
                    <BsPerson />
                    <h1>{userName}</h1>
                  </div>
                  <div className="cartAcc-2">
                    <RiMapPinLine />
                    <h1>{finalAddress}</h1>
                  </div>
                  <div className="cartAcc-3">
                    <RiMapPinLine />
                    <h1>Saved Address</h1>
                  </div>
                  <Link to="/account">
                    <button>Update</button>
                  </Link>
                </div>
              ) : (
                <div className={isAccCSS}>
                  <div className="cartAcc-1">
                    <BsPerson />
                    <h1>{userName}</h1>
                  </div>
                  <Link to="/account">
                    <button>Set Address</button>
                  </Link>
                </div>
              )
            ) : (
              <div className={isAccCSS}>
                <div className="cartAcc-1">
                  <BsPerson />
                  <h1>User Account</h1>
                </div>
                <Link to="/account">
                  <button>Set Account</button>
                </Link>
              </div>
            )}

            <div className="COD">
              <h1>Opt in for COD</h1>
              <div className="COD-1">
                <input
                  type="checkbox"
                  checked={isCODCheck}
                  onChange={() => dispatch(setIsCODCheck(!isCODCheck))}
                />
                {isCODCheck ? (
                  <h1>Our rider will call</h1>
                ) : (
                  <h1>Pay with Cash</h1>
                )}
              </div>
            </div>

            <div className="cartTotal">
              <div className="itemsTotal">
                <h1>Items Total</h1>
                <h1>₹ {Math.floor(itemsTotalPrice)}</h1>
              </div>
              <div className="delFee">
                <h1>Delivery Fee</h1>
                <h1>₹ {deliveryCharge}</h1>
              </div>
              <div className="totalPay">
                <div className="totalPay-I">
                  <h1>Total</h1>
                  <h1>{`₹ ${finalTotalPrice}`}</h1>
                </div>
              </div>
              {isLoggedIn ? (
                (finalAddress.length !== 0 ? (
                  <div className="orderPlace">
                    <button onClick={orderPlaced}>Place Order</button>
                  </div>
                ) : (
                  <div className="orderPlace">
                    <button
                      onClick={() => {
                        setisACCCSS("cartAccount isACCCssAccount");
                      }}
                    >
                      Place Order
                    </button>
                  </div>
                ))
              ) : (<div className="orderPlace">
                <button
                  onClick={() => {
                    setisACCCSS("cartAccount isACCCssAccount");
                  }}
                >
                  Place Order
                </button>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
