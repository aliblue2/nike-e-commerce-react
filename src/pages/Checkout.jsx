import { Form, json, redirect, useActionData } from "react-router-dom";
import { getAccessToken } from "../utils/Auth";
import { baseurl } from "../App";

const Checkout = () => {
  const actionData = useActionData();

  return (
    <div className="max-w-[600px] mx-auto p-2">
      {actionData && (
        <div>
          <span className="text-red-500 font-medium text-center block">
            {actionData.error && "قبل از پرداخت خطا های زیر را برطرف کنید.!"}
          </span>
          <span className="text-red-500 font-medium text-center block text-lg">
            {actionData.message}
          </span>
        </div>
      )}
      <Form
        method="post"
        className="w-full flex flex-col justify-start gap-3 p-3 md:p-0"
      >
        <label htmlFor="first_name" className="font-medium text-sm">
          نام :
        </label>
        <input
          placeholder="سعید"
          type="text"
          name="first_name"
          id="first_name"
          className="w-full rounded-lg py-2 px-4 outline-none focus:border-primaryColor transition-colors duration-300 focus:shadow-sm border text-sm"
        />
        <label htmlFor="last_name" className="font-medium text-sm">
          نام خانوادگی :
        </label>
        <input
          placeholder="شاهینی"
          type="text"
          name="last_name"
          id="last_name"
          className="w-full rounded-lg py-2 px-4 outline-none focus:border-primaryColor transition-colors duration-300 focus:shadow-sm border text-sm"
        />
        <label htmlFor="postal_code" className="font-medium text-sm">
          کدپستی :
        </label>
        <input
          placeholder="۱۲۳۴۵۶۷۸۹۰"
          type="number"
          name="postal_code"
          id="postal_code"
          className="w-full rounded-lg py-2 px-4 outline-none focus:border-primaryColor transition-colors duration-300 focus:shadow-sm border text-sm"
        />
        <label htmlFor="mobile" className="font-medium text-sm">
          موبایل :
        </label>
        <input
          placeholder="۰۹۰۳xxxxxxx"
          type="tel"
          name="mobile"
          id="mobile"
          className="w-full rounded-lg py-2 px-4 outline-none focus:border-primaryColor transition-colors duration-300 focus:shadow-sm border text-sm"
        />
        <label htmlFor="address" className="font-medium text-sm">
          آدرس :
        </label>
        <input
          placeholder="کرج فردیس شهرک منظریه"
          type="text"
          name="address"
          id="address"
          className="w-full rounded-lg py-2 px-4 outline-none focus:border-primaryColor transition-colors duration-300 focus:shadow-sm border text-sm"
        />
        <div className="w-full flex items-center justify-center gap-2">
          <button
            type="submit"
            name="payment"
            value={"cod"}
            className="w-full flex items-center justify-center bg-primaryColor bg-opacity-20 transition-colors duration-300 hover:bg-accentColor text-primaryColor hover:text-whiteColor rounded-lg p-2"
          >
            پرداخت در محل
          </button>
          <button
            type="submit"
            value={"online"}
            name="payment"
            className="w-full flex items-center justify-center bg-primaryColor hover:bg-accentColor text-whiteColor rounded-lg p-2"
          >
            پرداخت آنلاین
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Checkout;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    postal_code: formData.get("postal_code"),
    mobile: formData.get("mobile"),
    address: formData.get("address"),
    payment_method: formData.get("payment"),
  };
  const token = getAccessToken();
  const response = await fetch(baseurl + "/order/submit", {
    headers: {
      Accept: "*/*",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  });

  if (response.status === 422) {
    return response;
  }

  if (response.status === 500) {
    throw json({
      title: "server error",
      message: "cant submit order . please try again ",
    });
  }

  const { bank_gateway_url, order_id } = await response.json();
  if (bank_gateway_url === "") {
    return redirect(`/orders/status?orderId=${order_id}`);
  } else if (bank_gateway_url !== null && bank_gateway_url !== undefined) {
    window.open(bank_gateway_url);
    return redirect(`/orders/status?orderId=${order_id}`);
  }
};
