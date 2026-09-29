import React, { useContext } from "react";
import { shopContext } from "../context";
import ShopCard from "../shopCard/ShopCard";
import "./Electronicss.css";

const Electronicss = () => {
  const { shop } = useContext(shopContext);
  return (
    <div className="container">
      <div className="electrShop">
        {shop
          .filter((el) => el.productDescription === "Электроника")
          .map((el) => (
            <ShopCard el={el} key={el._id} />
          ))}
      </div>
    </div>
  );
};

export default Electronicss;
