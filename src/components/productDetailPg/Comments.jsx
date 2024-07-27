import { useState } from "react";
import { FiUser } from "react-icons/fi";
import SecondaryButton from "../common/SecondaryButton";
import { Form } from "react-router-dom";
import PrimaryButton from "../common/PrimaryButton";

const Comments = ({ comments }) => {
  const [count, setCount] = useState(5);
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
      <div className=" col-span-1 h-fit sticky top-0">
        <Form className="flex flex-col w-full items-start justify-start gap-3 sticky top-0">
          <label
            htmlFor="titleForm"
            className="text-primaryColor font-medium text-lg"
          >
            عنوان نظر
          </label>
          <input
            type="text"
            className="w-full rounded-lg bg-white border border-dividerColor focus:border-primaryColor p-2 focus:shadow-md focus:shadow-emerald-200 outline-none transition-all ease-in-out duration-300"
            name="titleForm"
            placeholder=" عنوان نظر شما "
          />
          <label
            htmlFor="captionForm"
            className="text-primaryColor font-medium text-lg"
          >
            توضیحات نظر
          </label>
          <textarea
            className="w-full rounded-lg bg-white border border-dividerColor focus:border-primaryColor p-2 focus:shadow-md focus:shadow-emerald-200 outline-none transition-all ease-in-out duration-300"
            name="captionForm"
            rows={5}
            placeholder=" توضیحات شما درباره محصول "
          />
          <PrimaryButton >
            ثبت نظر
          </PrimaryButton>
        </Form>
      </div>
      <div className="md:col-span-2 col-span-1 w-full flex flex-col items-center justify-start gap-5">
        {comments && comments.length > 0
          ? comments.slice(0, count).map((comment) => {
              return (
                <div
                  key={comment.id}
                  className="p-3 bg-white w-full border border-dashed border-dividerColor flex flex-col items-start rounded-lg justify-around gap-2"
                >
                  <span className="flex items-center justify-start gap-2 text-sm text-primaryColor">
                    <FiUser
                      size={24}
                      className="bg-primaryColor rounded-full text-whiteColor p-[1px]"
                    />
                    {comment.author.email}
                  </span>
                  <h6 className="font-medium text-lg">{comment.title}</h6>
                  <span className="line-clamp-3 font-medium">
                    {comment.content}
                  </span>
                  <span className="text-sm text-primaryColor">
                    {comment.date}
                  </span>
                </div>
              );
            })
          : ""}

        {comments && count >= comments.length ? (
          ""
        ) : (
          <SecondaryButton
            onClick={() => setCount((prevCount) => (prevCount += 5))}
          >
            دیدن نظرات بیشتر{" "}
          </SecondaryButton>
        )}
      </div>
    </div>
  );
};

export default Comments;
