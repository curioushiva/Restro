import { Link } from "react-router";
import "./Card2Su.css"

const Card2Su = () => {
    return (
        <div className="Su-card2">
            <div className="Su-heading">
                <h1></h1>
            </div>
            <div className="Su-slider">
                <div className="Su-items">
                    {Array.from({ length: 5 }).map((val, idx) => {
                        return (
                            <Link key={idx}>
                                <div className="Su-itemCont">
                                    <div className="Su-itemimg">
                                    </div>
                                    <div className="Su-iteminfo">
                                        <h2></h2>
                                        <div className="Su-rating">
                                        </div>
                                        <h4></h4>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}

                </div>
            </div>
        </div>
    );
};

export default Card2Su;
