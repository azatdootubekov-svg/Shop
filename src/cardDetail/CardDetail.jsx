import React from "react";

const CardDetail = ({ el }) => {
  // ЗАЩИТА: Если данные еще не пришли или el равен undefined,
  // приложение не упадет, а просто покажет этот текст, пока данные загружаются.
  if (!el) {
    return <div className="loading">Загрузка данных товара...</div>;
  }

  return (
    <div>
      <div className="shopCard">
        <img src={el.productUrl} alt={el.productName} width={200} />
        <p>{el.productDescription}</p>
        <h2>{el.productName}</h2>
        <h3>{el.productPrice} сом</h3>
        {/* <SlBasket size={30} onClick={() => addBasket(el)} /> */}
      </div>
    </div>
  );
};

export default CardDetail;
