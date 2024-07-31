import { FaHome, FaShoppingBasket } from "react-icons/fa";
import { FaCircleUser, FaShop } from "react-icons/fa6";
import { RiLoginBoxFill } from "react-icons/ri";
import { useSelector } from "react-redux";

import { NavLink, useLoaderData } from "react-router-dom";

const BottomNav = () => {
  const token = useLoaderData();
  const cartItemsCount = useSelector((state) => state.cart.cart_items.length);

  return (
    <nav className="w-full z-10 shadow-2xl shadow-primaryColor fixed left-0 bottom-0 flex items-center justify-between md:hidden bg-white py-2">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive
            ? "flex w-3/12 flex-col items-center justify-center gap-1 text-accentColor font-medium text-sm"
            : "flex w-3/12 flex-col items-center justify-center gap-1 text-gray-400 hover:text-accentColor hover:font-medium transition-colors duration-300 text-xs"
        }
      >
        <FaHome size={20} />
        خانه
      </NavLink>
      <NavLink
        to={"/products?sort=3"}
        end
        className={({ isActive }) =>
          isActive
            ? "flex w-3/12 flex-col items-center justify-center gap-1 text-accentColor font-medium text-sm"
            : "flex w-3/12 flex-col items-center justify-center gap-1 text-gray-400 hover:text-accentColor hover:font-medium transition-colors duration-300 text-xs"
        }
      >
        <FaShop size={20} />
        فروشگاه
      </NavLink>
      <NavLink
        to={"/cart"}
        end
        className={({ isActive }) =>
          isActive
            ? "flex relative w-3/12 group group-active flex-col items-center justify-center gap-1 text-accentColor font-medium text-sm"
            : "flex relative w-3/12 group flex-col items-center justify-center gap-1 text-gray-400 hover:text-accentColor hover:font-medium transition-colors duration-300 text-xs"
        }
      >
        <FaShoppingBasket size={20} />
        سبد خرید
        <NavLink to={"/cart"} className={({isActive}) => isActive ? "absolute top-0 left-5 text-xs bg-primaryColor w-4 text-whiteColor text-center rounded-full" : "absolute top-0 left-5 text-xs bg-gray-400 w-4 text-whiteColor text-center rounded-full"}>
          {cartItemsCount}
        </NavLink>
      </NavLink>
      <NavLink
        to={token && token !== "EXPIERED" ? "/profile" : "/auth"}
        className={({ isActive }) =>
          isActive
            ? "w-3/12  text-accentColor font-medium text-sm"
            : "w-3/12 text-gray-400 hover:text-accentColor hover:font-medium transition-colors duration-300 text-xs"
        }
      >
        {token && token !== "EXPIERED" ? (
          <span className="flex flex-col items-center justify-center gap-1">
            <FaCircleUser size={20} />
            پروفایل
          </span>
        ) : (
          <span className="flex flex-col items-center justify-center gap-2">
            <RiLoginBoxFill size={20} />
            ورود / ثبت نام
          </span>
        )}
      </NavLink>
    </nav>
  );
};

export default BottomNav;
