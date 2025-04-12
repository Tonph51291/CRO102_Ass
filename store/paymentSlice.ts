import { BASE_URL } from "@/repository/baseURL";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
  uid: string;
  totalPrice: number;
  createdAt?: string;
  products: CartItem[];
}
const initialState: CartState = {
  uid: "",
  totalPrice: 0,
  createdAt: "",
  products: [],
};

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (cart: CartState, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/payment`, cart);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const cartSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addProductToPayment: (state, action: PayloadAction<CartItem[]>) => {
      state.products = action.payload;
      state.totalPrice = action.payload.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
      }, 0);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPayment.fulfilled, (state, action) => {
      // Optionally, clear automatically here after success
      state.products = [];

      state.createdAt = "";
    });
  },
});

export const { addProductToPayment } = cartSlice.actions;
export default cartSlice.reducer;
