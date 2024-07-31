import {
  json,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Login from "../components/authPg/Login";
import Signup from "../components/authPg/Signup";
import { baseurl, client_id, client_secret } from "../App";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Auth = () => {
  const token = useLoaderData();
  const navigator = useNavigate();
  useEffect(() => {
    if (token && token !== "EXPIERED") {
      navigator("/profile");
    }
  }, [token, navigator]);

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "signup";
  const actionData = useActionData();

  return (
    <div className="flex flex-col items-center p-5 justify-center gap-5">
      {actionData && actionData.error && (
        <h4 className="font-medium text-lg text-red-500">{actionData.error}</h4>
      )}
      {actionData && actionData.message && (
        <li className="text-red-500 list-item">{actionData.message}</li>
      )}
      <div className="bg-white p-2 rounded-lg shadow-md w-full md:w-7/12">
        {mode === "login" ? <Login /> : <Signup />}
      </div>
      <Link
        to={mode === "login" ? "?mode=signup" : "?mode=login"}
        className="text-primaryColor font-medium"
      >
        {mode === "login"
          ? "حساب کاربری ندارید ؟ ثبت نام"
          : "حساب کاربری دارید ؟ ورود"}
      </Link>
    </div>
  );
};

export default Auth;

export const action = async ({ request, params }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "signup";
  let endpoint;
  let data;
  let config;
  let response;

  const DataForm = await request.formData();
  if (mode === "login") {
    endpoint = "/auth/token";
    localStorage.setItem("email", DataForm.get("username"));
    data = new FormData();
    data.append("grant_type", "password");
    data.append("client_id", client_id);
    data.append("client_secret", client_secret);
    data.append("username", DataForm.get("username"));
    data.append("password", DataForm.get("password"));

    response = await fetch(baseurl + endpoint, {
      headers: {
        Accept: "application/json",
      },
      body: data,
      method: "post",
    });
  } else {
    config = {
      Accept: "*/*",
      Content_Type: "application/json",
    };
    endpoint = "/user/register";
    localStorage.setItem("email", DataForm.get("username"));
    const resData = {
      email: DataForm.get("username"),
      password: DataForm.get("password"),
    };
    data = JSON.stringify(resData);
    response = await fetch(baseurl + endpoint, {
      headers: {
        Accept: config.action,
        "Content-Type": config.Content_Type,
      },
      body: data,
      method: "post",
    });
  }

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json(
      {
        message: "can not complete the action",
      },
      {
        status: 500,
      }
    );
  }
  const result = await response.json();
  if (result.message === "") {
    toast.success("با موفقیت ثبت نام شدی!!");
    return redirect("/auth?mode=login");
  } else {
    const { access_token, refresh_token, expires_in } = result;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in);
    toast.success("با موفقیت وارد شدی!");
    return redirect("/");
  }
};
