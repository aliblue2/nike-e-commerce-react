import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { getAccessToken } from "../../utils/Auth";
import { baseurl } from "../../App";
import { toast } from "react-toastify";

const CommentModal = forwardRef(function CommentModal({ ...props }, ref) {
  const dialog = useRef();
  const title = useRef();
  const content = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const pathName = window.location.pathname;
    const pathSegment = pathName.split("/");
    const id = pathSegment[pathSegment.length - 1];
    const token = getAccessToken();

    if (
      !token ||
      token === null ||
      token === undefined ||
      token == "EXPIERED"
    ) {
      window.location.replace("/auth?mode=login");
    }
    const data = {
      title: title.current.value,
      content: content.current.value,
      product_id: id,
    };
    const response = await fetch(baseurl + "/comment/add", {
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      method: "post",
    });

    if (response.status === 422 || response.status === 401) {
      const result = await response.json();
      toast.error(result.message);
      return;
    }

    toast.success("نظر شما با موفقیت ثبت شد.");
    title.current.value = "";
    content.current.value = "";
    dialog.current.close();
  };

  return createPortal(
    <dialog
      ref={dialog}
      className="p-5 backdrop:bg-primaryColor backdrop:bg-opacity-10 rounded-lg shadow-xl w-full md:max-w-[500px]"
    >
      <form
        onSubmit={formSubmitHandler}
        className="w-full flex flex-col items-start justify-start gap-5"
      >
        <label htmlFor="title" className="text-accentColor font-medium">
          عنوان نظر شما :
        </label>
        <input
          ref={title}
          type="text"
          name="title"
          id="title"
          placeholder="مثال : بسیار عالی!!"
          className="w-full p-2 border border-primaryColor outline-none rounded-lg focus:bg-gray-50 shadow-md focus:shadow-emerald-200 transition-colors duration-300"
        />
        <label htmlFor="content" className="text-accentColor font-medium">
          عنوان نظر شما :
        </label>
        <textarea
          ref={content}
          rows={5}
          name="content"
          id="content"
          className="w-full p-2 border border-primaryColor outline-none rounded-lg focus:bg-gray-50 shadow-md focus:shadow-emerald-200 transition-colors duration-300"
          placeholder="مثال :کفش اورجینال است  !!"
        />
        <div className="w-full flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => dialog.current.close()}
            className="bg-primaryColor bg-opacity-20 text-primaryColor hover:bg-primaryColor transition-colors duration-300 rounded-lg p-2 hover:text-white w-full  flex items-center justify-center gap-2"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="bg-primaryColor hover:bg-accentColor rounded-lg p-2 text-white w-full flex items-center justify-center gap-2"
          >
            افزودن نظر
          </button>
        </div>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CommentModal;
