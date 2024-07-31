import {
  FiArrowLeft,
  FiMinus,
  FiPercent,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cartEmptyAnime from "../lottie/cartEmpty.json";
import Lottie from "lottie-react";
import { useEffect } from "react";
import {
  changeCount,
  fetchCartData,
  removeFromCartApi,
} from "../store/CartStoreApi";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(fetchCartData());
  }, [dispatcher]);

  let payablePrice = useSelector((state) => state.cart.payable_price);
  console.log(payablePrice);
  let totalDiscount = 0;
  let cartItems = useSelector((state) => state.cart.cart_items);
  console.log(cartItems);

  const increaseQunatity = (cartItemId, count) => {
    count++;
    dispatcher(changeCount(cartItemId, count, "plus"));
  };

  const decreaseQunatity = (cartitemId, count) => {
    --count;
    if (count >= 1) {
      dispatcher(changeCount(cartitemId, count, "minus"));
    } else toast.warn("حداقل محصول در سبد خرید ۱ عدد است");
  };

  const removeFromCart = (cartitemId) => {
    dispatcher(removeFromCartApi(cartitemId));
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center h-full justify-center p-5 gap-2 md:max-w-[500px] mx-auto">
        <Lottie
          animationData={cartEmptyAnime}
          loop={true}
          className="w-9/12 p-5"
        />
        <h6 className="text-accentColor font-medium text-lg">
          سبد خرید شما خالی است!.
        </h6>
        <Link
          to={"/products"}
          className="w-full bg-primaryColor p-2 rounded-lg shadow-md text-whiteColor flex items-center justify-center gap-2 my-5"
        >
          دیدن محصولات فروشگاه
          <FiArrowLeft size={24} />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full md:max-w-[600px] mx-auto flex-col items-center justify-start gap-5 p-5">
      {cartItems.map((cartItem) => {
        totalDiscount += cartItem.product.discount * cartItem.count;
        return (
          <div
            className="flex items-center justify-start h-32 overflow-hidden rounded-lg border border-primaryColor w-full shadow-md shadow-green-100"
            key={cartItem.cart_item_id}
          >
            <img
              src={cartItem.product.image}
              alt={cartItem.product.title}
              className="mix-blend-multiply border-l border-dividerColor w-28 h-full"
            />
            <div className="w-full bg-white h-full flex flex-col items-start justify-around gap-2 p-2">
              <h5 className="font-medium text-sm md:text-base md:line-clamp-2 line-clamp-1">
                {cartItem.product.title}
              </h5>
              <span className="flex items-center justify-start gap-1 text-blue-500 text-xs">
                {cartItem.product.discount.toLocaleString("fa-IR") +
                  " تومان تخفیف"}
                <FiPercent size={14} />
              </span>
              <h6 className="text-sm font-medium text-accentColor">
                {cartItem.product.price.toLocaleString("fa-IR") + " تومان "}
              </h6>
              <div className="w-full flex items-center justify-between gap-2">
                <div className="flex items-center justify-start gap-2">
                  <FiMinus
                    size={14}
                    onClick={() =>
                      decreaseQunatity(cartItem.cart_item_id, cartItem.count)
                    }
                  />
                  {cartItem.count}
                  <FiPlus
                    size={14}
                    onClick={() =>
                      increaseQunatity(cartItem.cart_item_id, cartItem.count)
                    }
                  />
                </div>
                <button className="bg-red-100 text-red-500 rounded-md p-[3px]">
                  <FiTrash2
                    size={18}
                    onClick={() => removeFromCart(cartItem.cart_item_id)}
                  />
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <h6 className="text-blue-500 font-medium text-lg flex items-center justify-start gap-1 w-full text-start">
        {totalDiscount.toLocaleString("fa-IR") + " تخفیف"}
        <FiPercent size={20} />
      </h6>
      <h3 className="text-accentColor text-start w-full font-medium text-2xl">
        {payablePrice.toLocaleString("fa-IR") + " تومان"}
      </h3>
      <div className="w-full flex items-center justify-center gap-2 my-2">
        <Link
          to={"/products"}
          className="bg-primaryColor bg-opacity-20 text-primaryColor rounded-lg font-medium p-2 w-full text-center"
        >
          ادامه خرید
        </Link>
        <Link
          to={""}
          className="bg-primaryColor rounded-lg hover:bg-accentColor text-whiteColor font-medium p-2 w-full text-center "
        >
          تکمیل سفارش
        </Link>
      </div>
    </div>
  );
};

export default Cart;
