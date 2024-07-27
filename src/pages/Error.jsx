import { Link, useRouteError } from "react-router-dom";
import error404Anime from "../lottie/404.json";
import errorAnime from "../lottie/error.json";
import Lottie from "lottie-react";
const Error = () => {
  const error = useRouteError();
  let animeSource;
  let content;
  if (error.status === 404) {
    animeSource = error404Anime;
    content = (
      <>
        <h6 className="text-primaryColor font-medium text-2xl">
          به نظر میاد گمشدی!!
        </h6>
        <p className="text-center">
          از دکمه زیر برای برگشتن به صفحه اصلی میتونی استفاده کنی
        </p>
        <Link
          className="bg-primaryColor text-white px-4 py-2 rounded-lg shadow-md"
          to={"/"}
        >
          برگشت به خانه
        </Link>
      </>
    );
  } else {
    animeSource = errorAnime;

    content = (
      <>
        <h6 className="text-primaryColor font-medium text-2xl">
          خطا دسترسی به سرور
        </h6>
        <p className="text-center">
          سرویس اینترنت خود را بررسی کنید یا با پشتیبانی تماس بگیرید
        </p>
      </>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-5 bg-gradient-to-b from-dividerColor to-white min-h-screen">
      <Lottie animationData={animeSource} loop />
      {content}
    </div>
  );
};

export default Error;
