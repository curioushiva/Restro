import { useSelector } from "react-redux";
import { nonVegIcon, VegIcon } from "../../utils/ConstData";
import { RiGitCommitLine } from "@remixicon/react";
import html2canvas from "html2canvas";
import { Link } from "react-router";
import "./Orders.css"

const Orders = () => {
  const { orderItemsList } = useSelector((store) => store.orders);
  const { isOdered } = useSelector((store) => store.cart);

  const handleSnap = async (index) => {
    const element = document.getElementById(`order-${index}`);
    if (!element) return;

    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#0f0f0f",
      scale: 4,
    });

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `order-${index + 1}.png`;
    link.click();
  };


  return isOdered ? (
    <div className="orders">
      <div className="order-1">
        <div className="heading">
          <h1>Orders</h1>
        </div>
      </div>

      <div className="order-2">
        {orderItemsList.map((value, index) => {
          const { orderId, orderTotal, orderDate, orderItems } = value;
          return (
            <div className="orderDetails" id={`order-${index}`} key={index}>
              <div className="OD-L">
                <div className="ODL-heading">
                  <h1>Items</h1>
                </div>

                <div className="itemsOdered">
                  <div className="inneritemsOdered">
                    {orderItems.map((val, idx) => {
                      const {
                        itemAttribute,
                        price,
                        defaultPrice,
                        finalPrice,
                        quantity,
                        name,
                      } = val;
                      return (
                        <div className="iteminfo" key={idx}>
                          <div className="aboutitem">
                            <img
                              src={
                                itemAttribute?.vegClassifier === "NONVEG"
                                  ? nonVegIcon
                                  : VegIcon
                              }
                              alt="food-icon"
                            />
                            <h1>{quantity} x</h1>
                            <h1>
                              {(name ?? "").split(" ").slice(0, 3).join(" ")}
                            </h1>
                          </div>
                          <div className="aboutitemprice">
                            <h1>
                              ₹{" "}
                              {Math.floor(
                                ((price ?? finalPrice ?? defaultPrice) / 100) *
                                quantity
                              )}
                            </h1>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="OD-R">
                <div className="ODR-heading">
                  <h1>Bill</h1>
                </div>

                <div className="itemsbill">
                  <div className="ordernum">
                    <span>
                      <h1>Order Number {index + 1}</h1>
                    </span>
                    <h2>{orderDate}</h2>
                  </div>

                  <div className="orderid">
                    <h1>Order Id</h1>
                    <h1>{orderId}</h1>
                  </div>

                  <div className="ordertotal">
                    <h1>Items Total</h1>
                    <h1>{orderTotal}</h1>
                  </div>

                  {value?.orderDelTime && value.orderDelTime !== "undefined" ? (
                    <div className="deltime">
                      <h1>Delivery Time</h1>
                      <h1>{value.orderDelTime}</h1>
                    </div>
                  ) : (value?.orderDelTime &&
                    <div className="deltime">
                      <h1>Delivery Time</h1>
                      <h1>TBD</h1>
                    </div>)}

                  {value?.orderStatus && (<div className="orderstatus">
                    <h1>Status</h1>
                    <RiGitCommitLine />
                    <h1>{value?.orderStatus}</h1>
                  </div>)}

                  <div className="downloadBill">
                    <button onClick={() => handleSnap(index)}>
                      Download Bill
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="O-orderCont">
      <div className="O-orderWrapper">
        <h1>No orders yet ?</h1>
        <h2>Start your feast now</h2>
        <Link to="/">
          <button>Order Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Orders;
