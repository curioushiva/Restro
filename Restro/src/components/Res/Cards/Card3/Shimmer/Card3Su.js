import { Link } from "react-router";
import "./Card3Su.css"

const Card3Su = () => {
    return (
        <div className="Su-card3">
            <div className="Su-heading">
                <h1></h1>
            </div>
            <div className="Su-actions">
                <div className="Su-actionBtns">
                    <div className="Su-filterbox">
                        <div className="Su-filterbtn">
                            <h1></h1>
                        </div>
                    </div>
                    <div className="Su-sortbox">
                        <div className="Su-sortbtn">
                            <h1></h1>
                        </div>
                    </div>
                    <div className="Su-sortbox">
                        <div className="Su-sortbtn">
                            <h1></h1>
                        </div>
                    </div>
                </div>
                <div className="Su-searchbox">
                    <input />
                    <button></button>
                </div>
            </div>
            <div className="Su-resWrap">

                {Array.from({ length: 8 }).map((val, idx) => {
                    return (
                        <Link key={idx}>
                            <div className="Su-resCards">
                                <div className="Su-res-img">
                                </div>
                                <div className="Su-res-about">
                                    <div className="Su-res-type">
                                        <h3></h3>
                                        <h3></h3>
                                    </div>
                                    <div className="Su-res-address">
                                        <h3></h3>
                                        <h3></h3>
                                    </div>
                                    <div className="Su-res-serv">
                                        <div className="Su-serv-1">
                                            <h2></h2>
                                        </div>
                                        <div className="Su-serv-2">
                                            <h2></h2>
                                        </div>
                                    </div>
                                    <div className="Su-res-offers">
                                        <div className="Su-offer-1">
                                            <h2></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}

            </div>
        </div>
    );
};

export default Card3Su;
