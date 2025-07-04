import React from "react";
import "./ButtonCart.css";

const ButtonCart = ({ onClick, children = "Thêm vào giỏ hàng" }) => (
  <button className="btn-cart" onClick={onClick}>
    {children}
  </button>
);

export default ButtonCart;