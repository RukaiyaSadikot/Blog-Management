import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BlogCard from '../components/BlogCard';

function Home() {
  const { items } = useSelector((state) => state.blogs);

  const latest = [...items]
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 3);

  return (
    <div>
      <div className="hero mb-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <span className="badge rounded-pill bg-primary mb-3">Fresh stories daily</span>
            <h1 className="display-5 fw-bold">Read what matters. Write what moves you.</h1>
            <p className="lead mb-4">Browse, search and manage every post in one place.</p>
            <Link to="/blogs" className="btn btn-accent btn-lg me-2">Browse Blogs</Link>
            <Link to="/admin" className="btn btn-outline-light btn-lg">Admin Panel</Link>
          </div>
          <div className="col-lg-5 d-none d-lg-block">
            <img src="https://picsum.photos/seed/dailydraft/700/500" alt="Writing desk" />
          </div>
        </div>
      </div>

      <div className="section-head">
        <h2>Latest posts</h2>
        <Link to="/blogs" className="text-decoration-none">View all →</Link>
      </div>

      <div className="row g-4">
        {latest.map((blog) => (
          <div className="col-12 col-md-4" key={blog.id}>
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;