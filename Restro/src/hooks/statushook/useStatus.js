import { useState, useEffect } from 'react'
const useStatus = () => {

    const [onlineStauts, setonlineStatus] = useState(true)
    const checkOnline = () => {
        window.addEventListener("online", () => {
            setonlineStatus(true)
        });
        window.addEventListener("offline", () => {
            setonlineStatus(false)
        });
    }

    useEffect(() => {
        checkOnline();
    }, [])
    return onlineStauts;
}

export default useStatus;