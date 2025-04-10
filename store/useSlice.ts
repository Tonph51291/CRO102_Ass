// src/redux/userSlice.ts
import { BASE_URL } from "@/repository/baseURL";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Tạo một async thunk để gọi API đăng ký người dùng
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData: any) => {
    try {
      // Gọi API để đăng ký người dùng
      const response = await axios.post(`${BASE_URL}/users`, userData);
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);
export const getUser = async (uid: string) => {
  try {
    // Gửi yêu cầu để lấy thông tin người dùng từ API
    const response = await axios.get(`${BASE_URL}/users?uid=${uid}`);

    return response.data[0];
  } catch (error: any) {
    console.log(error);
    throw new Error("Get user failed");
  }
};

// Cập nhật kiểu dữ liệu ban đầu của state
interface UserState {
  uid: string;
  name: string;
  email: string;
  soDienThoai: string;
  diaChi?: string;
}

// Cập nhật với giá trị mặc định là đối tượng rỗng
const initialState: UserState = {
  uid: "",
  name: "",
  email: "",
  soDienThoai: "",
  diaChi: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        console.log("Đang gọi API đăng ký...");
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          // Cập nhật state khi API trả về thành công
          console.log("Đăng ký thành công", action.payload);
          // Lưu thông tin người dùng vào state
          return action.payload;
        }
      );
  },
});
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
