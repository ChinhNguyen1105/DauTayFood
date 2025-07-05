import './ButtonTry.css'
import React from 'react'

const button = ({ onClick }) => {

  return (

    <button className="form-button" onClick={onClick}>
      mua ngay
    </button>

  );
}
export default button;
