import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBox.css";
import { useNavigate } from "react-router-dom"; // Add this

const SearchBox = ({ onSearch }) => {
  const [value, setValue] = React.useState("");
  const navigate = useNavigate(); // Add this

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value.trim());
      navigate('/menu'); // Navigate programmatically
    }
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Tìm kiếm món ăn..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit" className="search-btn">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBox;