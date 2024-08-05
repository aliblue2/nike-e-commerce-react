import { useCallback, useRef, useState } from "react";
import { FiMessageSquare, FiUser } from "react-icons/fi";

import CommentImage from "../../images/comment.png";
import CommentModal from "./CommentModal";
import SecondaryButton from "../common/SecondaryButton";
const Comments = ({ comments }) => {
  const [count, setCount] = useState(5);
  const modal = useRef();
  const openModalHandler = useCallback(() => {
    modal.current.open();
  }, []);
  return (
    <>
      <CommentModal ref={modal} />
      <section className="w-full relative grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        <aside className="flex flex-col items-center justify-start gap-5">
          <img
            src={CommentImage}
            alt="comment"
            className="mix-blend-multiply"
          />
          <button
            onClick={openModalHandler}
            className="bg-primaryColor rounded-lg p-2 text-white w-full font-medium text-lg flex items-center justify-center gap-5"
          >
            افزودن نظر
            <FiMessageSquare size={24} />
          </button>
        </aside>
        <main className="w-full flex flex-col items-center justify-start gap-5 col-span-1 md:col-span-2">
          {comments.length > 0
            ? comments.slice(0, count).map((comment) => {
                return (
                  <div
                    key={comment.id}
                    className="bg-white overflow-hidden w-full shadow-md rounded-lg p-4 border-t-2 border-primaryColor"
                  >
                    <div className="flex w-full flex-col items-start justify-start gap-2">
                      <div className="w-full flex items-center justify-between gap-5">
                        <span className="text-accentColor text-sm flex items-center justify-center gap-2">
                          <FiUser
                            size={24}
                            className="bg-primaryColor rounded-full p-[1px] text-whiteColor"
                          />
                          {comment.author.email}
                        </span>
                        <span className="text-accentColor text-sm">
                          {comment.date}
                        </span>
                      </div>
                      <h6 className="text-base font-medium">{comment.title}</h6>
                      <p className="text-sm font-medium">{comment.content}</p>
                    </div>
                  </div>
                );
              })
            : "هنوز نظری درباره این محصول ثبت نشده است.!"}
          {count < comments.length ? (
            <SecondaryButton
              onClick={() => setCount((prevValue) => prevValue + 5)}
            >
              دیدن نظرات بیشتر
            </SecondaryButton>
          ) : (
            ""
          )}
        </main>
      </section>
    </>
  );
};

export default Comments;
