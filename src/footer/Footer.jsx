import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div id="footer">
      <div className="">
        <div className="footer">
          <div className="ShopFooter">
            <h1>Shop</h1>
            <h3>О магазине</h3>
            <h3>Контакты</h3>
          </div>
          <div className="ShopFooter">
            <h1>Покупателям</h1>
            <h3>Доставка</h3>
            <h3>Доставка</h3>
          </div>

          <div className="ShopFooter">
            <h1>Помощь</h1>
            <h3>FAQ</h3>
            <h3>Возврат</h3>
          </div>

          <div className="ShopFooter">
            <h1>Контакты</h1>
            <h3>+996 700 000 000</h3>
            <h3>info@shop.kg</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
