import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import BlogCard from '../components/BlogCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 6;

function loadFilters() {
  try {
    return JSON.parse(localStorage.getItem('blogFilters')) || {};
  } catch {
    return {};
  }
}

function Blogs() {
  const { items, status, error } = useSelector((state) => state.blogs);

  const [search, setSearch] = useState(() => loadFilters().search || '');
  const [category, setCategory] = useState(() => loadFilters().category || 'All');
  const [sort, setSort] = useState(() => loadFilters().sort || 'latest');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(
    () => [...new Set(items.map((b) => b.category))],
    [items]
  );

  // 1) filter  2) sort
  const filteredBlogs = useMemo(() => {
    const term = search.trim().toLowerCase();

    const result = items.filter((b) => {
      const matchesSearch =
        b.title.toLowerCase().includes(term) ||
        b.author.toLowerCase().includes(term);
      const matchesCategory = category === 'All' || b.category === category;
      return matchesSearch && matchesCategory;
    });

    return [...result].sort((a, b) => {
      switch (sort) {
        case 'az':
          return a.title.localeCompare(b.title);
        case 'za':
          return b.title.localeCompare(a.title);
        case 'oldest':
          return new Date(a.publishDate) - new Date(b.publishDate);
        default: // latest
          return new Date(b.publishDate) - new Date(a.publishDate);
      }
    });
  }, [items, search, category, sort]);

  // back to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sort]);

  // remember filters
  useEffect(() => {
    localStorage.setItem('blogFilters', JSON.stringify({ search, category, sort }));
  }, [search, category, sort]);

  // 3) paginate
  const totalPages = Math.ceil(filteredBlogs.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + PAGE_SIZE);

  if (status === 'loading') {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading blogs...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div>
      <div className="section-head">
        <h2>All Blogs</h2>
        <span className="text-muted">
          {filteredBlogs.length} {filteredBlogs.length === 1 ? 'post' : 'posts'}
        </span>
      </div>

      <div className="panel mb-4">
        <SearchBar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
          sort={sort}
          onSortChange={setSort}
        />
      </div>

      {currentBlogs.length === 0 ? (
        <div className="alert alert-info">No blogs match your search.</div>
      ) : (
        <div className="row g-4">
          {currentBlogs.map((blog) => (
            <div className="col-12 col-md-6 col-lg-4" key={blog.id}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Blogs;