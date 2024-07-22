import './css/blogForm.css'; // Ensure you have this CSS file for styles

const BlogForm = ({ newBlog, setNewBlog, onFormSubmit }) => {
  return (
    <>
      <form className="blog-form" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            className="form-input"
            value={newBlog.title}
            onChange={(e) =>
              setNewBlog((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label>URL:</label>
          <input
            className="form-input"
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
