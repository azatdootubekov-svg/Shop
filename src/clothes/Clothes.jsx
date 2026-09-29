import React, { useContext } from "react";
import { shopContext } from "../context";
import ShopCard from "../shopCard/ShopCard";

const Clothes = () => {
  const { shop } = useContext(shopContext);
  return (
    <div className="container">
      <div className="electrShop">
        {shop
          .filter((el) => el.productDescription === "Одежда")
          .map((el) => (
            <ShopCard el={el} key={el._id} />
          ))}
      </div>
    </div>
  );
};

export default Clothes;
