import { FiHome, FiLayers, FiPhoneCall } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const MainNav = () => {
  return (
    <nav className="md:block hidden">
      <ul className="flex item-center justify-center gap-2 ">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "flex rounded-lg items-start justify-center gap-1 text-primaryColor bg-primaryColor bg-opacity-15 p-2  transition-colors duration-300 text-sm font-medium"
                : "flex items-start text-sm justify-center gap-1 p-2 text-gray-400 hover:text-primaryColor hover:bg-primaryColor hover:bg-opacity-15 rounded-lg transition-all ease-in-out duration-300"
            }
          >
            <FiHome size={18} />
            خانه
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/products?sort=3"}
            end
            className={({ isActive }) =>
              isActive
                ? "flex rounded-lg items-start justify-center gap-1 text-primaryColor bg-primaryColor bg-opacity-15 p-2  transition-colors duration-300 text-sm font-medium"
                : "flex items-start text-sm justify-center gap-1 p-2 text-gray-400 hover:text-primaryColor hover:bg-primaryColor hover:bg-opacity-15 rounded-lg transition-all ease-in-out duration-300"
            }
          >
            <FiLayers size={18} />
            فروشگاه
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/support"}
            className={({ isActive }) =>
              isActive
                ? "flex rounded-lg items-start justify-center gap-1 text-primaryColor bg-primaryColor bg-opacity-15 p-2  transition-colors duration-300 text-sm font-medium"
                : "flex items-start text-sm justify-center gap-1 p-2 text-gray-400 hover:text-primaryColor hover:bg-primaryColor hover:bg-opacity-15 rounded-lg transition-all ease-in-out duration-300"
            }
          >
            <FiPhoneCall size={18} />
            پشتیبانی
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
