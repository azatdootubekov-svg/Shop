import React, { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { shopContext } from "../context";

const Header = () => {
  const { setSearch } = useContext(shopContext);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearchValue(value);
    setSearch(value);

    // Если пользователь начал поиск,
    // переходим в каталог
    if (value.trim() !== "") {
      navigate("/catalog");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/catalog");
    }
  };

  return (
    <div id="header">
      <div className="container">
        <div className="header">
          <div className="headerShop">
            {/* Логотип */}
            <div>
              <Link to={"/"} className="shop">
                <h1>s</h1>
                <h2>Shop</h2>
              </Link>
            </div>

            <div className="searchInput">
              {/* Админ
              <div className="admin">
                <Link to={"/admin"}>
                  <SlBasket size={25} />
                  <h4>админ</h4>
                </Link>
              </div> */}

              {/* ПОИСК */}
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchValue}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
              />

              <div className="FaSearch" onClick={() => navigate("/catalog")}>
                <FaSearch size={20} />
              </div>

              {/* Вход */}
              <div className="admin">
                <Link to={"/login"}>
                  <FaRegUserCircle size={25} />
                  <h4>войти</h4>
                </Link>
              </div>

              {/* Корзина */}
              <div className="admin">
                <Link to={"/basket"}>
                  <SlBasket size={25} />
                  <h4>корзина</h4>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Категории */}
      <div className="catalog_wrrap">
        <div className="container">
          <div className="catalog">
            <Link to={"/catalog"}>Каталог</Link>

            <Link to={"/electronicss"}>Электроника</Link>

            <Link to={"/clothes"}>Одежда</Link>

            <Link to={"/shoes"}>Обувь</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
