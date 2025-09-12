import "./Offline.css"

const Offline = () => {
    return (
        <div className='offline'>

            <div className='offlinemsg'>
                <h1>Offline Mode</h1>
                <h2>We can’t fetch restaurants at the moment</h2>
                <h3>Reconnect to continue your food journey</h3>
            </div>
            <div className='offlinefix'>
                <h2>Not sure why?</h2>
                <h3>Just refresh (Ctrl + R) or try again later</h3>
            </div>

        </div>
    )
}

export default Offline