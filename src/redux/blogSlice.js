import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/blogs';

// READ: get all blogs
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// CREATE: add a new blog
export const addBlog = createAsyncThunk('blogs/addBlog', async (blog) => {
  const response = await axios.post(API_URL, blog);
  return response.data;
});

// UPDATE: edit an existing blog
export const updateBlog = createAsyncThunk('blogs/updateBlog', async (blog) => {
  const response = await axios.put(`${API_URL}/${blog.id}`, blog);
  return response.data;
});

// DELETE: remove a blog
export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // add
      .addCase(addBlog.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // update
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.items = state.items.map((b) =>
          b.id === action.payload.id ? { ...b, ...action.payload } : b
        );
      })
      // delete
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b.id !== action.payload);
      });
  },
});

export default blogSlice.reducer;