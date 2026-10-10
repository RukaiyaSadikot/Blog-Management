import { useState } from 'react';

const CATEGORIES = ['Technology', 'Lifestyle', 'Travel', 'Food', 'Education', 'Health'];

const emptyForm = {
  title: '',
  author: '',
  email: '',
  category: '',
  image: '',
  description: '',
  content: '',
  tags: '',
  publishDate: '',
  status: 'Draft',
};

// returns an object like { title: 'Title is required', ... }
function validate(values) {
  const errors = {};

  if (!values.title.trim()) errors.title = 'Title is required';
  else if (values.title.trim().length < 5) errors.title = 'Title must be at least 5 characters';

  if (!values.author.trim()) errors.author = 'Author is required';

  if (!values.email.trim()) errors.email = 'Email is required';
  else if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Enter a valid email';

  if (!values.category) errors.category = 'Please select a category';

  if (!values.image.trim()) errors.image = 'Image URL is required';
  else if (!/^https?:\/\/.+/.test(values.image)) errors.image = 'Enter a valid URL (http/https)';

  if (!values.description.trim()) errors.description = 'Description is required';
  else if (values.description.trim().length < 10) errors.description = 'Description must be at least 10 characters';

  if (!values.content.trim()) errors.content = 'Content is required';
  else if (values.content.trim().length < 30) errors.content = 'Content must be at least 30 characters';

  if (!values.tags.trim()) errors.tags = 'Add at least one tag (comma separated)';

  if (!values.publishDate) errors.publishDate = 'Publish date is required';

  return errors;
}

function BlogForm({ initialData, onSubmit, submitLabel = 'Save Blog' }) {
  // convert the tags array to a string when editing
  const [formData, setFormData] = useState(
    initialData
      ? { ...emptyForm, ...initialData, tags: (initialData.tags || []).join(', ') }
      : emptyForm
  );
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value }; // spread operator
    setFormData(updated);
    if (touched[name]) setErrors(validate(updated)); // live feedback after first blur
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors(validate(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched(Object.fromEntries(Object.keys(formData).map((k) => [k, true])));

    if (Object.keys(validationErrors).length > 0) return;

    // convert tags string back to an array
    const blog = {
      ...formData,
      title: formData.title.trim(),
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };
    onSubmit(blog);
  };

  // helper: shows red border only after the field was touched
  const invalid = (name) => (touched[name] && errors[name] ? 'is-invalid' : '');
  const feedback = (name) =>
    touched[name] && errors[name] ? <div className="invalid-feedback">{errors[name]}</div> : null;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        <div className="col-12">
          <label className="form-label">Blog Title</label>
          <input name="title" className={`form-control ${invalid('title')}`}
            value={formData.title} onChange={handleChange} onBlur={handleBlur} />
          {feedback('title')}
        </div>

        <div className="col-md-6">
          <label className="form-label">Author</label>
          <input name="author" className={`form-control ${invalid('author')}`}
            value={formData.author} onChange={handleChange} onBlur={handleBlur} />
          {feedback('author')}
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input name="email" type="email" className={`form-control ${invalid('email')}`}
            value={formData.email} onChange={handleChange} onBlur={handleBlur} />
          {feedback('email')}
        </div>

        <div className="col-md-6">
          <label className="form-label">Category</label>
          <select name="category" className={`form-select ${invalid('category')}`}
            value={formData.category} onChange={handleChange} onBlur={handleBlur}>
            <option value="">-- Select category --</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {feedback('category')}
        </div>

        <div className="col-md-6">
          <label className="form-label">Publish Date</label>
          <input name="publishDate" type="date" className={`form-control ${invalid('publishDate')}`}
            value={formData.publishDate} onChange={handleChange} onBlur={handleBlur} />
          {feedback('publishDate')}
        </div>

        <div className="col-12">
          <label className="form-label">Image URL</label>
          <input name="image" className={`form-control ${invalid('image')}`}
            placeholder="https://..." value={formData.image}
            onChange={handleChange} onBlur={handleBlur} />
          {feedback('image')}
        </div>

        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea name="description" rows="2" className={`form-control ${invalid('description')}`}
            value={formData.description} onChange={handleChange} onBlur={handleBlur} />
          {feedback('description')}
        </div>

        <div className="col-12">
          <label className="form-label">Content</label>
          <textarea name="content" rows="6" className={`form-control ${invalid('content')}`}
            value={formData.content} onChange={handleChange} onBlur={handleBlur} />
          {feedback('content')}
        </div>

        <div className="col-md-8">
          <label className="form-label">Tags (comma separated)</label>
          <input name="tags" className={`form-control ${invalid('tags')}`}
            placeholder="react, javascript, tutorial" value={formData.tags}
            onChange={handleChange} onBlur={handleBlur} />
          {feedback('tags')}
        </div>

        <div className="col-md-4">
          <label className="form-label">Status</label>
          <select name="status" className="form-select"
            value={formData.status} onChange={handleChange}>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary me-2">{submitLabel}</button>
        </div>
      </div>
    </form>
  );
}

export default BlogForm;