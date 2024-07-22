import { useState } from 'react';
import './css/blogForm.css'; // Ensure you have this CSS file for styles

const BlogForm = ({ onFormSubmit }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    url: ''
  });

  return (
    <>
      <form className="blog-form" onSubmit={(e) => onFormSubmit(e, newBlog)}>
        <div className="form-group">
          <label>Title:</label>
          <input
            className="form-input title-input"
            value={newBlog.title}
            onChange={(e) =>
              setNewBlog((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label>URL:</label>
          <input
            className="form-input url-input"
            value={newBlog.url}
            onChange={(e) =>
              setNewBlog((prev) => ({ ...prev, url: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <button className="form-button" type="submit">
            Add Blog
          </button>
        </div>
      </form>
    </>
  );
};

export default BlogForm;
