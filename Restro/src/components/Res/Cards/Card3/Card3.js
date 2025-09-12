import { RiSearchLine, RiEqualizer2Line, RiGitCommitLine, RiArrowDropDownLine, RiStarFill, RiDiscountPercentFill, RiDoorOpenLine, RiHourglassLine } from "@remixicon/react";
import { Link } from 'react-router';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResCardData } from '../../../../redux/slices/res/resSlice';
import { setForDelTime } from "../../../../redux/slices/cart/cartSlice";
import { ResImgURL } from "../../../../utils/ConstData";
import "./Card3.css"


const Card3 = () => {
    const dispatch = useDispatch()
    const { RegionName, Card4Data, ResCardData, OriResCardData } = useSelector((store) => store.res);

    const [resSearch, setresSearch] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [isCard4Data, setisCard4Data] = useState("card3")

    const pricefilterLH = () => {
        const filterList = [...ResCardData].sort((a, b) => a.info.costForTwo.slice(1, 4) - b.info.costForTwo.slice(1, 4));
        dispatch(setResCardData(filterList));
    }

    const pricefilterHL = () => {
        const filterList = [...ResCardData].sort((a, b) => b.info.costForTwo.slice(1, 4) - a.info.costForTwo.slice(1, 4));
        dispatch(setResCardData(filterList));
    }

    const ratingfilter = () => {
        const filterList = [...ResCardData].sort((a, b) =>
            b.info.avgRating - a.info.avgRating
        );
        dispatch(setResCardData(filterList));
    }

    const clearAllfilter = () => {
        dispatch(setResCardData(OriResCardData));
    }

    useEffect(() => {
        Card4Data.length === 0 ? setisCard4Data(isCard4Data) : setisCard4Data("card3 isCard4Data")
    })

    return (
        <div className={isCard4Data}>
            <div className="heading">
                <h1>Restaurants with online food delivery in {RegionName}</h1>
            </div>
            <div className="actions">
                <div className="actionBtns">
                    <div className="filterbox">
                        <div className="filterbtn"
                            onClick={() => { setShowSort(false); setShowFilter(!showFilter); }}>
                            <RiEqualizer2Line />
                            <h1>Filter</h1>
                        </div>
                        {showFilter ?
                            <div className="filterValues">
                                <div className="f-values">
                                    <h1><span><RiGitCommitLine /> Recommended</span></h1>
                                </div>
                                <div className="f-values">
                                    <h1 onClick={ratingfilter}>Rating - High to Low</h1>
                                </div>
                                <div className="f-values">
                                    <h1 onClick={pricefilterLH}>Price - Low to High</h1>
                                </div>
                                <div className="f-values">
                                    <h1 onClick={pricefilterHL}>Price - High to Low</h1>
                                </div>
                            </div> : null
                        }
                    </div>
                    <div className="sortbox">
                        <div className="sortbtn"
                            onClick={() => { setShowFilter(false); setShowSort(!showSort); }}>
                            <RiArrowDropDownLine />
                            <h1>Sort</h1>
                        </div>
                        {showSort ?
                            <div className="sortvalues">
                                <div className="s-values">
                                    <h1 onClick={pricefilterLH}>Price - Low to High</h1>
                                </div>
                                <div className="s-values">
                                    <h1 onClick={pricefilterHL}>Price - High to Low</h1>
                                </div>
                            </div> : null
                        }
                    </div>
                    <div className="sortbox">
                        <div className="sortbtn"
                            onClick={() => { clearAllfilter(); setShowFilter(false); setShowSort(false); }}>
                            <h1>Clear All</h1>
                        </div>
                    </div>
                </div>
                <div className="searchbox">
                    <input type="text" placeholder="Search Restaurant" value={resSearch} onChange={(event) => {
                        setresSearch(event.target.value)
                    }} />
                    <button onClick={() => {
                        const filterList = OriResCardData.filter((filter) => {
                            return filter?.info?.name?.toLowerCase()?.includes(resSearch?.toLowerCase());
                        })
                        dispatch(setResCardData(filterList))
                    }}><RiSearchLine className="search-icon" /></button>
                </div>

            </div>
            <div className="resWrap">
                {ResCardData?.map((val) => {
                    const { name, avgRating, cuisines, costForTwo, areaName, sla, availability, aggregatedDiscountInfoV3 } = val?.info;
                    return (
                        <Link to={"/restaurant/" + val.info.id} key={val.info.id}>
                            <div className="resCards" onClick={() => { dispatch(setForDelTime(val)); }}>
                                <div className="res-img">
                                    <img
                                        src={ResImgURL + val?.info?.cloudinaryImageId}
                                        alt="item-img"
                                    />
                                    <div className="res-name">
                                        <h1>{name?.split(/[+  =]/)?.slice(0, 3)?.join(" ")}</h1>
                                        <div className="res-ratings">
                                            <RiStarFill className="star-icon" />
                                            <h2>{avgRating}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="res-about">
                                    <div className="res-type">
                                        <h3>{cuisines?.slice(0, 2)?.join(", ")}</h3>
                                        <h3>{costForTwo}</h3>
                                    </div>
                                    <div className="res-address">
                                        <h3>{(areaName?.split(","))[0]}</h3>
                                        <h3>{sla?.lastMileTravelString}</h3>
                                    </div>
                                    <div className="res-serv">
                                        <div className="serv-1">
                                            <RiDoorOpenLine className="cal-icon" />
                                            {availability?.opened ? <h2>Open</h2> : <h2>Close</h2>}
                                        </div>
                                        <div className="serv-2">
                                            <RiHourglassLine className="cake-icon" />
                                            <h2>{sla?.slaString}</h2>
                                        </div>
                                    </div>
                                    <div className="res-offers">

                                        {aggregatedDiscountInfoV3?.header ?
                                            <div className="offer-1">
                                                <RiDiscountPercentFill className="disc-icon" />
                                                <h2>{(aggregatedDiscountInfoV3?.header ? aggregatedDiscountInfoV3?.header : "") + " "
                                                    + (aggregatedDiscountInfoV3?.subHeader ? aggregatedDiscountInfoV3?.subHeader : "")}
                                                </h2>
                                            </div> :
                                            <div className="offer-1">
                                                <RiDiscountPercentFill className="disc-icon" />
                                                <h2>No offers at present</h2>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Link>)
                })}
            </div>
        </div>
    )
}

export default Card3;