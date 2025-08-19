import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ onSearch }) => {
  const [value, setValue] = useState("");
  // const [inputWidth, setInputWidth] = useState("w-[500px]"); // mặc định desktop
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (onSearch && trimmed) {
      onSearch(trimmed);
      navigate("/menu#search-linking");
    }
  };

  // Responsive width
  // useEffect(() => {
  //   const updateWidth = () => {
  //     if (window.innerWidth <= 500) {
  //       setInputWidth("w-[220px]");
  //     } else if (window.innerWidth <= 768) {
  //       setInputWidth("w-[300px]");
  //     } else {
  //       setInputWidth("w-[500px]");
  //     }
  //   };

  //   updateWidth(); // chạy ban đầu
  //   window.addEventListener("resize", updateWidth);
  //   return () => window.removeEventListener("resize", updateWidth);
  // }, []);

  return (
    <form onSubmit={handleSubmit} className={`flex shrink items-center h-10 lg:w-[500px] sm:w-[300px]`}>
      <input
        type="text"
        placeholder="Tìm kiếm món ăn..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 px-4 py-2 text-sm text-gray-700 rounded-l-full outline-none bg-white shadow-md h-full min-h-7"
      />
      <button
        type="submit"
        className=" bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded-r-full cursor-poiter text-lg h-full leading-none min-h-7 flex items-center justify-center"
      >
        <FaSearch className="sm:text-base text-lg " />
      </button>
    </form>
  );
};

export default SearchBox;
