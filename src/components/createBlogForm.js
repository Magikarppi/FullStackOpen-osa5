import React from 'react';
import PropTypes from 'prop-types'
// import blogsService from "../services/blogs";

const CreateBlogForm = ({ handleAuthorChange, handleSubmit, handleTitleChange, handleUrlChange, title, url, author }) => {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [url, setUrl] = useState("");

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     try {
  //         const newBlog = {
  //           title: title,
  //           author: author,
  //           url: url
  //         };
  //         console.log('newBlog in handlesubmit', newBlog)
  //         const createdBlog = await blogsService.create(newBlog);
  //         setBlogs(blogs.concat(createdBlog))
  //     } catch (exception) {
  //         setErrorMessage('Blog creation failed')
  //       setTimeout(() => {
  //         setErrorMessage(null)
  //       }, 4000)
  //     }
  //   };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

CreateBlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

export default CreateBlogForm;
