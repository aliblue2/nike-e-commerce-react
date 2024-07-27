import { Form, useNavigation } from "react-router-dom";
const Login = () => {
  const isSubmitting = useNavigation().state === "submitting";
  return (
    <Form
      method="post"
      className="flex flex-col items-start justify-start gap-3 w-full  mx-auto p-5"
    >
      <h6 className="text-xl w-full text-center font-medium text-primaryColor">
        ورود به حساب کاربری
      </h6>
      <label
        htmlFor="username"
        className="text-primaryColor font-medium text-lg"
      >
        ایمیل
      </label>
      <input
        type="email"
        className="w-full rounded-lg bg-white border border-dividerColor focus:border-primaryColor p-2 focus:shadow-md focus:shadow-emerald-200 outline-none transition-all ease-in-out duration-300"
        name="username"
        placeholder="nike@example.com"
      />
      <label htmlFor="email" className="text-primaryColor font-medium text-lg">
        رمز عبور
      </label>
      <input
        type="password"
        className="w-full rounded-lg bg-white border border-dividerColor focus:border-primaryColor p-2 focus:shadow-md focus:shadow-emerald-200 outline-none transition-all ease-in-out duration-300"
        name="password"
        placeholder="رمز عبور شما"
      />

      <input
        disabled={isSubmitting ? true : false}
        type="submit"
        value={isSubmitting ? "در حال ورود ..." : "ورود به حساب"}
        className={
          isSubmitting
            ? "bg-gray-300 text-gray-500 w-full font-medium p-2 rounded-lg"
            : "bg-primaryColor hover:bg-accentColor font-medium text-whiteColor w-full p-2 rounded-lg "
        }
      />
    </Form>
  );
};

export default Login;
