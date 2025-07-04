import React from "react";
import "./ButtonTry.css";

const ButtonTry = ({ onClick, children = "Thử ngay" }) => (
  <button className="btn-try" onClick={onClick}>
    {children}
  </button>
);

export default ButtonTry;