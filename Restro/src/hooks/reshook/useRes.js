import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setResLoading,
    SetRegionName,
    setCompleteResData,
    setCard1Data,
    setCard2Data,
    setCard4Data,
    setCard4SlicedData,
    setOriResCardData,
    setResCardData,
    setResNewLat,
    setResNewLng,
    setResLoadedOnce,
    setResNewLocation,
} from "../../redux/slices/res/resSlice";
import { setAddressLine2 } from "../../redux/slices/address/addressSlice";
import {
    IpinfoFetch,
    resFetch,
    resAutoComplete,
    resPlaceGeo,
} from "../../utils/ConstData";
import { setPlaceData } from "../../redux/slices/location/locationSlice";

const useRes = () => {
    const dispatch = useDispatch();
    const { Place, GeoPlace, AddressLine2 } = useSelector((store) => store.location);
    const { ResNewLat, ResNewLng, ResLoadedOnce, ResNewLocation } = useSelector((store) => store.res);

    /* 1 */
    const fetchIpinfo = async () => {
        const IpinfoAPIKey = process.env.REACT_APP_IPINFO_APIKEY;
        const data = await fetch(`${IpinfoFetch}${IpinfoAPIKey}`);
        const json = await data.json();
        const [newlat, newlng] = json?.loc?.split(",");
        dispatch(setResNewLat(newlat));
        dispatch(setResNewLng(newlng));
        dispatch(SetRegionName(json?.region));
    };

    /* 2 */
    const fetchRes = async () => {
        if (ResNewLat && ResNewLng) {
            const data = await fetch(`${resFetch}lat=${ResNewLat}&lng=${ResNewLng}`);
            const json = await data.json();
            dispatch(setCard1Data(json?.data?.cards?.[0]?.card?.card?.imageGridCards?.info));
            dispatch(setCard2Data(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants));
            dispatch(setCompleteResData(json));
            if (json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
                dispatch(setOriResCardData(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants))
                dispatch(setResCardData(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants));
                if (json?.data?.cards[6]?.card?.card?.brands) {
                    dispatch(setCard4Data(json?.data?.cards[6]?.card?.card?.brands));
                    dispatch(setCard4SlicedData(json?.data?.cards[6]?.card?.card?.brands?.slice(0, 8)));
                } else {
                    dispatch(setCard4Data([]));
                }
                dispatch(setResLoadedOnce(true));
                dispatch(setResLoading(false));
            } else if (json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
                dispatch(setOriResCardData(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants));
                dispatch(setResCardData(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants));
                dispatch(setResLoadedOnce(true));
                dispatch(setResLoading(false));
            } else if (json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
                dispatch(setOriResCardData(json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants));
                dispatch(setResCardData(json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants));
                dispatch(setResLoadedOnce(true));
                dispatch(setResLoading(false));
            } else {
                dispatch(setOriResCardData(null));
                dispatch(setResCardData(null));
                dispatch(setResLoadedOnce(true));
                dispatch(setResLoading(false));
            }
        }
    };

    /* 3 */
    const fetchPlace = async () => {
        if (!Place || Place.trim() === "") return;
        const data = await fetch(`${resAutoComplete}${Place}`);
        const json = await data.json();
        if (json?.data?.length > 0) {
            dispatch(setPlaceData(json?.data));
        }
    };

    /* 4 */
    const fetchGeoPlace = async () => {
        if (GeoPlace?.place_id === undefined) return;
        const data = await fetch(`${resPlaceGeo}${GeoPlace?.place_id}`);
        const json = await data.json();
        dispatch(setResNewLat(json?.data?.[0]?.geometry?.location?.lat));
        dispatch(setResNewLng(json?.data?.[0]?.geometry?.location?.lng));
        dispatch(setAddressLine2(json?.data?.[0]?.formatted_address));
        dispatch(setResLoadedOnce(false));
        dispatch(setResNewLocation("manual"));
        json.data?.[0]?.address_components.find((val) => {
            if (val?.types?.[0] === "city") {
                dispatch(SetRegionName(val?.long_name));
            }
        });
    };

    /* 1 */
    useEffect(() => {
        if (ResNewLocation === "auto") {
            if (ResLoadedOnce === false) {
                fetchIpinfo();
            }
        }
    }, [ResNewLocation, ResLoadedOnce]);

    /* 2 */
    useEffect(() => {
        if (ResLoadedOnce === false) {
            fetchRes();
        }
    }, [ResNewLat, ResNewLng, ResLoadedOnce]);

    /* 3 */
    useEffect(() => {
        fetchPlace();
    }, [Place]);

    /* 4 */
    useEffect(() => {
        fetchGeoPlace();
    }, [GeoPlace, AddressLine2]);

    /* 5 */
    useEffect(() => {
        dispatch(setResLoading(true));
    }, [ResNewLat, ResNewLng])

    return null;
};

export default useRes;
