import { useSelector } from 'react-redux';
import { Card1ImgUrl } from '../../../../utils/ConstData';
import gsap from "gsap";
import { useRef } from 'react';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs"
import "./Card1.css"

const Card1 = () => {
    const refSlider = useRef(null);
    const { Card1Data } = useSelector((store) => store.res);
    const { userName, isLoggedIn } = useSelector((store) => store.account);

    const leftSide = () => {
        gsap.to(refSlider.current, {
            scrollLeft: refSlider.current.scrollLeft - 200,
            duration: 0.5
        });
    };

    const rightSide = () => {
        gsap.to(refSlider.current, {
            scrollLeft: refSlider.current.scrollLeft + 200,
            duration: 0.5
        });
    };
    return (
        <div className="card1">
            <div className="heading">
                {isLoggedIn ? <h1>{userName} , what's on your mind ?</h1> : <h1>What's on your mind ?</h1>}
                <div className="arrowSliders">
                    <BsArrowLeftCircleFill onClick={leftSide} />
                    <BsArrowRightCircleFill onClick={rightSide} />
                </div>
            </div>
            <div className="slider" ref={refSlider}>
                <div className="items">
                    {Card1Data?.map((val) => {
                        const { id, imageId } = val;
                        return (
                            <div className="itemimg" key={id}>
                                <img src={`${Card1ImgUrl}${imageId}`} />
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Card1;