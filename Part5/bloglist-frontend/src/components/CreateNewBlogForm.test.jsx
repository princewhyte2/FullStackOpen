/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';
import CreateNewBlogForm from './CreateNewBlogForm';

test('form calls event handler received as props', () => {
  const createNewBlog = jest.fn();
  const component = render(
    <CreateNewBlogForm
      onCreated={createNewBlog}
      setCreateNew={() => { }}
      handleNotification={() => { }}
    />,
  );
  const form = component.container.querySelector('form');
  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const submit = component.container.querySelector('#submitBtn');
  //   fireEvent.change(title, {
  //     target: { value: 'Test blog' },
  //   });
  userEvent.type(title, 'Test blog');
  userEvent.type(author, 'Test author');
  userEvent.type(url, 'www.test.com');
  //
  userEvent.click(submit);
  //   fireEvent.change(author, {
  //     target: { value: 'Test author' },
  //   });
  //   fireEvent.change(url, {
  //     target: { value: 'www.test.com' },
  //   });

  //   fireEvent.submit(form);
  expect(createNewBlog.mock.calls).toHaveLength(1);
  expect(createNewBlog.mock.calls[0][0].title).toBe('Test blog');
  expect(createNewBlog.mock.calls[0][0].author).toBe('Test author');
  expect(createNewBlog.mock.calls[0][0].url).toBe('www.test.com');
});
