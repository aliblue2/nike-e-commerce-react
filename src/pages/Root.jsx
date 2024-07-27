import {
  Outlet,
  useLocation,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import BottomNav from "../components/common/BottomNav";
import { useEffect } from "react";
import LoadingPage from "./LoadingPage";
import {
  checkAuthToken,
  getAccessToken,
  getExpireTime,
  updateToken,
} from "../utils/Auth";

const Root = () => {
  const path = useLocation().pathname;
  useEffect(() => {
    window.scroll(0, 0);
  }, [path]);

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
