// redux/storeSlices.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,  // Initially, the user is null or can be set to an empty object
  cartProductCount: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    setCartProductCount: (state, action) => {
      state.cartProductCount = action.payload;
    },
  },
});

export const { setUser, setCartProductCount } = userSlice.actions;

export default userSlice.reducer;
