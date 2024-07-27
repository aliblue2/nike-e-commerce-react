import axios from "axios";
import { baseurl } from "../App";
import {
  Await,
  defer,
  json,
  Link,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { Suspense } from "react";
import SkeletonGrid from "../components/shopPg/SkeletonGrid";
import ProductsGrid from "../components/shopPg/ProductsGrid";
import { FiCheck } from "react-icons/fi";
import { BiSortAZ } from "react-icons/bi";
const Products = () => {
  const { products } = useLoaderData();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  return (
    <div className="flex flex-col items-start justify-start gap-5 p-5">
      <div className="flex items-center justify-around gap-2">
        <BiSortAZ size={20} />
        <Link
          to={"?sort=1"}
          className={
            sort === "1"
              ? "flex items-center justify-center gap-1 rounded-lg bg-primaryColor text-whiteColor font-medium shadow-md p-2 text-xs"
              : "flex items-center justify-center gap-1 bg-white p-2 rounded-lg shadow-md hover:bg-primaryColor transition-all ease-in-out duration-300 hover:text-whiteColor text-xs hover:text-sm"
          }
        >
          {sort === "1" && <FiCheck size={18} />}
          پرفروش ترین
        </Link>
        <Link
          to={"?sort=2"}
          className={
            sort === "2"
              ? "flex items-center justify-center gap-1 rounded-lg bg-primaryColor text-whiteColor font-medium shadow-md p-2 text-xs"
              : "flex items-center justify-center gap-1 bg-white p-2 rounded-lg shadow-md hover:bg-primaryColor transition-all ease-in-out duration-300 hover:text-whiteColor text-xs hover:text-sm"
          }
        >
          {sort === "2" && <FiCheck size={18} />}
          گران ترین
        </Link>
        <Link
          to={"?sort=3"}
          className={
            sort === "3"
              ? "flex items-center justify-center gap-1 rounded-lg bg-primaryColor text-whiteColor font-medium shadow-md p-2 text-xs"
              : "flex items-center justify-center gap-1 bg-white p-2 rounded-lg shadow-md hover:bg-primaryColor transition-all ease-in-out duration-300 hover:text-whiteColor text-xs hover:text-sm"
          }
        >
          {sort === "3" && <FiCheck size={18} />}
          ارزان ترین
        </Link>
        <Link
          to={"?sort=4"}
          className={
            sort === "4"
              ? "flex items-center justify-center gap-1 rounded-lg bg-primaryColor text-whiteColor font-medium shadow-md p-2 text-xs"
              : "flex items-center justify-center gap-1 bg-white p-2 rounded-lg shadow-md hover:bg-primaryColor transition-all ease-in-out duration-300 hover:text-whiteColor text-xs hover:text-sm"
          }
        >
          {sort === "4" && <FiCheck size={18} />}
          پربازدید ترین
        </Link>
      </div>
      <Suspense fallback={<SkeletonGrid />}>
        <Await resolve={products}>
          {(productsRes) => <ProductsGrid products={productsRes} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default Products;

const porductsLoader = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const sort = searchParams.get("sort") || "1";

  const response = await axios.get(baseurl + `/product/list?sort=${sort}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status >= 400) {
    throw json({
      message:
        "نمیتوان به سرور دسترسی پیدا کرد! از وصل بودن اینترنت خود اطمینان حاصل کنید",
    });
  }

  return await response.data;
};

export const loader = async (meta) => {
  return defer({
    products: porductsLoader(meta),
  });
};
