import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { shopContext } from "../context";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { basket, setBasket } = useContext(shopContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState("");

  const [delivery, setDelivery] = useState("courier");
  const [payment, setPayment] = useState("cash");

  const [emailError, setEmailError] = useState("");

  const totalItems = basket.reduce((sum, el) => sum + (el.quantity || 1), 0);

  const totalPrice = basket.reduce(
    (sum, el) => sum + Number(el.productPrice || 0) * (el.quantity || 1),
    0,
  );

  const checkEmail = (value) => {
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value && !emailRegex.test(value)) {
      setEmailError("Введите корректный email");
    } else {
      setEmailError("");
    }
  };

  const confirmOrder = () => {
    if (!name.trim()) {
      alert("Введите ФИО");
      return;
    }

    if (!phone.trim()) {
      alert("Введите телефон");
      return;
    }

    if (!email.trim()) {
      alert("Введите Email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Введите корректный email");
      return;
    }

    if (!address.trim()) {
      alert("Введите адрес доставки");
      return;
    }

    if (basket.length === 0) {
      alert("Корзина пуста");
      navigate("/basket");
      return;
    }

    // Получаем старые заказы
    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now().toString().slice(-6),

      // Пользователь
      userEmail: user?.email || email,
      userName: name,
      phone: phone,
      email: email,

      // Доставка
      address: address,
      delivery: delivery,

      // Оплата
      payment: payment,

      // Заказ
      date: new Date().toLocaleDateString("ru-RU"),
      count: totalItems,
      total: totalPrice,

      status: "Новый",
      statusClass: "new",

      products: basket.map((el) => ({
        id: el._id,
        name: el.productName,
        price: Number(el.productPrice),
        quantity: el.quantity || 1,
        image: el.productUrl,
      })),
    };

    localStorage.setItem("orders", JSON.stringify([...oldOrders, newOrder]));

    // Очищаем корзину
    setBasket([]);
    localStorage.setItem("basket", JSON.stringify([]));

    // alert("Заказ успешно оформлен!");

    // Переходим в профиль
    navigate("/success", {
      state: {
        orderId: newOrder.id,
      },
    });
  };

  return (
    <div className="checkout-page">
      {/* ЛЕВАЯ ЧАСТЬ */}
      <div className="checkout-left">
        <h1>Данные получателя</h1>

        <label>ФИО</label>
        <label className="kg-label">Аты-жөнү</label>

        <input
          type="text"
          placeholder="Иван Иванов"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Телефон</label>

        <input
          type="text"
          placeholder="+996 700 123 456"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label>Email</label>

        <input
          className={emailError ? "input-error" : ""}
          type="email"
          placeholder="ivan@mail.com"
          value={email}
          onChange={(e) => checkEmail(e.target.value)}
        />

        {emailError && <p className="error-text">{emailError}</p>}

        <label>Адрес доставки</label>
        <label className="kg-label">Жеткирүү дареги</label>

        <input
          type="text"
          placeholder="г. Бишкек, ул. Чуй 1"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* ДОСТАВКА */}
        <h2>Способ доставки</h2>

        <div className="options">
          <button
            className={
              delivery === "courier" ? "option active-option" : "option"
            }
            onClick={() => setDelivery("courier")}
          >
            🚚
            <span>Курьер</span>
          </button>

          <button
            className={
              delivery === "pickup" ? "option active-option" : "option"
            }
            onClick={() => setDelivery("pickup")}
          >
            🏬
            <span>Самовывоз</span>
          </button>
        </div>

        {/* ОПЛАТА */}
        <h2>Оплата</h2>

        <div className="options">
          <button
            className={payment === "cash" ? "option active-option" : "option"}
            onClick={() => setPayment("cash")}
          >
            💵
            <span>Наличными</span>
          </button>

          <button
            className={payment === "card" ? "option active-option" : "option"}
            onClick={() => setPayment("card")}
          >
            💳
            <span>Картой при получении</span>
          </button>
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ */}
      <div className="checkout-right">
        <h2>Ваш заказ</h2>

        {basket.map((el) => (
          <div className="checkout-product" key={el._id}>
            <div className="product-name">
              {el.productName} × {el.quantity || 1}
            </div>

            <div className="product-price">
              {(Number(el.productPrice) * (el.quantity || 1)).toLocaleString(
                "ru-RU",
              )}{" "}
              с
            </div>
          </div>
        ))}

        <div className="delivery-row">
          <span>Доставка</span>
          <span>бесплатно</span>
        </div>

        <div className="checkout-line"></div>

        <div className="total-row">
          <span>Итого</span>

          <strong>{totalPrice.toLocaleString("ru-RU")} с</strong>
        </div>

        <button className="confirm-order" onClick={confirmOrder}>
          Подтвердить заказ
        </button>
      </div>
    </div>
  );
};

export default Checkout;
