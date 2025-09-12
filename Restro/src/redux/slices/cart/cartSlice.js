import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        forDelTime: [],
        isCODCheck: false,
        isOdered: false
    },
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => { return i.id === item.id })
            if (existingItem) {
                existingItem.quantity = existingItem.quantity + 1
            } else {
                state.items.push({ ...item, quantity: 1 })
            }
        },
        removeItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => { return i.id === item.id })
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity = existingItem.quantity - 1

                } else {
                    state.items = state.items.filter((val) => { return val.id !== item.id })
                }
            }

        },
        clearCart: (state) => {
            state.items.length = 0;
        },
        setIsCODCheck: (state, action) => {
            state.isCODCheck = action.payload
        },
        setForDelTime: (state, action) => {
            state.forDelTime = action.payload
        },
        setIsOdered: (state, action) => {
            state.isOdered = action.payload
        }
    }
});

export const { addItem, removeItem, clearCart, setIsCODCheck, setForDelTime, setIsOdered } = cartSlice.actions;
export default cartSlice.reducer;