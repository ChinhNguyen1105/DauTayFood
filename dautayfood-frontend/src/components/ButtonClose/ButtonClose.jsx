import React from "react";
import './ButtonClose.css'
import closeMark from '../../assets/close-mark.png'

const ButtonClose = ({ onClick }) => {
    return (
        <div className="close-button">
            <button onClick={onClick}>
                <img src={closeMark} alt="Đóng" />
            </button>
        </div>
    );
};

export default ButtonClose;