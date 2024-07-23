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

  const tokenExpiredMessage = () => {
    setErrorMessage(
      'If create new blog or delete does not work, token may have expired. Please login again.'
    );
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const broadcastSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const broadcastErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const createBlog = async (event, newBlog) => {
    event.preventDefault();

    if (!newBlog.title || !newBlog.url) {
      broadcastErrorMessage('New blog must have a title, and URL');
      return;
    }

    let returnedBlog = null;

    try {
      returnedBlog = await blogService.create(newBlog);
    } catch (error) {
      tokenExpiredMessage();
      return;
    }

    broadcastSuccessMessage(
      `New blog "${returnedBlog.title}" by ${returnedBlog.author} created`
    );

    if (blogFormRef) {
      blogFormRef.current.toggleVisibility();
    }
    const createdBlog = { ...returnedBlog, user: user };
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
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        blogService.remove(blog.id);
        setBlogs((prevBlogs) => {
          return prevBlogs.filter((prevBlog) => prevBlog.id !== blog.id);
        });
      }
    } catch (error) {
      tokenExpiredMessage();
      return;
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
      <div data-testid="blogs">
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
    </div>
  );
};

export default App;
