import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  getItemsByUserId,
  removeItem,
  removeItemFromCart,
  updateCart,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response;
  }
);
export const getItemsByUserIdAsync = createAsyncThunk(
  "cart/getItemsByUserId",
  async (userId) => {
    const response = await getItemsByUserId(userId);
    return response;
  }
);
export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    return response;
  }
);
export const removeItemFromCartAsync = createAsyncThunk(
  "cart/removeItemFromCart",
  async (itemId) => {
    const response = await removeItemFromCart(itemId);
    return response;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(getItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (el) => el.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(removeItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (el) => el.id === action.payload.id
        );
        state.items.splice(index, 1);
      });
  },
});

export const { increment } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
