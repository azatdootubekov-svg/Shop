import React, { useContext } from "react";
import { shopContext } from "../context";
import { IoMdClose } from "react-icons/io";
import "./Basket.css";
import { Link, useNavigate } from "react-router-dom";

const Basket = () => {
  const { basket, setBasket } = useContext(shopContext);

  const navigate = useNavigate();

  // Удалить товар
  function deletProduct(proId) {
    const newBasket = basket.filter((el) => el._id !== proId);

    setBasket(newBasket);

    localStorage.setItem("basket", JSON.stringify(newBasket));
  }

  // Изменить количество
  function changeQuantity(proId, amount) {
    const newBasket = basket.map((el) => {
      if (el._id === proId) {
        const newQty = (el.quantity || 1) + amount;

        return {
          ...el,
          quantity: newQty < 1 ? 1 : newQty,
        };
      }

      return el;
    });

    setBasket(newBasket);

    localStorage.setItem("basket", JSON.stringify(newBasket));
  }

  // Количество товаров
  const totalItemsCount = basket.reduce(
    (sum, el) => sum + (el.quantity || 1),
    0,
  );

  // Общая цена
  const totalCartPrice = basket.reduce(
    (sum, el) => sum + Number(el.productPrice) * (el.quantity || 1),
    0,
  );

  return (
    <div className="basKet">
      <div className="cart-container">
        {/* ЛЕВАЯ ЧАСТЬ */}

        <div className="cart-main">
          <h1 className="cart-title">Корзина ({totalItemsCount} товара)</h1>

          <div className="cart-list">
            {basket.length === 0 ? (
              /* ПУСТАЯ КОРЗИНА */

              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>

                <h2>Корзина пуста</h2>

                <p>Добавьте товары в корзину, чтобы оформить заказ.</p>

                <Link to="/catalog" className="empty-cart-button">
                  Перейти в каталог
                </Link>
              </div>
            ) : (
              /* ТОВАРЫ */

              basket.map((el, index) => (
                <div className="cart-item" key={`${el._id}-${index}`}>
                  {/* Изображение */}

                  <div className="item-img-box">
                    <img src={el.productUrl} alt={el.productName} />
                  </div>

                  {/* Информация */}

                  <div className="item-details">
                    <h2>{el.productName}</h2>

                    <span className="item-sku">SKU: {el.sku || "NK-001"}</span>

                    <button
                      className="btn-delete"
                      onClick={() => deletProduct(el._id)}
                    >
                      <IoMdClose />
                      Удалить / Өчүрүү
                    </button>
                  </div>

                  {/* Количество */}

                  <div className="item-quantity">
                    <button onClick={() => changeQuantity(el._id, -1)}>
                      −
                    </button>

                    <span>{el.quantity || 1}</span>

                    <button onClick={() => changeQuantity(el._id, 1)}>+</button>
                  </div>

                  {/* Цена */}

                  <div className="item-price">
                    {(
                      Number(el.productPrice) * (el.quantity || 1)
                    ).toLocaleString("ru-RU")}

                    <span> с</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ */}

        <div className="cart-summary">
          <h2>Итого</h2>

          <div className="summary-row">
            <span>Товары ({totalItemsCount})</span>

            <span className="summary-value">
              {totalCartPrice.toLocaleString("ru-RU")} с
            </span>
          </div>

          <div className="summary-row">
            <span>Доставка</span>

            <span className="summary-value free-delivery">Бесплатно</span>
          </div>

          <div className="summary-total-line">
            <span>К оплате</span>

            <span className="total-price">
              {totalCartPrice.toLocaleString("ru-RU")} с
            </span>
          </div>

          {/* Оформить заказ */}

          <button
            className="btn-checkout"
            onClick={() => navigate("/checkout")}
            disabled={basket.length === 0}
          >
            Оформить заказ
          </button>

          {/* В каталог */}

          <Link to="/catalog">
            <button className="btn-continue-shopping">← В каталог</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Basket;
