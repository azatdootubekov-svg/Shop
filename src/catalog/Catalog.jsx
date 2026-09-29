import React, { useContext, useState, useEffect } from "react";
import "./Catalog.css";
import { shopContext } from "../context";
import ShopCard from "../shopCard/ShopCard";

const Catalog = () => {
  const { shop, search } = useContext(shopContext);

  // Категории
  const [categories, setCategories] = useState([]);

  // Цена
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Наличие
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Сортировка
  const [sort, setSort] = useState("");

  // Применённые фильтры
  const [appliedFilters, setAppliedFilters] = useState({
    categories: [],
    minPrice: "",
    maxPrice: "",
    onlyAvailable: false,
  });

  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);

  // Сколько товаров на одной странице
  const productsPerPage = 3;

  // Выбор категории
  const handleCategory = (category) => {
    setCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      }

      return [...prev, category];
    });
  };

  // Применить фильтры
  const applyFilters = () => {
    setAppliedFilters({
      categories: categories,
      minPrice: minPrice,
      maxPrice: maxPrice,
      onlyAvailable: onlyAvailable,
    });

    // После фильтра возвращаемся на первую страницу
    setCurrentPage(1);
  };

  // Фильтрация
  let filteredShop = shop.filter((el) => {
    // Поиск
    const productName = el.productName || "";

    const matchesSearch = productName
      .toLowerCase()
      .includes((search || "").toLowerCase());

    // Категория
    const matchesCategory =
      appliedFilters.categories.length === 0 ||
      appliedFilters.categories.includes(el.productDescription);

    // Цена
    const price = Number(el.productPrice) || 0;

    const matchesMinPrice =
      appliedFilters.minPrice === "" ||
      price >= Number(appliedFilters.minPrice);

    const matchesMaxPrice =
      appliedFilters.maxPrice === "" ||
      price <= Number(appliedFilters.maxPrice);

    // Наличие
    const matchesAvailable =
      !appliedFilters.onlyAvailable ||
      el.quantity > 0 ||
      el.stock > 0 ||
      el.available === true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesAvailable
    );
  });

  // Сортировка
  if (sort === "cheap") {
    filteredShop.sort(
      (a, b) => Number(a.productPrice) - Number(b.productPrice)
    );
  }

  if (sort === "expensive") {
    filteredShop.sort(
      (a, b) => Number(b.productPrice) - Number(a.productPrice)
    );
  }

  // Общее количество страниц
  const totalPages = Math.ceil(
    filteredShop.length / productsPerPage
  );

  // Если после фильтра текущая страница стала больше существующих
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Индексы товаров
  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredShop.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Переключение страницы
  const changePage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);

    // Прокрутка вверх к товарам
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div id="catalog">
      <div className="container">

        <div className="catalog-layout">

          {/* ФИЛЬТРЫ */}

          <div className="Filter">

            <h1>Фильтры</h1>

            <div className="categories">

              <h2>КАТЕГОРИЯ</h2>

              <label>
                <input
                  type="checkbox"
                  checked={categories.includes("Электроника")}
                  onChange={() =>
                    handleCategory("Электроника")
                  }
                />
                Электроника
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={categories.includes("Одежда")}
                  onChange={() =>
                    handleCategory("Одежда")
                  }
                />
                Одежда
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={categories.includes("Обувь")}
                  onChange={() =>
                    handleCategory("Обувь")
                  }
                />
                Обувь
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={categories.includes("Для дома")}
                  onChange={() =>
                    handleCategory("Для дома")
                  }
                />
                Для дома
              </label>

            </div>

            {/* ЦЕНА */}

            <h2>ЦЕНА, СОМ</h2>

            <div className="inputPrice">

              <input
                type="number"
                placeholder="от / баштап"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(e.target.value)
                }
              />

              <input
                type="number"
                placeholder="до / чейин"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value)
                }
              />

            </div>

            {/* НАЛИЧИЕ */}

            <div className="categories">

              <h2>НАЛИЧИЕ</h2>

              <label>
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) =>
                    setOnlyAvailable(e.target.checked)
                  }
                />

                В наличии
              </label>

            </div>

            <button
              className="btn-apply"
              onClick={applyFilters}
            >
              Применить
            </button>

          </div>

          {/* ТОВАРЫ */}

          <div className="catalog-products">

            <div className="products-header">

              <span>
                Найдено {filteredShop.length} товаров
              </span>

              <select
                className="sort-select"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">
                  Сортировка
                </option>

                <option value="cheap">
                  Сначала дешёвые
                </option>

                <option value="expensive">
                  Сначала дорогие
                </option>
              </select>

            </div>

            {/* КАРТОЧКИ */}

            <div className="products">

              {currentProducts.length > 0 ? (

                currentProducts.map((el) => (
                  <ShopCard
                    el={el}
                    key={el._id}
                  />
                ))

              ) : (

                <div className="no-products">
                  Товары не найдены
                </div>

              )}

            </div>

            {/* ПАГИНАЦИЯ */}

            {totalPages > 1 && (

              <div className="pagination">

                {/* Назад */}

                <button
                  onClick={() =>
                    changePage(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>

                {/* Номера страниц */}

                {Array.from(
                  { length: totalPages },
                  (_, index) => (
                    <button
                      key={index + 1}
                      className={
                        currentPage === index + 1
                          ? "active-page"
                          : ""
                      }
                      onClick={() =>
                        changePage(index + 1)
                      }
                    >
                      {index + 1}
                    </button>
                  )
                )}

                {/* Вперёд */}

                <button
                  onClick={() =>
                    changePage(currentPage + 1)
                  }
                  disabled={
                    currentPage === totalPages
                  }
                >
                  &gt;
                </button>

              </div>

            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Catalog;