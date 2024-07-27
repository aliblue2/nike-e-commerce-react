const BannersSec = ({ banners }) => {
  return (
    <div className="grid grid-cols-2 my-8 md:grid-cols-3 gap-2 p-2 ">
      {banners?.map((banner) => {
        return (
          <img
            src={banner.image}
            key={banner.id}
            alt="banners"
            className="p-[1px] bg-primaryColor bg-opacity-15 rounded-lg "
          />
        );
      })}
    </div>
  );
};

export default BannersSec;
