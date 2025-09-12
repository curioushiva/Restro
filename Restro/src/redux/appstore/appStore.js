import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "../slices/cart/cartSlice"
import addressReducer from "../slices/address/addressSlice";
import resReducer from "../slices/res/resSlice"
import accountReducer from "../slices/account/accountSlice"
import ordersReducer from "../slices/orders/ordersSlice"
import locationReducer from "../slices/location/locationSlice"

const appStore = configureStore({
    reducer: {
        cart: cartReducer,
        address: addressReducer,
        res: resReducer,
        account: accountReducer,
        orders: ordersReducer,
        location: locationReducer
    },
});

export default appStore;