import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, status } = useSelector((state) => state.blogs);

  // useParams gives a string, so compare as strings
  const blog = items.find((b) => String(b.id) === id);

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-5">
        <h3>Blog not found</h3>
        <Link to="/blogs" className="btn btn-primary mt-3">Back to Blogs</Link>
      </div>
    );
  }

  const { title, author, email, category, image, description, content, tags, publishDate, status: blogStatus } = blog;

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">
        <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <img
          src={image || 'https://picsum.photos/seed/placeholder/800/400'}
          alt={title}
          className="img-fluid rounded mb-4 w-100"
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />

        <div className="mb-2">
          <span className="badge bg-primary me-2">{category}</span>
          <span className={`badge ${blogStatus === 'Published' ? 'bg-success' : 'bg-secondary'}`}>
            {blogStatus}
          </span>
        </div>

        <h1 className="mb-3">{title}</h1>

        <p className="text-muted">
          By <strong>{author}</strong> ({email}) • {publishDate}
        </p>

        <p className="lead">{description}</p>

        <hr />

        <p style={{ whiteSpace: 'pre-line' }}>{content}</p>

        {tags && tags.length > 0 && (
          <div className="mt-4">
            {tags.map((tag) => (
              <span key={tag} className="badge bg-light text-dark border me-2">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogDetails;