import { json, Link, useLoaderData } from "react-router-dom";
import { baseurl } from "../App";
import { getAccessToken } from "../utils/Auth";
import axios from "axios";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { RiCloseCircleFill } from "react-icons/ri";

const OrderStatus = () => {
  const data = useLoaderData();

  return (
    <div className="p-5 max-w-[600px] mx-auto">
      <div
        className="w-full flex flex-col items-center
     justify-start gap-5  rounded-lg p-5 bg-white shadow-md"
      >
        {data.purchase_success ? (
          <TbRosetteDiscountCheckFilled size={72} color="green" />
        ) : (
          <RiCloseCircleFill size={72} color="red" />
        )}
        <div className="w-full flex items-center justify-between gap-2 p-2 border-b-2 border-gray-200 border-dashed">
          <h6 className="font-medium">وضعیت سفارش :</h6>
          <h6 className="font-medium text-xl text-primaryColor">
            {data.payment_status}
          </h6>
        </div>
        <div className="w-full flex items-center justify-between gap-2 p-2 border-b-2 border-gray-200 border-dashed">
          <h6 className="font-medium">وضعیت سفارش :</h6>
          <h6 className="font-medium text-xl text-primaryColor">
            {data.payable_price.toLocaleString("fa-IR") + " تومان"}
          </h6>
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <Link
            to={"/"}
            className="w-full flex items-center justify-center bg-primaryColor hover:bg-accentColor text-whiteColor rounded-lg p-2"
          >
            بازگشت به صفحه اصلی
          </Link>
          <Link
            to={"/orders"}
            className="w-full flex items-center justify-center bg-primaryColor bg-opacity-20 transition-colors duration-300 hover:bg-accentColor text-primaryColor hover:text-whiteColor rounded-lg p-2"
          >
            سوابق سفارش
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;

export const loader = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const orderId = searchParams.get("orderId");
  const token = getAccessToken();
  const response = await axios(baseurl + "/order/checkout", {
    params: {
      order_id: orderId,
    },
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (response.status === 422) {
    return response;
  }

  if (response.status >= 500) {
    throw json(
      {
        title: "server error",
        message: "cant checkout the order",
      },
      {
        status: 500,
      }
    );
  }
  return response.data;
};
