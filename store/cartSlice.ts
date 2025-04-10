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

export type Cart = {
  id: string;
  uid: string;
  cart: CartItem[]; // Mỗi sản phẩm có số lượng riêng
  quantity: number; // Tổng số lượng tất cả sản phẩm
};

export type CartState = {
  carts: Cart[];
  loading: boolean;
  error: string | null;
};
const initialState: CartState = {
  carts: [],
  loading: false,
  error: null,
};
export const getCartById = createAsyncThunk(
  "cart/getCartById",
  async (uid: string) => {
    const response = await axios.get(`${BASE_URL}/cart?uid=${uid}`);
    console.log("cart co ", response.data.length);
    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item: Cart) => {
    const response = await axios.post(`${BASE_URL}/cart`, item);
    return response.data;
  }
);
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (
    { id, cartData }: { id: string; cartData: Cart },
    { rejectWithValue }
  ) => {
    console.log(`${BASE_URL}/cart/${id}`);
    try {
      const response = await axios.put(`${BASE_URL}/cart/${id}`, cartData);
      console.log("Response từ API khi update cart:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Lỗi khi update cart:", error);
      return rejectWithValue(error.response?.data || "Đã xảy ra lỗi");
    }
  }
);

export const cartSlide = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getCartById.fulfilled,
        (state, action: PayloadAction<Cart[]>) => {
          state.loading = false;
          state.carts = action.payload;
        }
      )
      .addCase(getCartById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })
      .addCase(addToCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<Cart[]>) => {
        console.log("payload", action.payload);
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add item to cart";
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        console.log("Tổng số lượng sau khi update:", action.payload);

        state.loading = false;
        const index = state.carts.findIndex(
          (cart) => cart.id === action.payload.id
        );
        if (index !== -1) {
          state.carts[index] = action.payload;
        }
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update cart";
      });
  },
});
export default cartSlide.reducer;
