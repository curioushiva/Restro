import { Link } from 'react-router';
import { RiStarFill } from "@remixicon/react";
import { useSelector } from 'react-redux';
import { Card2ImgUrl } from '../../../../utils/ConstData';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs"
import { useRef } from 'react';
import gsap from "gsap";
import "./Card2.css"

const Card2 = () => {
    const refSlider = useRef(null);
    const { RegionName, Card2Data } = useSelector((store) => store.res);
    const leftSide = () => {
        gsap.to(refSlider.current, {
            scrollLeft: refSlider.current.scrollLeft - 300,
            duration: 0.5
        });
    };

    const rightSide = () => {
        gsap.to(refSlider.current, {
            scrollLeft: refSlider.current.scrollLeft + 300,
            duration: 0.5
        });
    };
    return (
        <div className="card2">
            <div className="heading">
                <h1>Top restaurant chains in {RegionName}</h1>
                <div className="arrowSliders">
                    <BsArrowLeftCircleFill onClick={leftSide} />
                    <BsArrowRightCircleFill onClick={rightSide} />
                </div>
            </div>
            <div className="slider" ref={refSlider}>
                <div className="items">
                    {Card2Data?.map((val) => {
                        const { name, avgRating, cuisines, areaName, sla, aggregatedDiscountInfoV3 } = val?.info;
                        return (
                            <Link to={"/restaurant/" + val?.info?.id} key={val?.info?.id}>
                                <div className="itemCont">
                                    <div className="itemimg">
                                        <img src={Card2ImgUrl + val?.info?.cloudinaryImageId} alt="" />
                                        <h1>{(aggregatedDiscountInfoV3?.header || '') + " " + (aggregatedDiscountInfoV3?.subHeader || '')}</h1>
                                    </div>
                                    <div className="iteminfo">
                                        <h2>{name?.split(/[+  =]/)?.slice(0, 3)?.join(" ")}</h2>
                                        <div className="rating">
                                            <RiStarFill />
                                            <h3>{avgRating} • {sla?.slaString}</h3>
                                        </div>
                                        <h4>{cuisines?.slice(0, 3)?.join(", ")}</h4>
                                        <h4>{(areaName?.split(","))[0]}</h4>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Card2;