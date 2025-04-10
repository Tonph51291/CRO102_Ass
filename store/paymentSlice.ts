import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: string;
  stock: number;
  type: string;
};
export type CartItem = {
  product: Product;
  quantity: number;
};
interface CartState {
  products: CartItem[];
}
const initialState: CartState = {
  products: [],
};
const cartSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addProductToPayment: (state, action: PayloadAction<CartItem[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addProductToPayment } = cartSlice.actions;
export default cartSlice.reducer;
