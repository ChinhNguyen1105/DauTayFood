import React from 'react';
import PropTypes from 'prop-types';
import { ShoppingCart, Eye, Star, TrendingUp } from "lucide-react";

const ButtonTry = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#ff8c96] flex justify-center items-center flex-row gap-8 text-white font-bold sm:text-[1.1rem] text-sm sm:px-3 px-2 py-3 rounded-md shadow hover:bg-[#ff5c7a] transition duration-200"
    >
      <Eye size={18} />
      {children}
    </button>
  );
};

ButtonTry.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default ButtonTry;

