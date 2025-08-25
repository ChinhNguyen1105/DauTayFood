import React from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../../hooks/useSearch";

const SearchBox = () => {
  const navigate = useNavigate();
  const { searchTerm, handleSearch } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleSearch(searchTerm);
      navigate("/menu#search-linking");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex shrink items-center h-10 lg:w-[500px] sm:w-[300px]"
    >
      <input
        type="text"
        placeholder="Tìm kiếm món ăn..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="flex-1 px-4 py-2 text-sm text-gray-700 rounded-l-full outline-none bg-white shadow-md h-full min-h-7"
      />
      <button
        type="submit"
        className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded-r-full cursor-pointer text-lg h-full leading-none min-h-7 flex items-center justify-center"
      >
        <FaSearch className="sm:text-base text-lg " />
      </button>
    </form>
  );
};

export default SearchBox;
