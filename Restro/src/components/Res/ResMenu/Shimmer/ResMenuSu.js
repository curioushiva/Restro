import "./ResMenuSu.css"
const ResMenuSU = () => {
    return (
        <div className="su-ResMenu">
            <div className="su-ResMenu-1">
                <h2></h2>
                <h1></h1>
            </div>
            <div className="su-ResMenu-2">
                <div className="su-ri2-title">
                    <h1></h1>
                </div>
                <div className="su-ri2-info">
                    <div className="su-info-1">
                    </div>
                    <div className="su-info-2">
                    </div>
                    <div className="su-info-3">
                    </div>
                </div>
            </div>
            <div className="su-ResMenu-3">
                <div className="su-ri3-title">
                    <h1></h1>
                </div>
                <div className="su-ri3-deal">

                    {Array.from({ length: 3 }).map((val, id) => {
                        return (
                            <div className="su-deals" key={id}>
                                <div className="su-deals-l">
                                    <img />
                                </div>
                                <div className="su-deals-r">
                                    <h1></h1>
                                    <h2></h2>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
            <div className="su-ResMenu-4">
                <div className="su-ri4-menu">
                    <h2></h2>
                </div>
                <div className="su-ri4-CTG">
                    <div className="su-CTG-Wrapper">
                        {Array.from({ length: 5 }).map((val, id) => {
                            return (
                                <div className="su-CTGW-1" key={id}>
                                    <h2></h2>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ResMenuSU;