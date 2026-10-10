import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog } from '../../redux/blogSlice';
import Pagination from '../../components/Pagination';

const PAGE_SIZE = 5;

function Dashboard() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.blogs);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // stats
  const total = items.length;
  const published = items.filter((b) => b.status === 'Published').length;
  const drafts = items.filter((b) => b.status === 'Draft').length;

  // search by title or author
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items.filter(
      (b) => b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term)
    );
  }, [items, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // if the last item on a page is deleted, step back a page
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentBlogs = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const handleDelete = (blog) => {
    if (window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) {
      dispatch(deleteBlog(blog.id));
    }
  };

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  const stats = [
    { label: 'Total Blogs', value: total, icon: 'bi-journal-text', color: 'text-primary' },
    { label: 'Published', value: published, icon: 'bi-check-circle', color: 'text-success' },
    { label: 'Drafts', value: drafts, icon: 'bi-pencil-square', color: 'text-secondary' },
  ];

  return (
    <div>
      <div className="section-head">
        <h2>Admin Dashboard</h2>
      </div>

      {/* Stat cards */}
      <div className="row g-3 mb-4">
        {stats.map((s) => (
          <div className="col-12 col-md-4" key={s.label}>
            <div className="card stat-card shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">{s.label}</h6>
                  <p className="display-6 fw-bold mb-0">{s.value}</p>
                </div>
                <i className={`bi ${s.icon} stat-icon ${s.color}`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar + table */}
      <div className="panel">
        <div className="d-flex flex-wrap gap-2 justify-content-between mb-3">
          <input
            type="text"
            className="form-control"
            style={{ maxWidth: '320px' }}
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to="/admin/add-blog" className="btn btn-accent">+ Add Blog</Link>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBlogs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">No blogs found.</td>
                </tr>
              ) : (
                currentBlogs.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{blog.title}</td>
                    <td>{blog.author}</td>
                    <td>{blog.category}</td>
                    <td>{blog.publishDate}</td>
                    <td>
                      <span className={`badge ${blog.status === 'Published' ? 'bg-success' : 'bg-secondary'}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="text-end text-nowrap">
                      <Link to={`/blogs/${blog.id}`} className="btn btn-sm btn-outline-info me-1" title="View">
                        <i className="bi bi-eye"></i>
                      </Link>
                      <Link to={`/admin/edit/${blog.id}`} className="btn btn-sm btn-outline-primary me-1" title="Edit">
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={() => handleDelete(blog)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}

export default Dashboard;