import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setNotification } from '../redux/reducers/notificationReducers';
import { addBlog } from '../redux/reducers/blogreducers';

const CreateNewBlogForm = ({ setCreateNew }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const handleCreate = async (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };
    try {
      dispatch(addBlog(blogObject));
      setTitle('');
      setAuthor('');
      setUrl('');
      setCreateNew(false);
    } catch (exception) {
      dispatch(setNotification({ type: 'error', message: 'something went wrong' }, 5));
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
  setCreateNew: propTypes.func.isRequired,
};
export default CreateNewBlogForm;
