import { BASE_URL } from "@/repository/baseURL";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

type DeleteProductParams = {
  userId: string;
  productId: string;
};
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

export const deleteProductToCartByProductId = createAsyncThunk(
  "cart/deleteProductToCartByProductId",
  async ({ userId, productId }: DeleteProductParams, { rejectWithValue }) => {
    try {
      // Lấy giỏ hàng hiện tại
      const res = await axios.get(`${BASE_URL}/cart?userId=${userId}`);
      const cart = res.data[0]; // giả sử có duy nhất 1 cart

      if (!cart) {
        return rejectWithValue("Không tìm thấy giỏ hàng.");
      }

      // Lọc ra các cart item KHÔNG có product.id trùng
      const updatedItems = cart.cart.filter(
        (item: CartItem) => item.product.id !== productId
      );

      // Gửi request PUT để cập nhật lại giỏ hàng
      const updatedCart = {
        ...cart,
        cart: updatedItems,
      };

      const updateRes = await axios.put(
        `${BASE_URL}/cart/${cart.id}`,
        updatedCart
      );

      return updateRes.data;
    } catch (error) {
      return rejectWithValue("Xóa sản phẩm khỏi giỏ hàng thất bại.");
    }
  }
);

export const deleteProductToCart = createAsyncThunk(
  "cart/deleteProductToCart",
  async (products: CartItem[], { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = state.user.id;

      // Lấy giỏ hàng hiện tại của user
      const res = await axios.get(`${BASE_URL}/cart?userId=${userId}`);
      const cart: Cart = res.data[0]; // giả sử 1 giỏ hàng duy nhất

      if (!cart) {
        return rejectWithValue("Không tìm thấy giỏ hàng.");
      }

      // Lọc ra các item KHÔNG nằm trong danh sách thanh toán
      const remainingCartItems = cart.cart.filter(
        (item: CartItem) =>
          !products.some((paidItem) => paidItem.product.id === item.product.id)
      );

      // Cập nhật lại tổng số lượng
      const totalQuantity = remainingCartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      // Tạo cart mới
      const updatedCart = {
        ...cart,
        cart: remainingCartItems,
        quantity: totalQuantity,
      };

      // Gửi PUT request để cập nhật giỏ hàng
      const updateRes = await axios.put(
        `${BASE_URL}/cart/${cart.id}`,
        updatedCart
      );

      return updateRes.data;
    } catch (error: any) {
      return rejectWithValue(
        "Không thể xóa sản phẩm khỏi giỏ hàng sau khi thanh toán"
      );
    }
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
      })
      .addCase(deleteProductToCart.fulfilled, (state, action) => {
        const updatedCart = action.payload;
        const index = state.carts.findIndex(
          (cart) => cart.id === updatedCart.id
        );
        if (index !== -1) {
          state.carts[index] = updatedCart;
        }
      })
      .addCase(deleteProductToCartByProductId.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteProductToCartByProductId.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.loading = false;
          const updatedCart = action.payload;
          const index = state.carts.findIndex(
            (cart) => cart.id === updatedCart.id
          );
          if (index !== -1) {
            state.carts[index] = updatedCart;
          }
        }
      )
      .addCase(deleteProductToCartByProductId.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Xóa sản phẩm khỏi giỏ hàng thất bại";
      });
  },
});
export default cartSlide.reducer;
