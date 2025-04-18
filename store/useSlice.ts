// src/redux/userSlice.ts
import { BASE_URL } from "@/repository/baseURL";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData: any) => {
    try {
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
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData: UserState) => {
    console.log(userData.id);
    try {
      const response = await axios.put(
        `${BASE_URL}/users/${userData.id}`,
        userData
      );
      return response.data;
    } catch (error: any) {
      console.error("Update user failed", error);
      throw error;
    }
  }
);

// Cập nhật kiểu dữ liệu ban đầu của state
interface UserState {
  id: string;
  uid: string;
  name: string;
  email: string;
  soDienThoai: string;
  diaChi?: string;
}

// Cập nhật với giá trị mặc định là đối tượng rỗng
const initialState: UserState = {
  id: "",
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
      )
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          console.log("Cập nhật người dùng thành công", action.payload);
          return action.payload;
        }
      );
  },
});
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
