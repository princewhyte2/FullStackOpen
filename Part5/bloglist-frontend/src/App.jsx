/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from 'react';
import Blog from './components/Blog';
import CreateNewBlogForm from './components/CreateNewBlogForm';
import blogService from './services/blogs';
import handleTokenExpiration from './utils/expiredToken';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [createNew, setCreateNew] = useState(false);

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  const handleNotification = useCallback(
    (type, message) => {
      setNotification({ type, message });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }, [],
  );

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs)).catch(() => handleNotification('error', 'something went wrong'));
  }, []);

  const onCreated = useCallback((newBlog) => setBlogs(blogs.concat(newBlog), []));

  const onUpdated = useCallback((id, updatedblog) => {
    setBlogs(blogs.map((blog) => (blog.id === id ? updatedblog : blog)));
  }, [
    blogs,
  ]);

  const onRemoved = useCallback((id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  }, [
    blogs,
  ]);

  useEffect(() => {
    handleTokenExpiration();
    const loggedInUser = window.localStorage.getItem('loggedBlogappUser');

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await blogService.login(username, password);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      window.localStorage.setItem('setupTime', new Date().getTime());

      handleNotification('success', `${user.name} welcome back!`);
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      handleNotification('error', 'Wrong username or password');
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const notificationComponent = () => (
    <div
      style={{
        backgroundColor: 'lightgrey',
        color: notification.type === 'error' ? 'red' : 'green',
        borderStyle: 'solid',
        padding: '24px 8px',
        fontSize: '18px',
      }}
    >
      { notification.message }
    </div>
  );

  if (user === null) {
    return (
      <div>
        <h2>Login to application</h2>
        { notification && notificationComponent() }
        <form onSubmit={handleLogin}>
          <div>
            <span>username</span>
            { ' ' }
            <input id="username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            <span>password</span>
            { ' ' }
            <input id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      { notification && notificationComponent() }
      <div style={{ display: 'flex' }}>
        <p>
          { user.name }
          {' '}
          logged in
        </p>
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>

      { createNew ? (
        <CreateNewBlogForm
          setCreateNew={setCreateNew}
          onCreated={onCreated}
          handleNotification={handleNotification}
        />
      )
        : <button type="button" onClick={() => setCreateNew(true)}>create new blog</button> }

      { sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          userId={user.userId}
          onUpdated={onUpdated}
          onRemoved={onRemoved}
          handleNotification={handleNotification}
        />
      )) }
    </div>
  );
};

export default App;
