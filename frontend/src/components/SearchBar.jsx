import "./SearchBar.css";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar-wrapper">
      <input
        id="job-search"
        name="job-search"
        type="text"
        placeholder="Search by company or position..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
        autoComplete="off"
      />
    </div>
  );
}

export default SearchBar;
