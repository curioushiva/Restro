import { RiPriceTag3Fill } from "@remixicon/react"
import { ResItemsImgUrl } from "../../../../utils/ConstData"
import { useDispatch } from "react-redux"
import { addItem, removeItem } from "../../../../redux/slices/cart/cartSlice"
import { VegIcon } from "../../../../utils/ConstData"
import { nonVegIcon } from "../../../../utils/ConstData"
import { useState } from "react"
import "./ResMenuItem.css"


const ResMenuItem = ({ singleMenuItem, sla, availability }) => {

    const { itemAttribute, name, price, defaultPrice, finalPrice, offerTags, description, imageId } = singleMenuItem;
    const dispatch = useDispatch()

    const [itemCount, setitemCount] = useState(0)
    const addItemsOnClick = (count) => {
        if (count === 1) {
            setitemCount(prev => prev + 1);
        } else if (count === 0) {
            setitemCount(prev => Math.max(prev - 1, 0));
        }
    }

    return (
        <div className="CTG2-Items">
            <div className="CTG2I-L">
                <img src={itemAttribute?.vegClassifier === "NONVEG" ? nonVegIcon : VegIcon} />
                <h1>{name}</h1>
                <h2>
                    ₹ {(price ?? finalPrice ?? defaultPrice) / 100}
                    {offerTags?.[0]?.title && (
                        <div className="CTG2I-L-offer">
                            <RiPriceTag3Fill />
                            <span>
                                {offerTags[0]?.title + " " + (offerTags[0]?.subTitle ?? "")}
                            </span>
                        </div>
                    )}
                </h2>
                <p>{description}</p>
            </div>
            <div className="CTG2I-R">
                <div className="CTG2IR-Cont">
                    {imageId ? (
                        <img src={ResItemsImgUrl + imageId} />
                    ) : (
                        <div className="CTG2IR-Cont-noImg"></div>
                    )}

                    {(availability?.opened ?

                        (itemCount === 0 ?
                            <div className="addCustom-1" onClick={() => { addItemsOnClick(1); dispatch(addItem(singleMenuItem));}}>
                                <h1>Add</h1>
                            </div>
                            :
                            <div className="addCustom-2">
                                <button onClick={() => { addItemsOnClick(0); dispatch(removeItem(singleMenuItem)); }}>-</button>
                                <h1>{itemCount}</h1>
                                <button onClick={() => { addItemsOnClick(1); dispatch(addItem(singleMenuItem)); }}>+</button>
                            </div>)
                        : null)}
                </div>

            </div>
        </div>
    )
}

export default ResMenuItem;