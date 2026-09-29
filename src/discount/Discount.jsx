import React, { useContext } from "react";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { shopContext } from "../context";
import ShopCard from "../shopCard/ShopCard";

const Discount = () => {
  const { shop } = useContext(shopContext);
  return (
    <div>
      <div className="Discount">
        <div className="sezon">
          <h1>Скидки до −50%</h1>
          <p>
            Сезонная распродажа на популярные категории. <br />
            Успей купить!
          </p>
          <Link to={"/catalog"}>В каталог</Link>
        </div>
        <h4>🔥</h4>
      </div>

      <div className="categoriesHeader">
        <div className="container">
          <div className="categoriesHeader">
            <div className="categoriesss">
              <h1>Категории</h1>
              <Link to={"/catalog"}>Все →</Link>
            </div>

            <div className="categ">
              <Link to={"/electronicss"}>
                <div className="categoriesCard">
                  <h5>📱</h5>
                  <h3>Электроника</h3>
                </div>
              </Link>

              <Link to={"/clothes"}>
                <div className="categoriesCard">
                  <h5>👕</h5>
                  <h3>Одежда </h3>
                </div>
              </Link>

              <Link to={"/shoes"}>
                <div className="categoriesCard">
                  <h5>👟</h5>
                  <h3>Обувь</h3>
                </div>
              </Link>

              <Link>
                {" "}
                <div className="categoriesCard">
                  <h5>🏠</h5>
                  <h3>Для дома</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="POPproduct">
        <div className="container">
          <div className="POPproduct">
            <div className="categoriesss">
              <h2>Популярные товары</h2>
              <Link to={"/catalog"}>Все →</Link>
            </div>
            <div className="popularProduct">
              {" "}
              {[...shop]
                .sort(() => Math.random() - 0.5)
                .slice(0, 4)
                .map((el) => (
                  <ShopCard el={el} key={el._id} />
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Discount;
