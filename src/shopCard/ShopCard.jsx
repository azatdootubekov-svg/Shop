import { useContext } from "react";
import "./ShopCard.css";
import { shopContext } from "../context";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const ShopCard = ({ el }) => {
  const { setBasket } = useContext(shopContext);

  // const deleteProduct = async (_id) => {
  //   console.log("ID:", _id);

  //   try {
  //     await axios.delete(
  //       `https://api-crud.elcho.dev/api/v1/8f745-00609-0d0ac/shop/${_id}`,
  //     );

  //     alert("Товар успешно удалён!");
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Ошибка при удалении:", error);
  //   }
  // };

  function addBasket(item) {
    let res = JSON.parse(localStorage.getItem("basket")) || [];
    let result = [...res, item];

    setBasket(result);
    localStorage.setItem("basket", JSON.stringify(result));
  }

  return (
    <div className="ShopHeader">
      <div className="shopCard">
        <Link to={"/cardDetail"}>
          <img src={el.productUrl} alt="img" width={200} />
        </Link>

        <p>{el.productDescription}</p>

        <h2>{el.productName}</h2>

        <div className="basketCard">
          <h3>{el.productPrice} сом</h3>

          <FaPlus size={30} onClick={() => addBasket(el)} />
        </div>

        {/* <button onClick={() => deleteProduct(el._id)}>Удалить</button> */}
      </div>
    </div>
  );
};

export default ShopCard;
