const SecondaryButton = ({ children, ...props }) => {
  return (
    <button
      className="w-full md:w-fit flex rounded-lg items-center justify-center gap-2 text-primaryColor font-medium bg-primaryColor bg-opacity-15 hover:bg-primaryColor hover:text-whiteColor transition-colors duration-300 md:py-2 md:px-4 py-2 px-1"
      {...props}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
