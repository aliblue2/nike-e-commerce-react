import { json, useLoaderData, useLocation } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { baseurl } from "../App";
import axios from "axios";
import Comments from "../components/productDetailPg/Comments";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/CartStore";

const ProductDetail = () => {
  const productData = useLocation().state;
  const comments = useLoaderData();
  const dispatch = useDispatch();

  const addTocartItem = (product) => {
    dispatch(cartActions.addToCart(product));
  };

  return (
    <div className="flex flex-col items-center justify-start gap-5 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <img
          src={productData.image}
          alt={productData.title}
          className="sm:rounded-lg  md:sticky top-0 mix-blend-multiply h-full object-scale-down"
        />
        <div className="md:col-span-2 col-span-1 px-5 flex flex-col items-start justify-around gap-5">
          <h4 className="text-xl font-medium">{productData.title}</h4>
          <p>
            Nike Dunk Low Retro که برای چوب‌های سخت ساخته شده اما به خیابان‌ها
            کشیده شده است، با روکش‌های واضح و رنگ‌های تیمی اصلی بازمی‌گردد. این
            نماد بسکتبال حال و هوای دهه 80 را با چرم درجه یک در رویه پخش می کند
            که ظاهری زیبا دارد و حتی بهتر می شود. تکنولوژی مدرن کفش کمک می کند
            تا آسایش را به قرن بیست و یکم بیاورد. Nike Dunk Low Retro که برای
            چوب‌های سخت ساخته شده اما به خیابان‌ها کشیده شده است، با روکش‌های
            واضح و رنگ‌های تیمی اصلی بازمی‌گردد. این نماد بسکتبال حال و هوای دهه
            80 را با چرم درجه یک در رویه پخش می کند که ظاهری زیبا دارد و حتی
            بهتر می شود. تکنولوژی مدرن کفش کمک می کند تا آسایش را به قرن بیست و
            یکم بیاورد.
          </p>
          <div>
            <h5 className="text-dividerColor text-lg line-through font-medium">
              {productData.previous_price.toLocaleString("fa-IR") + " تومان"}
            </h5>
            <h4 className="text-red-500 border-dashed border-b-2 my-2 border-t-2 px-4 rounded-md border-red-200 text-xl  font-medium">
              {productData.discount.toLocaleString("fa-IR") + " تخفیف"}
            </h4>
          </div>
          <h3 className="text-primaryColor text-2xl font-medium">
            {productData.price.toLocaleString("fa-IR") + " تومان"}
          </h3>

          <button
            onClick={() => addTocartItem(productData)}
            className="md:flex w-fit bg-gradient-to-r from-primaryColor to-green-500 hidden items-center justify-center gap-5 p-2 rounded-lg text-white hover:bg-accentColor transition-colors duration-300 "
          >
            افزودن به سبد خرید
            <FiShoppingBag size={24} />
          </button>
        </div>
      </div>
      <button
        onClick={() => addTocartItem(productData)}
        className="md:hidden w-full bg-gradient-to-r from-primaryColor to-green-500  flex items-center justify-center gap-5 p-3  text-white hover:bg-accentColor transition-colors z-10 duration-300 fixed bottom-14 "
      >
        افزودن به سبد خرید
        <span className="font-medium">
          {productData.price.toLocaleString("fa-IR") + " تومان"}
        </span>
        <FiShoppingBag size={24} />
      </button>
      <h4 className="text-primaryColor font-medium text-2xl border-y-2 w-full text-center p-2 border-dividerColor my-5">
        نظرات کاربران
      </h4>
      <Comments comments={comments} />
    </div>
  );
};

export default ProductDetail;

export const commentsLoader = async ({ params }) => {
  const id = params.productId;
  const response = await axios.get(baseurl + `/comment/list?product_id=${id}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status >= 400) {
    throw json({ message: "cant fetch product details" });
  }

  return await response.data;
};
