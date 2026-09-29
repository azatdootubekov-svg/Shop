import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profaile.css";

const Profile = () => {
  const navigate = useNavigate();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  const [activePage, setActivePage] = useState("orders");

  const [name, setName] = useState(savedUser?.name || "");
  const [email, setEmail] = useState(savedUser?.email || "");

  if (!savedUser) {
    return (
      <div className="profile-not-found">
        <h2>Вы не авторизованы</h2>

        <button onClick={() => navigate("/login")}>Войти</button>
      </div>
    );
  }

  // Выход
  const logout = () => {
    localStorage.removeItem("isAuth");
    navigate("/login");
  };

  // Сохранение профиля
  const saveProfile = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Заполните все поля");
      return;
    }

    const updatedUser = {
      ...savedUser,
      name: name,
      email: email,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Профиль сохранён");

    // Перезагружаем страницу, чтобы данные обновились везде
    window.location.reload();
  };

  // Получаем заказы
  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

  const orders = allOrders.filter(
    (order) => order.userEmail === savedUser.email,
  );
  return (
    <div className="profile-page">
      {/* ЛЕВАЯ ЧАСТЬ */}

      <div className="profile-sidebar">
        <div className="avatar">
          {name ? name.charAt(0).toUpperCase() : "U"}
        </div>

        <h2>{name}</h2>

        <p>{email}</p>

        <div className="profile-menu">
          <button
            className={activePage === "orders" ? "active" : ""}
            onClick={() => setActivePage("orders")}
          >
            📦 Мои заказы
          </button>

          <button
            className={activePage === "profile" ? "active" : ""}
            onClick={() => setActivePage("profile")}
          >
            ⚙️ Профиль
          </button>

          <button className="logout" onClick={logout}>
            ↪ Выйти
          </button>
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ */}

      <div className="orders">
        {/* ==================== */}
        {/* МОИ ЗАКАЗЫ */}
        {/* ==================== */}

        {activePage === "orders" && (
          <div>
            <h1>История заказов</h1>

            {orders.length === 0 ? (
              <div className="empty-orders">
                <h3>У вас пока нет заказов</h3>

                <p>Добавьте товары в корзину и оформите заказ.</p>

                <button onClick={() => navigate("/catalog")}>
                  Перейти в каталог
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div className="order" key={order.id}>
                  <div>
                    <h3>№ {order.id}</h3>

                    <p>
                      {order.date} · {order.count} товаров · {order.total} с
                    </p>
                  </div>

                  <span className={`status ${order.statusClass || "new"}`}>
                    {order.status || "Новый"}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* ==================== */}
        {/* ПРОФИЛЬ */}
        {/* ==================== */}

        {activePage === "profile" && (
          <div className="profile-settings">
            <h1>Профиль</h1>

            <form onSubmit={saveProfile}>
              <div className="profile-field">
                <label>Имя</label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите имя"
                />
              </div>

              <div className="profile-field">
                <label>Email</label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введите email"
                />
              </div>

              <button className="save-profile" type="submit">
                Сохранить изменения
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
