import { useEffect, useState } from "react"
import { ResMenuFtechurl } from '../../utils/ConstData'
import { useSelector } from "react-redux"

const useResMenu = (resId) => {
    const { ResNewLat, ResNewLng } = useSelector((store) => store.res);
    const [Loader, setLoader] = useState(true)
    const [ResMenu12, setResMenu12] = useState([])
    const [ResMenu3, setResMenu3] = useState([])
    const [ResMenu4, setResMenu4] = useState([])

    const fetchResMenu = async () => {
        if (ResNewLat && ResNewLng) {
            const data = await fetch(`${ResMenuFtechurl}page-type=REGULAR_MENU&complete-menu=true&lat=${ResNewLat}&lng=${ResNewLng}&restaurantId=${resId}&submitAction=CONFI`)
            const json = await data.json()
            const ResMenuCard12 = json?.data?.cards?.[2]?.card?.card?.info
            setResMenu12(ResMenuCard12)
            const ResMenuCard3 = json?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers
            setResMenu3(ResMenuCard3)
            const ResMenuCard4 = json?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
            setResMenu4(ResMenuCard4)
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchResMenu();
    }, [ResNewLat, ResNewLng])
    return ([Loader, ResMenu12, ResMenu3, ResMenu4])
}

export default useResMenu;