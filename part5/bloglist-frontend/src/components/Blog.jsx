import { useState } from 'react';
import PropTypes from 'prop-types';
import './css/blog.css';

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isAuthor = currentUser.username === blog.user.username;

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
        <button onClick={() => handleLike(blog)}>like</button>
      </p>
      {isAuthor && <button onClick={() => handleDelete(blog)}>delete</button>}
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default Blog;
