/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlog, deleteBlog } from '../redux/reducers/blogreducers';
import { setNotification } from '../redux/reducers/notificationReducers';

const Blog = ({
  blog,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLike = async () => {
    const blogForUpdate = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : '',
    };
    try {
      dispatch(updateBlog(blogForUpdate));
    } catch (error) {
      dispatch(setNotification({ type: 'error', message: 'something went wrong' }, 5));
    }
  };

  const handleRemove = async () => {
    const res = window.confirm(`remove blog ${blog.title} by ${blog.author}`);
    if (res) {
      dispatch(deleteBlog(blog));
    }
  };

  return (

    <Card sx={{ minWidth: 275 }}>
      <CardContent>

        <Typography variant="h5" component="div">
          {`${blog.title} ${blog.author}`}
        </Typography>
        <a href={blog.url} target="_blank" rel="noreferrer">
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {blog.url}
          </Typography>
        </a>
        <Typography variant="h5" component="div">
          likes
          {' '}
          {blog.likes}
          {' '}
          {' '}
          <Button onClick={handleLike} variant="outlined" size="small">Like</Button>
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          added by
          {' '}
          {blog.user.name}
        </Typography>
      </CardContent>
      { user.userId === blog.user.id
            && (
            <CardActions>
              <Button onClick={handleRemove} size="small">remove</Button>
            </CardActions>
            )}
    </Card>
  );
};

Blog.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  blog: PropTypes.object.isRequired,

};
export default Blog;
