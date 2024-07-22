import { useState, useEffect, useRef } from 'react';

import blogService from './services/blogs';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Login from './components/Login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    blogService.setToken(null);
  };

  const userDetails = () => (
    <div>
      <p>
        {user.name} logged in! <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  );

  if (user === null) {
    return <Login setUser={setUser} />;
  }

  const createBlog = async (event, newBlog) => {
    event.preventDefault();

    if (!newBlog.title || !newBlog.url) {
      setErrorMessage('New blog must have a title, and URL');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

    const returnedBlog = await blogService.create(newBlog);
    const createdBlog = { ...returnedBlog, user: user };

    setSuccessMessage(
      `New blog "${createdBlog.title}" by ${createdBlog.author} created`
    );
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);

    if (blogFormRef) {
      blogFormRef.current.toggleVisibility();
    }

    setBlogs((prevBlogs) => {
      return prevBlogs.concat(createdBlog);
    });
  };

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    };
    blogService.update(blog.id, updatedBlog);

    setBlogs((prevBlogs) => {
      return prevBlogs.map((prevBlog) => {
        return prevBlog.id === blog.id ? updatedBlog : prevBlog;
      });
    });
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id);
      setBlogs((prevBlogs) => {
        return prevBlogs.filter((prevBlog) => prevBlog.id !== blog.id);
      });
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} />
      <Notification message={errorMessage} isError />
      {userDetails()}

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm onFormSubmit={createBlog} />
      </Togglable>

      <h2>blogs wall</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            currentUser={user}
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
            setBlogs={setBlogs}
          />
        ))}
    </div>
  );
};

export default App;
