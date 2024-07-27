import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import AmazingOffImg from "../../images/Amazing.svg";
import AmazingTextImg from "../../images/Amazing2.svg";
import { json, Link } from "react-router-dom";
import { FiArrowLeft, FiPercent } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import CountDown from "./CountDown";
import axios from "axios";
import { baseurl } from "../../App";

const ProductSlider = ({ products }) => {
  let targetTime = "July 27, 2024 11:13:00";
  return (
    <div
      className="w-full md:rounded-2xl bg-gradient-to-tl from-primaryColor to-green-500 md:p-5 py-3 mt-8"
      id="offerSec"
    >
      <Swiper
        slidesPerView={2.2}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 3.5,
          },
          768: {
            slidesPerView: 4.5,
          },
          1024: {
            slidesPerView: 5.5,
          },
        }}
      >
        <SwiperSlide>
          <div className="flex flex-col items-center justify-around gap-5 h-80 w-full">
            <img src={AmazingTextImg} alt="" />
            <CountDown targetTime={targetTime} />
            <img src={AmazingOffImg} alt="" />
            <Link
              to={"/products"}
              className="text-whiteColor font-medium flex items-center justify-center gap-2"
            >
              مشاهده همه
              <FiArrowLeft size={18} />
            </Link>
          </div>
        </SwiperSlide>
        {products.map((product) => {
          return (
            <SwiperSlide key={product.id} className="shadow-lg">
              <div className="w-full bg-white h-80 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  className="h-32 w-full aspect-square object-cover"
                  alt={product.title}
                />
                <div className="h-48 flex flex-col items-start justify-between p-2">
                  <h3 className="font-medium text-sm line-clamp-2">
                    {product.title}
                  </h3>
                  <h5 className="text-dividerColor line-through text-xs">
                    {product.previous_price.toLocaleString("fa-IR") + " تومان"}
                  </h5>
                  <h4 className="text-red-500 px-2 rounded-md  flex items-center gap-1 font-medium text-sm">
                    {product.discount.toLocaleString("fa-IR") + " تخفیف"}{" "}
                    <FiPercent size={14} />
                  </h4>
                  <h4 className="text-primaryColor font-medium text-lg">
                    {product.price.toLocaleString("fa-IR") + " تومان"}
                  </h4>
                  <Link
                    className="bg-primaryColor w-full p-1 rounded-sm text-whiteColor flex items-center justify-center gap-2 font-medium text-sm"
                    to={`/products/${product.id}`}
                    state={product}
                  >
                    مشاهده جزییات
                    <BsThreeDots size={18} />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductSlider;

