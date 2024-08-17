import React from "react";
import "../css/content.scss";
import img5 from "../assets/dashboard11.png";

const Content = () => {
  return (
    <div className="flex flex-wrap py-5 gap-5">
      <div className="flex flex-col gap-5 w-full">
        <div className="px-3">
          <img
            src={img5}
            alt="Dashboard Image"
            className="shadow-xl rounded-md w-full aspect-auto min-w-[300px] min-h-[200px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
