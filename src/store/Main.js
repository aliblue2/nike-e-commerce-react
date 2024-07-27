import { configureStore } from "@reduxjs/toolkit";
import CartStore from "./CartStore";

const store = configureStore({
  reducer: {
    cart: CartStore,
  },
});

export default store;
