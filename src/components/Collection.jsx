import React from "react";
import img1 from "../assets/collection.png";


const Collection = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${img1})`,
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat xl:px-28 px-4 my-20"
      style={backgroundImageStyle}
    >
      <div className="min-h-[580px] flex justify-between md:flex-row items-center">
        <div className="md:w-1/2"></div>
        
      </div>
    </div>
  );
};

export default Collection;
