import { FiLogIn, FiSearch, FiShoppingBag, FiUser } from "react-icons/fi";
import logoImage from "../../images/logo.png";
import MainNav from "./MainNav";

import { Link, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItemsCount = useSelector((state) => state.cart.cart_items.length);
  const token = useLoaderData();
  return (
    <header className="bg-white">
      <div className="max-w-[1200px] mx-auto flex items-center p-2 h-16 justify-between gap-5">
        <div className="flex items-center justify-center gap-5">
          <img src={logoImage} alt="logoImage" className="max-w-16" />
          <MainNav />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Link
            to={"/search"}
            className="flex rounded-lg items-center justify-center gap-1 text-primaryColor bg-primaryColor bg-opacity-15 hover:bg-primaryColor hover:text-whiteColor p-2 transition-colors duration-300"
          >
            <FiSearch size={20} />
          </Link>
          <Link
            to={"/cart"}
            className="md:flex hidden rounded-lg items-center justify-center gap-2 text-primaryColor bg-primaryColor bg-opacity-15 hover:bg-primaryColor hover:text-whiteColor p-2 transition-colors duration-300 text-sm font-medium "
          >
            سبد خرید
            <FiShoppingBag size={20} />
            <span>{cartItemsCount}</span>
          </Link>
          <Link
            to={token && token !== "EXPIERED" ? "/profile" : "/auth?mode=login"}
            className="md:block hidden text-whiteColor bg-primaryColor hover:bg-accentColor font-medium text-sm  p-2 rounded-lg transition-colors duration-300"
          >
            {token && token !== "EXPIERED" ? (
              <span className="flex items-center justify-center gap-2">
                پروفایل <FiUser size={20} />
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                ورود / ثبت نام <FiLogIn size={20} />
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
