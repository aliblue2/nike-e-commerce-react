import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart_items: [],
  payable_price: 0,
  shipping_cost: 0,
  total_price: 0,
};
const cartStore = createSlice({
  initialState,
  name: "Cart",
  reducers: {
    addToCart(state, action) {
      const existinItem = state.cart_items.findIndex(
        (item) => item.cart_item_id === action.payload.id
      );
      if (existinItem >= 0) {
        state.cart_items[existinItem].count += 1;
        state.payable_price += action.payload.product.price;
      } else {
        state.cart_items.push({
          cart_item_id: action.payload.id,
          product: { ...action.payload.product },
          count: 1,
        });
        state.payable_price += action.payload.product.price;
      }
    },
    changeCountitem(state, action) {
      const targetitem = state.cart_items.findIndex(
        (item) => item.cart_item_id === action.payload.id
      );

      if (targetitem >= 0) {
        state.cart_items[targetitem].count = action.payload.count;
      }
      if (action.payload.flag === "plus") {
        state.payable_price += state.cart_items[targetitem].product.price;
      } else {
        state.payable_price -= state.cart_items[targetitem].product.price;
      }
    },

    removeFromCart(state, action) {
      const targetIndex = state.cart_items.findIndex((item) => {
        return item.cart_item_id === action.payload;
      });

      state.payable_price -=
        state.cart_items[targetIndex].product.price *
        state.cart_items[targetIndex].count;
      state.cart_items.splice(targetIndex, 1);
    },

    replaceCartItems(state, action) {
      state.cart_items = action.payload.cart_items;
      state.payable_price = action.payload.payable_price;
      state.shipping_cost = action.payload.shipping_cost;
      state.total_price = action.payload.total_price;
    },
  },
});

export default cartStore.reducer;
export const cartActions = cartStore.actions;
