import { Link } from 'react-router-dom';

function BlogCard({ blog }) {
  const { id, title, author, category, image, description, publishDate, status } = blog;

  return (
    <div className="card h-100 shadow-sm blog-card">
      <div className="ratio ratio-16x9">
        <img
          src={image || 'https://picsum.photos/seed/placeholder/600/400'}
          className="card-img-top"
          alt={title}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <div className="mb-2">
          <span className="badge rounded-pill bg-primary me-2">{category}</span>
          <span className={`badge rounded-pill ${status === 'Published' ? 'bg-success' : 'bg-secondary'}`}>
            {status}
          </span>
        </div>

        <h5 className="card-title">{title}</h5>

        <p className="card-text text-muted small mb-1">
          <i className="bi bi-person me-1"></i>{author}
          <i className="bi bi-calendar3 ms-3 me-1"></i>{publishDate}
        </p>

        <p className="card-text">
          {description.length > 100 ? description.slice(0, 100) + '...' : description}
        </p>

        <Link to={`/blogs/${id}`} className="btn btn-accent mt-auto">
          Read More →
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;