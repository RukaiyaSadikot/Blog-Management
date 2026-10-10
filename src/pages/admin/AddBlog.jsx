import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BlogForm from '../../components/BlogForm';
import { addBlog } from '../../redux/blogSlice';

function AddBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = async (blog) => {
    try {
      await dispatch(addBlog(blog)).unwrap();
      navigate('/admin');
    } catch (err) {
      alert('Failed to add blog. Is JSON Server running?');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">
        <div className="section-head">
          <h2>Add New Blog</h2>
        </div>
        <div className="panel">
          <BlogForm onSubmit={handleAdd} submitLabel="Add Blog" />
        </div>
      </div>
    </div>
  );
}

export default AddBlog;