import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import heroImage from "../../images/heroIMage.png";
import PrimaryButton from "../common/PrimaryButton";
import SecondaryButton from "../common/SecondaryButton";
const Hero = () => {
  return (
    <div className="flex md:flex-row flex-col items-center justify-between gap-5">
      <div className="w-full p-5 overflow-visible flex items-center justify-center">
        <img
          src={heroImage}
          id="heroImage"
          alt="heroImg"
          className="md:w-8/12 w-11/12 rounded-full overflow-visible p-5 "
        />
      </div>

      <div className="flex w-full flex-col items-center justify-center h-full gap-10">
        <h2 className="md:text-5xl text-3xl text-center font-medium text-accentColor">
          مقاوم در برابر رطوبت
        </h2>
        <p className="text-xl text-center">
          سری نایک زوم با طراحی سبک و پاسخگو، برای عملکرد بالای دویدن و ورزش
          ساخته شده است. با بالشتک هوای زوم نوآورانه، تجربه‌ای سریع و راحت با
          محافظت عالی از ضربات را ارائه می‌دهد.
        </p>
        <div className="flex w-full p-3 items-center justify-center gap-3">
          <PrimaryButton>
            سفارش دهید
            <FiShoppingBag size={20} />
          </PrimaryButton>
          <SecondaryButton>
            مشاهده بیشتر
            <FiArrowLeft size={20} />
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
