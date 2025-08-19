import React from "react";
import closeMark from '../../assets/close-mark.png'

const ButtonClose = ({ onClick }) => {
    return (
        <div className="close-button text-black w-5 h-5">
            <button onClick={onClick}>
                <img src={closeMark} alt="Đóng" />
            </button>
        </div>
    );
};

export default ButtonClose;