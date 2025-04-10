import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productReduces";
import userReducer from "./useSlice";
import cartReduce from "./cartSlice";
import paymentReduce from "./paymentSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReduce,
    payment: paymentReduce,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
