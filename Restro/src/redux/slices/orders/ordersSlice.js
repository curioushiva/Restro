import { createSlice, isImmutableDefault } from "@reduxjs/toolkit";
const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        immutableOrderItemsList: [],
        orderItemsList: [],
    },
    reducers: {
        setImmutableOrderItemsList: (state, action) => {
            state.immutableOrderItemsList.push(action.payload);
        },
        removeImmutableOrderItemsList: (state) => {
            state.immutableOrderItemsList = [];
        },
        setOrderItemsList: (state, action) => {
            state.orderItemsList.push(action.payload);
        },
        removeOrderItemsList: (state) => {
            state.orderItemsList = [];
        },
    }
})

export const { setImmutableOrderItemsList, removeImmutableOrderItemsList, setOrderItemsList, removeOrderItemsList } = ordersSlice.actions;
export default ordersSlice.reducer;