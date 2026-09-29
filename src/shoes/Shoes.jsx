import React, { useContext } from "react";
import { shopContext } from "../context";
import ShopCard from "../shopCard/ShopCard";

const Shoes = () => {
  const { shop } = useContext(shopContext);
  return (
    <div className="container">
      <div className="electrShop">
        {shop
          .filter((el) => el.productDescription === "Обувь")
          .map((el) => (
            <ShopCard el={el} key={el._id} />
          ))}
      </div>
    </div>
  );
};

export default Shoes;
