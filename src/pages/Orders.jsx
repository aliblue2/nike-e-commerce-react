import { getAccessToken } from "../utils/Auth";
import { baseurl } from "../App";
import { json, Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import SecondaryButton from "../components/common/SecondaryButton";
import ProductsOrder from "../components/orderPg/ProductsOrder";
import orderEmptyAnime from "../lottie/cartEmpty.json";
import Lottie from "lottie-react";
import { FiArrowLeft } from "react-icons/fi";
const Orders = () => {
  const orders = useLoaderData();
  const [count, setCount] = useState(9);
  if (orders.length === 0) {
    return (
      <div className="max-w-[500px] mx-auto flex flex-col items-center justify-center gap-5 p-5">
        <Lottie animationData={orderEmptyAnime} className="w-9/12 p-2" loop />
        <h6 className="text-accentColor font-medium text-xl">
          هنوز سفارشی ثبت نکرده اید.!
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
    <div className="flex items-center justify-center flex-col p-5 gap-5">
      <h6 className="text-accentColor font-medium text-2xl">
        سفارشات پیشین شما
      </h6>
      <div className="w-full relative mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {orders.slice(0, count).map((order) => {
          return (
            <div
              key={order.id}
              className="flex flex-col items-start justify-between gap-2 w-full rounded-lg border-2 bg-white shadow-md p-2 divide-y-2 divide-dashed"
            >
              <h6 className="flex p-2 text-sm items-center justify-between gap-2 w-full">
                <span>شماره سفارش</span>
                <span className="text-accentColor font-medium">
                  {"# " + order.id}
                </span>
              </h6>
              <h6 className="flex p-2 text-sm items-center justify-between gap-2 w-full">
                <span>تاریخ سفارش</span>
                <span className="text-accentColor font-medium">
                  {order.date}
                </span>
              </h6>
              <h6 className="flex p-2 text-sm items-center justify-between gap-2 w-full">
                <span>وضعیت سفارش</span>
                <span className="text-accentColor font-medium">
                  {order.payment_status === "payed"
                    ? "موفق"
                    : "در انتظار پرداخت"}
                </span>
              </h6>

              <ProductsOrder orderItems={order.order_items} />
              <h6 className="flex p-2 text-sm items-center justify-between gap-2 w-full">
                <span>مبلغ سفارش</span>
                <span className="text-accentColor font-medium">
                  {order.payable.toLocaleString("fa-IR") + " تومان"}
                </span>
              </h6>
            </div>
          );
        })}
      </div>
      {orders.length > 9 && (
        <SecondaryButton
          onClick={() => {
            setCount((prevvalue) => prevvalue + 3);
          }}
        >
          دیدن سفارشات بیشتر
        </SecondaryButton>
      )}
    </div>
  );
};
export default Orders;
export const loader = async () => {
  const token = getAccessToken();
  const response = await fetch(baseurl + "/order/list", {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      {
        title: "server error",
        message: "cant get orders",
      },
      {
        status: 500,
      }
    );
  }

  return response;
};
