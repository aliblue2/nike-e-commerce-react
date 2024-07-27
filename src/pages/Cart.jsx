import {
  FiArrowLeft,
  FiMinus,
  FiPercent,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../store/CartStore";
import cartEmptyAnime from "../lottie/cartEmpty.json";
import Lottie from "lottie-react";

const Cart = () => {
  let finalPrice = 0;
  let totalDiscount = 0;
  const cartItems = useSelector((state) => state.cart);
  const dispatcher = useDispatch();

  const increaseQunatity = (productId) => {
    dispatcher(cartActions.increaseQuantity(productId));
  };
  const decreaseQunatity = (productId) => {
    dispatcher(cartActions.decreaseQuantity(productId));
  };
  const removeFromCart = (productId) => {
    dispatcher(cartActions.removeFromCart(productId));
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
          to={"/"}
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
        finalPrice += cartItem.price * cartItem.quantity;
        totalDiscount += cartItem.discount * cartItem.quantity;
        return (
          <div
            className="w-full shadow-sm relative h-32 flex items-center overflow-hidden justify-start rounded-lg border border-dividerColor"
            key={cartItem.id}
          >
            <img
              src={cartItem.image}
              className="w-28 h-full mix-blend-multiply border-l border-dividerColor"
              alt=""
            />
            <div className="bg-white w-full p-2 h-full flex flex-col items-start justify-around gap-2">
              <Link
                to={`/products/${cartItem.id}`}
                state={cartItem}
                className="font-medium line-clamp-1"
              >
                {cartItem.title}
              </Link>

              <p className="text-blue-500 text-xs font-medium flex items-center justify-center gap-2">
                <span className="line-through text-dividerColor text-xs">
                  {cartItem.previous_price.toLocaleString("fa-IR") + " تومان"}
                </span>
                {cartItem.discount.toLocaleString("fa-IR") + " تخفیف"}
                <FiPercent size={14} />
              </p>

              <h5 className="text-accentColor font-medium">
                {cartItem.price.toLocaleString("fa-IR") + " تومان"}
              </h5>
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center justify-center gap-5 text-accentColor font-medium">
                  <FiMinus
                    onClick={() => decreaseQunatity(cartItem.id)}
                    size={16}
                    className="bg-primaryColor bg-opacity-20 rounded-full p-[1px]"
                  />
                  {cartItem.quantity}
                  <FiPlus
                    onClick={() => increaseQunatity(cartItem.id)}
                    size={16}
                    className="bg-primaryColor bg-opacity-20 rounded-full p-[1px]"
                  />
                </div>
                <button className="bg-red-100 text-red-500 p-1 rounded-lg flex items-center justify-center gap-1 text-sm font-medium">
                  <FiTrash2
                    size={16}
                    onClick={() => removeFromCart(cartItem.id)}
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
        {finalPrice.toLocaleString("fa-IR") + " تومان"}
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
