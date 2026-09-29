import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Success.css";

const Success = () => {
  const location = useLocation();

  const orderId = location.state?.orderId || "100245";

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>

        <h1>Заказ успешно оформлен!</h1>

        <h2>№ {orderId}</h2>

        <p>
          Мы свяжемся с вами по телефону для подтверждения. Статус заказа можно
          отслеживать в личном кабинете.
        </p>

        <div className="success-buttons">
          <Link to="/profile" className="success-btn">
            Мои заказы
          </Link>

          <Link to="/header" className="success-btn home-btn">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
