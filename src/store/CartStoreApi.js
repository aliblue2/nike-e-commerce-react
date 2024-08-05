import { cartActions } from "./CartStore";
import { baseurl } from "../App";
import { getAccessToken } from "../utils/Auth";
import { json, redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const addToCartDispatcher = (product) => {
  return async (dispatcher) => {
    const data = { product_id: product.id };
    const token = getAccessToken();
    if (!token || token === "EXPIERED") {
      toast.error("برای اضافه کردن محصول وارد شوید.");
      return redirect("/auth?mode=login");
    }

    const response = await fetch(baseurl + "/cart/add", {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
      method: "POST",
    });

    if (response.status === 401) {
      return redirect("/auth?mode=login");
    }

    if (response.status >= 500) {
      throw json(
        {
          title: "server error",
          message: "cant add the new item to the cart",
        },
        {
          status: 500,
        }
      );
    }

    if (response.status === 422) {
      toast.error("نمیتوان بیش از ۵ عدد اضافه کرد!");
    }

    const { id } = await response.json();
    if (response.ok) {
      dispatcher(
        cartActions.addToCart({
          product: product,
          id: id,
        })
      );
      toast.success("به سبد خرید اضافه گردید");
    }
  };
};

export const fetchCartData = () => {
  return async (dispatcher) => {
    const token = getAccessToken();
    if (!token || token === "EXPIERED") {
      return null;
    }
    const response = await fetch(baseurl + "/cart/list", {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 422 || response.status === 401) {
      toast.error("نیمتوان به سبد دسترسی پیدا کرد!");
      return;
    }

    if (response.status >= 500) {
      throw json(
        {
          title: "server error",
          message: "cant add the new item to the cart",
        },
        {
          status: 500,
        }
      );
    }

    const data = await response.json();
    dispatcher(cartActions.replaceCartItems(data));
  };
};

export const changeCount = (cartItemId, count, flag) => {
  return async (dispatcher) => {
    const token = getAccessToken();
    const data = {
      cart_item_id: cartItemId,
      count: count,
    };

    const response = await fetch(baseurl + "/cart/changeCount", {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
      method: "POST",
    });
    if (response.status === 401) {
      return redirect("/auth?mode=login");
    }

    if (response.status === 422) {
      toast.error("نمیتوان بیش از ۵ عدد اضافه کرد!");
      return;
    }

    if (response.status >= 500) {
      throw json(
        {
          title: "server error",
          message: "cant add the new item to the cart",
        },
        {
          status: 500,
        }
      );
    }

    dispatcher(
      cartActions.changeCountitem({ id: cartItemId, count: count, flag })
    );
  };
};

export const removeFromCartApi = (cartItemId) => {
  return async (dispatcher) => {
    const token = getAccessToken();
    const data = {
      cart_item_id: cartItemId,
    };
    const response = await fetch(baseurl + "/cart/remove", {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
      method: "POST",
    });
    if (response.status === 401) {
      return redirect("/auth?mode=login");
    }

    if (response.status === 422) {
      toast.error("شناسه آیتم سبد خرید معتبر نیست");
      return;
    }

    if (response.status >= 500) {
      throw json(
        {
          title: "server error",
          message: "cant add the new item to the cart",
        },
        {
          status: 500,
        }
      );
    }
    toast.success("با موفیت از سبد حذف شد.!");
    dispatcher(cartActions.removeFromCart(cartItemId));
  };
};
