import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BlogForm from '../../components/BlogForm';
import { updateBlog } from '../../redux/blogSlice';

function EditBlog() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status } = useSelector((state) => state.blogs);

  const blog = items.find((b) => String(b.id) === id);

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-5">
        <h3>Blog not found</h3>
        <Link to="/admin" className="btn btn-accent mt-3">Back to Dashboard</Link>
      </div>
    );
  }

  const handleUpdate = async (updatedBlog) => {
    try {
      await dispatch(updateBlog({ ...updatedBlog, id: blog.id })).unwrap();
      navigate('/admin');
    } catch (err) {
      alert('Failed to update blog.');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">
        <div className="section-head">
          <h2>Edit Blog</h2>
        </div>
        <div className="panel">
          <BlogForm initialData={blog} onSubmit={handleUpdate} submitLabel="Update Blog" />
        </div>
      </div>
    </div>
  );
}

export default EditBlog;