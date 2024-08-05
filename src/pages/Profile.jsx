import { FiHeart, FiLogOut, FiSettings } from "react-icons/fi";
import avatarImage from "../images/avatar.webp";
import { getEmailAddress } from "../utils/Auth";
import { NavLink, useSubmit } from "react-router-dom";
import { GrDashboard } from "react-icons/gr";
import { FaTruck } from "react-icons/fa";
const Profile = () => {
  const emailAddress = getEmailAddress();
  const submit = useSubmit();
  return (
    <div className="p-5 w-full md:max-w-[650px] mx-auto flex flex-col items-start justify-start gap-5">
      <div className="flex items-center justify-start gap-5 w-full">
        <img
          src={avatarImage}
          alt={emailAddress}
          className="max-w-28 bg-gradient-to-tr from-primaryColor to-green-500 rounded-full shadow-md shadow-emerald-200"
        />
        <div className="flex flex-col items-start justify-start gap-5">
          <h4 className="text-xl font-medium text-accentColor">
            {emailAddress}
          </h4>
          <button
            className="bg-red-100 font-medium text-sm p-2 rounded-lg text-red-500 flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-colors duration-300"
            onClick={() => submit(null, { action: "/logout", method: "post" })}
          >
            خروج از حساب کاربری
            <FiLogOut size={24} />
          </button>
        </div>
      </div>
      <div className="gap-2 my-5 flex flex-col items-center justify-start w-full">
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            isActive
              ? "w-full p-2 bg-primaryColor text-white rounded-lg font-medium text-lg flex flex-col items-center justify-center gap-2"
              : "w-full p-2 flex flex-col items-center justify-center gap-2 transition-colors ease-in-out duration-300 hover:bg-primaryColor bg-primaryColor bg-opacity-20 hover:bg-opacity-100 rounded-lg hover:text-white hover:font-medium text-lg"
          }
        >
          <GrDashboard size={20} />
          داشبورد
        </NavLink>
        <NavLink
          to={"/favorites"}
          className={({ isActive }) =>
            isActive
              ? "w-full p-2 bg-primaryColor text-white rounded-lg font-medium text-lg flex flex-col items-center justify-center gap-2"
              : "w-full p-2 flex flex-col items-center justify-center gap-2 transition-colors ease-in-out duration-300 hover:bg-primaryColor bg-primaryColor bg-opacity-20 hover:bg-opacity-100 rounded-lg hover:text-white hover:font-medium text-lg"
          }
        >
          <FiHeart size={20} />
          علاقه مندی ها
        </NavLink>
        <NavLink
          to={"/orders"}
          className={({ isActive }) =>
            isActive
              ? "w-full p-2 bg-primaryColor text-white rounded-lg font-medium text-lg flex flex-col items-center justify-center gap-2"
              : "w-full p-2 flex flex-col items-center justify-center gap-2 transition-colors ease-in-out duration-300 hover:bg-primaryColor bg-primaryColor bg-opacity-20 hover:bg-opacity-100 rounded-lg hover:text-white hover:font-medium text-lg"
          }
        >
          <FaTruck size={20} />
          سوابق سفارش
        </NavLink>
        <NavLink
          to={"/account-setting"}
          className={({ isActive }) =>
            isActive
              ? "w-full p-2 bg-primaryColor text-white rounded-lg font-medium text-lg flex flex-col items-center justify-center gap-2"
              : "w-full p-2 flex flex-col items-center justify-center gap-2 transition-colors ease-in-out duration-300 hover:bg-primaryColor bg-primaryColor bg-opacity-20 hover:bg-opacity-100 rounded-lg hover:text-white hover:font-medium text-lg"
          }
        >
          <FiSettings size={20} />
          تنظیمات حساب
        </NavLink>
      </div>
    </div>
  );
};

export default Profile;
