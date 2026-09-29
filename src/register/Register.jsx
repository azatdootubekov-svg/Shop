import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Заполните все поля");
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    // Сохраняем пользователя
    localStorage.setItem("user", JSON.stringify(user));

    // Пользователь авторизован
    localStorage.setItem("isAuth", "true");

    // Переходим в личный кабинет
    navigate("/profile");
  };

  return (
    <div id="login">
      <div className="login-container">
        <form className="login" onSubmit={handleRegister}>
          <span>
            <Link to={"/login"}>Вход</Link>
            <Link>Регистрация</Link>
          </span>

          <label>Имя</label>
          <input
            type="text"
            placeholder="Иван Иванов"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button type="submit">Зарегистрироваться</button>

          <span>
            Уже есть аккаунт?
            <Link to={"/login"}>Войти</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
