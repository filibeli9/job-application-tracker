import { useState } from "react";
import "./SortBar.css";

const options = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "company-asc", label: "Company A-Z" },
  { value: "company-desc", label: "Company Z-A" },
];

function SortBar({ sortOption, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption =
    options.find((option) => option.value === sortOption) || options[0];

  const handleSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="sort-bar-wrapper">
      <button
        type="button"
        className="sort-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedOption.label}</span>
        <span className={`sort-arrow ${isOpen ? "open" : ""}`}>▾</span>
      </button>

      {isOpen && (
        <div className="sort-menu">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`sort-menu-item ${
                sortOption === option.value ? "active" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortBar;
