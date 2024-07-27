import Skeleton from "react-loading-skeleton";

const BannersSkeleton = () => {
  const examArray = Array(3).fill(1);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 my-8">
      {examArray?.map((_, i) => (
        <Skeleton className="w-full h-32 md:h-44 rounded-lg" highlightColor="#80CBC4" key={i} />
      ))}
    </div>
  );
};

export default BannersSkeleton;
