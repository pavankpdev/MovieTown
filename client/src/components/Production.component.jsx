import React from "react";

const ProductionCOmponent = ({ imageUrl, productionName, ...props }) => {

  return (
    <div className="">
      <center>
        <img className="w-full md:w-4/12" src={imageUrl} alt="production 1" />
        <h3 className="mt-2 uppercase text-xs text-headingColor font-bold tracking-wider lg:text-xl">
          {productionName}
        </h3>
      </center>
    </div>
  );
};

export default ProductionCOmponent;
