import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

const user = {
  name: 'tester',
  username: 'tester',
  id: '123'
};

const blog = {
  title: 'New blog title',
  author: 'tester',
  url: 'http://newblog.com',
  likes: 0,
  user: user
};

test('Form calls event handler with right details', async () => {
  const mockInput = vi.fn();
  const mockFormHandler = vi.fn((e) => e.preventDefault());
  const mockUser = userEvent.setup();

  const rendered = render(
    <BlogForm
      newBlog={blog}
      setNewBlog={mockInput}
      onFormSubmit={mockFormHandler}
    />
  );

  const titleInput = rendered.container.querySelector('.title-input');
  const urlInput = rendered.container.querySelector('.url-input');
  const form = screen.getByText('Add Blog');

  await mockUser.type(titleInput, 'New blog title');
  await mockUser.type(urlInput, 'http://newblog.com');
  await mockUser.click(form);

  expect(mockFormHandler.mock.calls).toHaveLength(1);
  expect(mockFormHandler.mock.calls[0][1].title).toBe('New blog title');
  expect(mockFormHandler.mock.calls[0][1].url).toBe('http://newblog.com');
});
