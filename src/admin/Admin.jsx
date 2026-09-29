// import axios from "axios";
// import React, { useState } from "react";
// import "./Admin.css";

// const Admin = () => {
//   const [productUrl, setProductUrl] = useState("");
//   const [productName, setProductName] = useState("");
//   const [productDescription, setProductDescription] = useState("");
//   const [productPrice, setProductPrice] = useState("");

//   const createProduct = async (e) => {
//     // 1. Предотвращаем перезагрузку страницы браузером
//     if (e && e.preventDefault) e.preventDefault();

//     const newProduct = {
//       productUrl,
//       productName,
//       productDescription,
//       // 2. Преобразуем строку из инпута в число
//       productPrice: Number(productPrice),
//     };

//     console.log("Отправляем:", newProduct);

//     try {
//       const res = await axios.post(
//         "https://api-crud.elcho.dev/api/v1/8f745-00609-0d0ac/shop",
//         newProduct,
//       );

//       console.log("Ответ API:", res.data);
//       alert("Товар добавлен!");

//       // Очищаем форму после успешного добавления
//       setProductUrl("");
//       setProductName("");
//       setProductDescription("");
//       setProductPrice("");
//     } catch (error) {
//       console.error("ОШИБКА:", error);
//       console.log("ОТВЕТ ОШИБКИ:", error.response?.data);
//       alert(`Ошибка: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   return (
//     <div className="admin">
//       <input
//         type="text"
//         placeholder="Product Url"
//         value={productUrl}
//         onChange={(e) => setProductUrl(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="Product Name"
//         value={productName}
//         onChange={(e) => setProductName(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="Product Description"
//         value={productDescription}
//         onChange={(e) => setProductDescription(e.target.value)}
//       />

//       <input
//         type="number"
//         placeholder="Product Price"
//         value={productPrice}
//         onChange={(e) => setProductPrice(e.target.value)}
//       />

//       <div className="adminBTN">
//         <button onClick={(e) => createProduct(e)}>Create</button>
//       </div>
//     </div>
//   );
// };

// export default Admin;
