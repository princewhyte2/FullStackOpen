import React, { useState } from 'react';
import propTypes from 'prop-types';
import blogService from '../services/blogs';

const CreateNewBlogForm = ({ setCreateNew, onCreated, handleNotification }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const handleCreate = async (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };
    try {
      const newBlog = await blogService.create(blogObject);
      onCreated(newBlog);
      handleNotification('success', `a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTitle('');
      setAuthor('');
      setUrl('');
      setCreateNew(false);
    } catch (exception) {
      handleNotification('error', 'something went wrong');
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <span>title</span>
          <input id="title" type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <span>author</span>
          <input id="author" type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          <span>url</span>
          <input id="url" type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button id="submitBtn" type="submit">create</button>
      </form>
      <button type="button" onClick={() => setCreateNew(false)}>
        cancel
      </button>
    </div>
  );
};

CreateNewBlogForm.propTypes = {
  onCreated: propTypes.func.isRequired,
  handleNotification: propTypes.func.isRequired,
  setCreateNew: propTypes.func.isRequired,
};
export default CreateNewBlogForm;
