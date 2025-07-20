import './ButtonTry.css'
import React from 'react'

const Button = ({ onClick, children }) => {
  return (
    <button className="form-button" onClick={onClick}>
      {children}
    </button>

  );
}
export default Button;
