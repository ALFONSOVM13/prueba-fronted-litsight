import Lottie from "lottie-react";
import pokeball from "../../../public/animations/pokeball-loading.json";

export function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Lottie
        animationData={pokeball}
        loop={true}
        style={{ width: 100, height: 100 }}
      />
    </div>
  );
}
