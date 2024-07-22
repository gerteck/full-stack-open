import { useState, useEffect, useRef } from 'react';

import blogService from './services/blogs';

import Blog from './components/Blog';
import BlogCreate from './components/BlogCreate';
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
  }, [successMessage]);

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

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} />
      <Notification message={errorMessage} isError />
      {userDetails()}

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogCreate
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          blogFormRef={blogFormRef}
        />
      </Togglable>

      <h2>blogs wall</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            currentUser={user}
            key={blog.id}
            blog={blog}
            setBlogs={setBlogs}
          />
        ))}
    </div>
  );
};

export default App;
