import { useState } from "react"
import { Link, useParams } from "react-router"
import { RiStarFill, RiGitCommitLine, RiArrowDropDownLine } from "@remixicon/react"
import { ResOffersImgUrl } from "../../../utils/ConstData"
import ResMenuSu from "./Shimmer/ResMenuSu"
import useResMenu from "../../../hooks/resmenuhook/useResMenu"
import { useDispatch } from "react-redux"
import { addItem } from "../../../redux/slices/cart/cartSlice"
import ResMenuItem from "./ResMenuItem/ResMenuItem"
import "./ResMenu.css"

const ResMenu = () => {
    const { resId } = useParams() 
    const [Loader, ResMenu12, ResMenu3, ResMenu4] = useResMenu(resId);
    const { name, avgRating, totalRatingsString, costForTwoMessage, cuisines, areaName, sla, availability } = ResMenu12 || {}
    const [openCategory, setOpenCategory] = useState(null);
    const handleCategoryClick = (idx) => {
        if (openCategory === idx) {
            setOpenCategory(null);
        }
        else {
            setOpenCategory(idx);
        }
    };

    const resCTGInfo = ResMenu4?.filter((val) => {
        return val?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    })


    const dispatch = useDispatch()

    const itemHandler = (menuItems) => {
        dispatch(addItem(menuItems))
    }

    return Loader ? <ResMenuSu /> : (
        <div className="ResMenu">
            <div className="ResMenu-1">
                <h2>
                    <span><Link to="/">Home</Link></span>/
                    <span>{ResMenu12?.city}</span>/
                    <span>{name}</span>
                </h2>
                <h1>{name}</h1>
            </div>
            <div className="ResMenu-2">
                <div className="ri2-title">
                    {
                        (availability?.opened ? <h1>Order Online</h1> : <h2 className="ri2-avail">Uh-oh! Outlet is not accepting orders at the moment</h2>)
                    }
                </div>
                <div className="ri2-info">
                    <div className="info-1">
                        <RiStarFill />
                        <h2>{avgRating}</h2>
                        <h2>({totalRatingsString})</h2>
                        <h2>•</h2>
                        <h2>{costForTwoMessage}</h2>
                    </div>
                    <div className="info-2">
                        <h2>{cuisines?.join(" , ")}</h2>
                    </div>
                    <div className="info-3">
                        <h2>Outlet</h2>
                        <h2>{((areaName)?.split(" ")?.slice(0, 2))?.join(" ")}</h2>
                        <h2><RiGitCommitLine /></h2>
                        {availability?.opened ? (sla?.slaString ? <h2>{sla?.slaString}</h2> : <h2>Delivering</h2>) : <h2>Closed</h2>}
                    </div>
                </div>
            </div>
            <div className="ResMenu-3">
                <div className="ri3-title">
                    <h1>Deals for you</h1>
                </div>
                <div className="ri3-deal">
                    {(ResMenu3?.slice(0, 3))?.map((val) => {
                        const { header, description, offerLogo, offerIds } = val?.info;
                        return (
                            <div className="deals" key={offerIds[0]}>
                                <div className="deals-l">
                                    <img src={ResOffersImgUrl + offerLogo} />
                                </div>

                                <div className="deals-r">
                                    <h1>{header}</h1>
                                    <h2>{description}</h2>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="ResMenu-4">
                <div className="ri4-menu">
                    <h2>Menu</h2>
                </div>
                <div className="ri4-CTG">
                    {resCTGInfo?.map((val, idx) => {
                        const menuItems = val?.card?.card?.itemCards;
                        return (
                            <div className="CTG-Wrapper" key={idx}>
                                <div className="CTGW-1" onClick={() => handleCategoryClick(idx)}>
                                    {val?.card?.card?.title ? (
                                        <h2>
                                            {val?.card?.card?.title} ({menuItems.length})
                                        </h2>
                                    ) : ""}
                                    <RiArrowDropDownLine />
                                </div>

                                {openCategory === idx && (
                                    <div className="CTGW-2">
                                        {menuItems.map((item) => {
                                            const singleMenuItem = item?.card?.info;
                                            return (
                                                <ResMenuItem singleMenuItem={singleMenuItem} sla={sla} availability={availability} key={singleMenuItem.id} />
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    )
}

export default ResMenu;