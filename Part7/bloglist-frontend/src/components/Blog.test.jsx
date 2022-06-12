/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('component returns blog title and author without url by default', () => {
  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'www.test.com',
    likes: 0,
  };
  const testUser = { name: 'Test user', username: 'testuser' };
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(testUser));
  const mockHandler = jest.fn();
  const component = render(
    <Blog
      username={testUser.username}
      handleNotification={mockHandler}
      onRemoved={mockHandler}
      onUpdated={mockHandler}
      blog={blog}
    />,
  );
  const div = component.container.querySelector('.blog');
  expect(div).toHaveTextContent('Test blog Test author');
  expect(div).not.toHaveTextContent('www.test.com');
});

test('component return url and likes when view is true', () => {
  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'www.test.com',
    likes: 0,
  };
  const mockHandler = jest.fn();
  const component = render(<Blog username="princewhyte2" handleNotification={mockHandler} onRemoved={mockHandler} onUpdated={mockHandler} blog={blog} />);
  const viewButton = component.container.querySelector('.view');
  fireEvent.click(viewButton);

  const div = component.container.querySelector('.fullblog');

  expect(div).toHaveTextContent('www.test.com');
  expect(div).toHaveTextContent('0');
});

test('button clicked twice', () => {
  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'www.test.com',
    likes: 0,
  };

  const testUser = { name: 'Test user', username: 'testuser' };
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(testUser));

  const ansHandler = jest.fn();
  const component = render(<Blog
    username={testUser.username}
    onUpdated={ansHandler}
    handleNotification={() => { }}
    onRemoved={() => { }}
    blog={blog}
  />);
  const viewButton = component.container.querySelector('.view');
  fireEvent.click(viewButton);

  const likeButton = component.container.querySelector('.like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(ansHandler).toBeCalledTimes(2);
});

test('form calls event handler received as props', () => {

});
