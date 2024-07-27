import axios from "axios";
import Hero from "../components/homePg/Hero";
import { baseurl } from "../App";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import BannersSec from "../components/homePg/BannersSec";
import { Suspense } from "react";
import BannersSkeleton from "../components/homePg/BannersSkeleton";
import ProductSlider from "../components/homePg/ProductSlider";

const Home = () => {
  const { banners, products } = useLoaderData();

  return (
    <div>
      <Hero />
      <Suspense fallback={<BannersSkeleton />}>
        <Await resolve={banners}>
          {(bannersSrc) => <BannersSec banners={bannersSrc} />}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={products}>
          {(productsSrc) => <ProductSlider products={productsSrc} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default Home;

const bannerLoader = async () => {
  const response = await axios.get(baseurl + "/banner/slider", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 422 || response.status === 401) {
    return {
      title: "cant get banners",
    };
  }

  if (response.status >= 500) {
    throw json("خطا در ارتباط با سرور");
  }

  return response.data;
};

const productsLoader = async () => {
  const response = await axios.get(baseurl + "/product/list?sort=4", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (response.status === 422 || response.status === 401) {
    return {
      title: "cant get products",
    };
  }

  if (response.status === 500) {
    throw json("خطا در ارتباط با سرور");
  }

  return response.data;
};

export const loader = async () => {
  return defer({
    banners: bannerLoader(),
    products: productsLoader(),
  });
};
