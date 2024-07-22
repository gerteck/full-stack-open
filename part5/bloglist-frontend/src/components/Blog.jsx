import { useState } from 'react';
import './css/blog.css';
import blogService from '../services/blogs';

const Blog = ({ blog, setBlogs, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false);

  const isAuthor = currentUser.username === blog.user.username;

  const handleLike = async () => {
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

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id);
      setBlogs((prevBlogs) => {
        return prevBlogs.filter((prevBlog) => prevBlog.id !== blog.id);
      });
    }
  };

  const blogDetails = () => (
    <div>
      <p className="blog-author">by {blog.author}</p>
      Read at{' '}
      <a
        className="blog-url"
        href={blog.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {blog.url}
      </a>
      <p className="blog-likes">
        Likes: {blog.likes} &nbsp;
        <button onClick={handleLike}>like</button>
      </p>
      {isAuthor && <button onClick={handleDelete}>delete</button>}
    </div>
  );

  return (
    <div className="blog-container">
      <h2 className="blog-title">
        {blog.title} &nbsp;
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </h2>

      {showDetails && blogDetails()}
    </div>
  );
};

export default Blog;
