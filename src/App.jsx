import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBlogs } from './redux/blogSlice';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Dashboard from './pages/admin/Dashboard';
import AddBlog from './pages/admin/AddBlog';
import EditBlog from './pages/admin/EditBlog';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container my-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/add-blog" element={<AddBlog />} />
          <Route path="/admin/edit/:id" element={<EditBlog />} />
          <Route path="*" element={<h2 className="text-center">404 - Page Not Found</h2>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;