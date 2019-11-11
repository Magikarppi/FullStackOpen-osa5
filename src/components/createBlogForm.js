import React from 'react';
import PropTypes from 'prop-types'

const CreateBlogForm = ({ handleSubmit, title, url, author }) => {

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url
          <input {...url} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

CreateBlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired
}

export default CreateBlogForm;
