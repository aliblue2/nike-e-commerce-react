import Lottie from "lottie-react";
import loadingAnime from "../lottie/loading.json";
const LoadingPage = () => {
  return (
    <div className="flex min-h-screen items-center p-5 justify-center bg-whiteColor">
      <Lottie
        animationData={loadingAnime}
        width={900}
        height={900}
        loop={true}
      />
    </div>
  );
};

export default LoadingPage;
