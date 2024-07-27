import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const cartStore = createSlice({
  initialState,
  name: "Cart",
  reducers: {
    addToCart(state, action) {
      const exsitingItemIndex = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (exsitingItemIndex >= 0) {
        state[exsitingItemIndex].quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    increaseQuantity(state, action) {
      const targetIndex = state.findIndex(
        (product) => product.id === action.payload
      );
      state[targetIndex].quantity += 1;
    },
    decreaseQuantity(state, action) {
      const targetIndex = state.findIndex(
        (product) => product.id === action.payload
      );
      if (state[targetIndex].quantity > 1) {
        state[targetIndex].quantity -= 1;
      }
    },

    removeFromCart(state, action) {
      const targetIndex = state.findIndex(
        (product) => product.id === action.payload
      );
      state.splice(targetIndex, 1);
    },
  },
});

export default cartStore.reducer;
export const cartActions = cartStore.actions;
