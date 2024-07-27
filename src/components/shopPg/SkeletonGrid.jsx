import Skeleton from "react-loading-skeleton";

const SkeletonGrid = () => {
  const examArray = Array(12).fill(1);
  return (
    <div className="w-full grid md:grid-cols-4 grid-cols-2 gap-5">
      {examArray.map((_, i) => {
        return (
          <Skeleton
            className="w-full md:h-80 h-72 rounded-lg"
            highlightColor="#80CBC4"
            key={i}
          />
        );
      })}
    </div>
  );
};

export default SkeletonGrid;
