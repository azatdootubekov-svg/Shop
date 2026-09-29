import React, { useEffect, useState } from "react";
import { shopContext } from ".";
import axios from "axios";

const RootContext = ({ children }) => {
  const [shop, setShop] = useState([]);
  const [basket, setBasket] = useState([]);
  const [search, SetSearch] = useState("");

  async function getShop() {
    let res = await axios(
      `https://api-crud.elcho.dev/api/v1/8f745-00609-0d0ac/shop`,
    );

    let { data } = res.data;
    setShop(data);
  }
  async function getBasket() {
    let res = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(res);
  }

  useEffect(() => {
    getShop();
    getBasket();
  }, []);
  return (
    <shopContext.Provider
      value={{ shop, setShop, basket, setBasket, search, SetSearch }}
    >
      {children}
    </shopContext.Provider>
  );
};

export default RootContext;
