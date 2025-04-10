import { BASE_URL } from "@/repository/baseURL";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data; // Trả về danh sách sản phẩm
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Lỗi khi fetch sản phẩm");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [] as Product[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
