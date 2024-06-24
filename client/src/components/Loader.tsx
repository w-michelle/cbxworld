import React from "react";
import { MoonLoader } from "react-spinners";

const Loader = () => {
  return (
    <div>
      <div className="h-[70vh] flex flex-col justify-center items-center">
        <MoonLoader size={40} color="white" />
      </div>
    </div>
  );
};

export default Loader;
