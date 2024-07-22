import { useState } from 'react';

import BlogForm from './BlogForm';
import blogService from '../services/blogs';

const BlogCreate = ({setErrorMessage, setSuccessMessage, blogFormRef}) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        url: '',
    });

    const addNewBlog = async (event) => {
        event.preventDefault();
        console.log('Adding new blog:', newBlog);

        if (!newBlog.title || !newBlog.url) {
            setErrorMessage('New blog must have a title, and URL');
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        }

        const createdBlog = await blogService.create(newBlog);
        setNewBlog({
            title: '',
            url: '',
        });
        setSuccessMessage(`New blog "${createdBlog.title}" by ${createdBlog.author} created`);
        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000);

        if(blogFormRef) {
            blogFormRef.current.toggleVisibility();
        }
    };

    return (
        <BlogForm newBlog={newBlog} setNewBlog={setNewBlog} onFormSubmit={addNewBlog}/>
    );
}

export default BlogCreate;
