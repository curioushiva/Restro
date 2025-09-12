import { useDispatch, useSelector } from "react-redux";
import { setIsCard4DataType } from "../../../../redux/slices/res/resSlice";
import { setLocationPicker } from "../../../../redux/slices/address/addressSlice";
import { setPlace, setShowSelectedPlace } from "../../../../redux/slices/location/locationSlice";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "@remixicon/react";
import { useState, useEffect } from "react";
import "./Card4.css"

const Card4 = () => {
    const dispatch = useDispatch();
    const { Card4Data, Card4SlicedData, IsCard4DataType } = useSelector(
        (store) => store.res
    );
    const [Card4DataType, setCard4DataType] = useState([]);

    useEffect(() => {
        setCard4DataType(Card4SlicedData);
    }, [Card4Data, Card4SlicedData]);

    return (
        <div className="card4">
            <div className="heading">
                <h1>Best Places to Eat Across Cities</h1>
            </div>
            <div className="exploreres">
                {Card4DataType?.map((val, idx) => {
                    const { text } = val;
                    return (
                        <div
                            className="explore1"
                            onClick={() => {
                                dispatch(setShowSelectedPlace(false));
                                dispatch(setPlace(text?.split(" ")?.[3]));
                                dispatch(setLocationPicker(true));
                            }}
                            key={idx}
                        >
                            <h1>{text}</h1>
                        </div>
                    );
                })}
                {IsCard4DataType ? (
                    <div
                        className="explore2"
                        onClick={() => {
                            setCard4DataType(Card4SlicedData);
                            dispatch(setIsCard4DataType(false));
                        }}
                    >
                        <h1>Show Less</h1>
                        <RiArrowDropUpLine />
                    </div>
                ) : (
                    <div
                        className="explore2"
                        onClick={() => {
                            setCard4DataType(Card4Data);
                            dispatch(setIsCard4DataType(true));
                        }}
                    >
                        <h1>Show More</h1>
                        <RiArrowDropDownLine />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card4;
