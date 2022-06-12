/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const Blog = ({
  blog, onUpdated, handleNotification, onRemoved, userId,
}) => {
  const [isView, setIsView] = useState(false);

  const handleLike = async () => {
    const blogForUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : '',
    };
    try {
      const response = await blogService.update(blog.id, blogForUpdate);
      onUpdated(blog.id, response);
      handleNotification('success', `${blog.title} updated`);
      setIsView(false);
    } catch (error) {
      handleNotification('error', 'something went wrong');
    }
  };

  const handleRemove = async () => {
    const res = window.confirm(`remove blog ${blog.title} by ${blog.author}`);
    if (res) {
      try {
        await blogService.remove(blog.id);
        handleNotification('success', `${blog.title} removed`);
        onRemoved(blog.id);
      } catch (error) {
        handleNotification('error', 'something went wrong');
      }
    }
  };

  const isBlogOwner = typeof blog.user !== 'string' ? userId === blog.user.id : blog.user === userId;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="fullblog" style={blogStyle}>
      <div className="blog">
        {`${blog.title} ${blog.author}`}

        {' '}
        <button className="view" type="button" onClick={() => setIsView(!isView)}>
          {isView ? 'hide' : 'show'}
        </button>
      </div>
      {isView && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes
            {' '}
            {blog.likes}
            {' '}
            <button className="like" type="button" onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
          { isBlogOwner
            && <button type="button" onClick={handleRemove}>remove</button> }
        </div>
      )}
    </div>
  );
};
Blog.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  blog: PropTypes.object.isRequired,
  onUpdated: PropTypes.func.isRequired,
  onRemoved: PropTypes.func.isRequired,
  handleNotification: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
export default Blog;
