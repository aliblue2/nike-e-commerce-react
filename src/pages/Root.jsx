import {
  Outlet,
  useLocation,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import BottomNav from "../components/common/BottomNav";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import LoadingPage from "./LoadingPage";
import { getAccessToken, getExpireTime, updateToken } from "../utils/Auth";

import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchCartData } from "../store/CartStoreApi";

const Root = () => {
  const path = useLocation().pathname;
  useEffect(() => {
    window.scroll(0, 0);
  }, [path]);
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(fetchCartData());
  }, [dispatcher]);
  const isLoading = useNavigation().state === "loading";
  const tokeTimeDuration = getExpireTime();
  const token = getAccessToken();
  const submit = useSubmit();
  useEffect(() => {
    const refreshToken = async () => {
      const response = await updateToken();

      if (!response || response === "EXPIERED") {
        submit(null, {
          action: "/logout",
          method: "post",
        });
      } else {
        return;
      }
    };

    if (!token || token === null || token === undefined) {
      return;
    }

    const timer = setTimeout(() => {
      refreshToken();
    }, tokeTimeDuration);

    return () => clearTimeout(timer);
  }, [tokeTimeDuration, submit, token]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-whiteColor">
      <ToastContainer
        autoClose={3000}
        position="top-center"
        theme="colored"
        closeButton={true}
        style={{ marginLeft: "5px" }}
        rtl
      />
      <Header />
      <div className="max-w-[1200px] overflow-hidden mb-14 mx-auto md:p-5 text-blackColor">
        <Outlet />
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Root;
