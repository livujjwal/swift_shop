import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, fetchCount, updateUser, userExist } from "./authAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response;
  }
);
export const userExistAsync = createAsyncThunk(
  "auth/userExist",
  async (userData) => {
    const response = await userExist(userData);
    return response;
  }
);
export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(userExistAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userExistAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(userExistAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      });
  },
});

export const {} = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
