import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../types/screen";
const initialState: OrdersPageState = {
  pausedOrders: [],
  processOrders: [],
  finishedOrders: [],
};
const ordersPageSlice = createSlice({
  name: "ordersPage",
  initialState,
  reducers: {
    setPauseorders: (state, action) => {
      state.pausedOrders = action.payload;
    },

    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },

    setFinishedorders: (state, action) => {
      state.finishedOrders = action.payload;
    },
  },
});
export const { setFinishedorders, setPauseorders, setProcessOrders } =
  ordersPageSlice.actions;
const OrderPageReducer = ordersPageSlice.reducer;
export default OrderPageReducer;
