import "./Card1Su.css"

const Card1Su = () => {
    return (
        <div className="Su-card1">
            <div className="Su-heading">
                <h1></h1>
            </div>
            <div className="Su-slider">
                <div className="Su-items">
                    {Array.from({ length: 7 }).map((val, idx) => {
                        return (
                            <div className="Su-itemimg" key={idx}>
                                <img />
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Card1Su