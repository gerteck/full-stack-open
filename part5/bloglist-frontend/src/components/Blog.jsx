import './css/blog.css'; // Make sure to create this CSS file for styles

const Blog = ({ blog }) => (
  <div className="blog-container">
    <h2 className="blog-title">{blog.title}</h2>
    <p className="blog-author">by {blog.author}</p>
    Read at <a className="blog-url" href={blog.url} target="_blank" rel="noopener noreferrer">
      {blog.url}
    </a>
    <p className="blog-likes">Likes: {blog.likes}</p>
  </div>
);

export default Blog;