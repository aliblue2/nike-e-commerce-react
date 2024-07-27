const PrimaryButton = ({ children, ...props }) => {
  return (
    <button
      className="w-full md:w-fit flex items-center justify-center gap-2 text-whiteColor bg-primaryColor hover:bg-accentColor  rounded-lg transition-colors duration-300 md:py-2 md:px-4 py-2 px-1"
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
