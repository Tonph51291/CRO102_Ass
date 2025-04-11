import { BASE_URL } from "@/repository/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type CardBank = {
  idUser: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
};
interface BankCardState {
  cards: CardBank[];
  loading: boolean;
}

const initialState: BankCardState = {
  cards: [],
  loading: false,
};

export const fetchCardBankByUserId = createAsyncThunk(
  "bankCard/fetchByUserId",
  async (id: string) => {
    const response = await axios.get(`${BASE_URL}/cardBank?id=${id}`);
    return response.data[0];
  }
);
export const createBankCard = createAsyncThunk(
  "bankCard/createBankCard",
  async (bankCard: CardBank) => {
    const response = await axios.post(`${BASE_URL}/cardBank`, bankCard);
    return response.data;
  }
);
const bankCardSlice = createSlice({
  name: "bankCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardBankByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCardBankByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(createBankCard.fulfilled, (state, action) => {
        state.cards.push(action.payload);
      });
  },
});

export default bankCardSlice.reducer;
