import "./FilterBar.css";

function FilterBar({ currentFilter, onFilterChange }) {
  const filters = ["All", "Applied", "Interview", "Rejected", "Offer"];

  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`filter-button ${
            currentFilter === filter ? "active" : ""
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
