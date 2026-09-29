import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Получаем зарегистрированного пользователя
    const user = JSON.parse(localStorage.getItem("user"));

    // Если пользователь ещё не зарегистрирован
    if (!user) {
      alert("Сначала зарегистрируйтесь");
      navigate("/register");
      return;
    }

    // Проверяем Email и пароль
    if (email === user.email && password === user.password) {
      // Авторизация
      localStorage.setItem("isAuth", "true");

      // Переходим в профиль
      navigate("/profile");
    } else {
      alert("Неверный Email или пароль");
    }
  };

  return (
    <div id="login">
      <div className="login-container">
        <form className="login" onSubmit={handleLogin}>

          <span>
            <Link to="/login">Вход</Link>
            <Link to="/register">Регистрация</Link>
          </span>

          <label>Email</label>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Пароль</label>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Войти
          </button>

          <span>
            Нет аккаунта?
            <Link to="/register">Зарегистрироваться</Link>
          </span>

        </form>
      </div>
    </div>
  );
};

export default Login;