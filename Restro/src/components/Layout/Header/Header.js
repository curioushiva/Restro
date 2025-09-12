import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { RiArrowDropDownLine } from "@remixicon/react"
import { BsCursor } from "react-icons/bs";
import { setLocationPicker } from "../../../redux/slices/address/addressSlice";
import "./Header.css"
import logoUrl from "url:../../../assets/images/logo.png";
import cartIconUrl from "url:../../../assets/images/carticon.png";


const Header = () => {
    const storeCartItems = useSelector((store) => store.cart.items)
    const { GeoPlace } = useSelector((store) => store.location)
    const dispatch = useDispatch()
    return (
        <div className="mainheader">

            <div className="header1">
                <Link to="/">
                 <img src={logoUrl} alt="Logo" />
                </Link>
                <div className="location-1" onClick={() => {
                    dispatch(setLocationPicker(true))
                }}>
                    {GeoPlace ? <h1>{(((GeoPlace?.structured_formatting?.main_text)?.split(" "))?.slice(0 ,3))?.join(" ")}</h1> : <h1>Other</h1>}
                    <RiArrowDropDownLine />
                </div>
                <div className="location-2">
                    <BsCursor onClick={() => {
                        dispatch(setLocationPicker(true))
                    }} />
                </div>

            </div>
            <div className="header2">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/account">Account</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/cart">
                    <div className="carticon">
                        <h1>{storeCartItems.length}</h1>
                        <img src={cartIconUrl} />
                    </div>
                </Link>
            </div>

        </div>
    )
}

export default Header;