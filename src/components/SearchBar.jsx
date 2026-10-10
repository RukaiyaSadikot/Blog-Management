function SearchBar({ search, onSearchChange, category, onCategoryChange, categories, sort, onSortChange }) {
  return (
    <div className="row g-3">
      <div className="col-12 col-md-5">
        <div className="input-group">
          <span className="input-group-text bg-white">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="col-6 col-md-3">
        <select
          className="form-select"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="col-6 col-md-4">
        <select
          className="form-select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="az">Title A-Z</option>
          <option value="za">Title Z-A</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;