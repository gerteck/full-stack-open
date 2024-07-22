import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const user = {
  name: 'tester',
  username: 'tester',
  id: '123'
};

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'tester',
  url: 'http://localhost',
  likes: 5,
  user: user
};

test('renders content correctly', () => {
  const rendered = render(<Blog blog={blog} currentUser={user} />);

  const element = screen.getByText(
    'Component testing is done with react-testing-library'
  );
  expect(element).toBeDefined();

  // Use CSS Selector
  const titleVisible = rendered.container.querySelector('.blog-title');
  expect(titleVisible).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );

  const urlNotVisible = screen.queryByText('http://localhost');
  expect(urlNotVisible).toBeNull();

  const likesNotVisible = screen.queryByText('Likes');
  expect(likesNotVisible).toBeNull();

  const authorNotVisible = screen.queryByText('tester');
  expect(authorNotVisible).toBeNull();
});

test('clicking the button shows the details', async () => {
  const rendered = render(<Blog blog={blog} currentUser={user} />);

  const mockUser = userEvent.setup();
  const button = screen.getByText('view');
  await mockUser.click(button);

  const urlVisible = screen.getByText('http://localhost');
  expect(urlVisible).toBeDefined();

  const likesVisible = screen.getByText('Likes: 5');
  expect(likesVisible).toBeDefined();
});

test('clicking the like button twice calls (setBlogs) handler twice', async () => {
  const mockHandler = vi.fn();

  const rendered = render(
    <Blog blog={blog} currentUser={user} handleLike={mockHandler} />
  );

  const mockUser = userEvent.setup();
  const viewButton = screen.getByText('view');
  await mockUser.click(viewButton);

  const likeButton = screen.getByText('like');
  await mockUser.click(likeButton);
  await mockUser.click(likeButton);

  expect(mockHandler).toHaveBeenCalledTimes(2);
});
