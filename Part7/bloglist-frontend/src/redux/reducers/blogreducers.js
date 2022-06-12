import blogService from '../../services/blogs';
import { setNotification } from './notificationReducers';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.data;
    case 'ADD_BLOG':
      return [...state, action.data];
    case 'DELETE_BLOG': {
      const { id } = action.data;
      return state.filter((blog) => blog.id !== id);
    }
    case 'UPDATE_BLOG': {
      const { id } = action.data;
      return state.map((blog) => (blog.id === id ? { ...blog, ...action.data } : blog));
    }
    case 'ADD_COMMENT': {
      const { id, comment } = action.data;
      return state.map((blog) => (blog.id === id
        ? { ...blog, comments: [...blog.comments, comment] } : blog));
    }
    default:
      return state;
  }
};

export const getBlogs = () => async (dispatch) => {
  try {
    const response = await blogService.getAll();
    dispatch({
      type: 'SET_BLOGS',
      data: response,
    });
  } catch (error) {
    dispatch(setNotification({ type: 'error', message: 'something went wrong' }, 5));
  }
};

export const addBlog = (blog) => async (dispatch) => {
  const response = await blogService.create(blog);
  dispatch({
    type: 'ADD_BLOG',
    data: response,
  });
  dispatch(setNotification({ type: 'success', message: `a new blog ${response.title} by ${response.author} added` }, 5));
};

export const updateBlog = (blog) => async (dispatch) => {
  const response = await blogService.update(blog);
  dispatch({
    type: 'UPDATE_BLOG',
    data: response,
  });
  dispatch(setNotification({ type: 'success', message: `blog ${response.title} by ${response.author} updated` }, 5));
};

export const deleteBlog = (blog) => async (dispatch) => {
  try {
    await blogService.remove(blog.id);
    dispatch({
      type: 'DELETE_BLOG',
      data: blog,
    });
    dispatch(setNotification({ type: 'success', message: `${blog.title} removed` }, 5));
  } catch (error) {
    dispatch(setNotification({ type: 'error', message: 'something went wrong' }, 5));
  }
};

export const addComment = (blogId, comment) => async (dispatch) => {
  try {
    const response = await blogService.addBlogComment(blogId, comment);
    dispatch({
      type: 'ADD_COMMENT',
      data: { id: blogId, comment: response },
    });
    dispatch(setNotification({ type: 'success', message: 'comment added' }, 5));
  } catch (error) {
    dispatch(setNotification({ type: 'error', message: 'something went wrong' }, 5));
  }
};

export default blogReducer;
