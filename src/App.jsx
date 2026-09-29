import React from "react";
import Header from "./header/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import Catalog from "./catalog/Catalog";
import Discount from "./discount/Discount";
import Basket from "./basket/Basket";
import CardDetail from "./cardDetail/CardDetail";
import Clothes from "./clothes/Clothes";
import Electronicss from "./electronicss/Electronicss";
import Shoes from "./shoes/Shoes";
import Profile from "./profile/Profile";
import Checkout from "./checkout/Checkout";
import Success from "./success/Success";

const App = () => {
  let routes = [
    {
      id: 1,
      link: "/",
      element: <Discount />,
    },
    {
      id: 2,
      link: "/login",
      element: <Login />,
    },
    {
      id: 3,
      link: "/register",
      element: <Register />,
    },
    {
      id: 4,
      link: "/catalog",
      element: <Catalog />,
    },
    // {
    //   id: 5,
    //   link: "/admin",
    //   element: <Admin />,
    // },
    {
      id: 6,
      link: "/electronicss",
      element: <Electronicss />,
    },
    {
      id: 7,
      link: "/basket",
      element: <Basket />,
    },
    {
      id: 8,
      link: "/cardDetail",
      element: <CardDetail />,
    },
    {
      id: 9,
      link: "/clothes",
      element: <Clothes />,
    },
    {
      id: 10,
      link: "/shoes",
      element: <Shoes />,
    },
    {
      id: 11,
      link: "/profile",
      element: <Profile />,
    },
    {
      id: 12,
      link: "/checkout",
      element: <Checkout />,
    },
    {
      id: 13,
      link: "/success",
      element: <Success />,
    },
  ];

  return (
    <div>
      <Header />
      <Routes>
        {routes.map((el) => (
          <Route path={el.link} element={el.element} key={el.id} />
        ))}
      </Routes>
    </div>
  );
};

export default App;
