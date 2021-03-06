import React, { useState } from 'react'

const Blog = ({ blog, handleUpdate, handleRemove, user }) => {
  const [showMore, setShowMore] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'block'
  }

  if (!showMore) {
    return (
      <div style={blogStyle}>
        <div className='basicView' data-testid='divBasicView' onClick={() => setShowMore(true)}>
          {blog.title} - {blog.author}
        </div>
      </div>
    )
  }

  if (blog.user.id === user.id || blog.user === user.id) {
    return (
      <div style={blogStyle}>
        <div className='expandedView' data-testid='divExpandedView' onClick={() => setShowMore(false)}>
          <p>
            {blog.title} - {blog.author}
          </p>
          <a href={blog.url}> {blog.url} </a>
          <p>Likes: {blog.likes}</p>
          <button onClick={() => handleUpdate(blog)}>Like</button>
          <p>added by {user.name}</p>
          <button onClick={() => handleRemove(blog)}>Delete</button>
        </div>
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        <div className='expandedView' data-testid='divExpandedView' onClick={() => setShowMore(false)}>
          <p>
            {blog.title} - {blog.author}
          </p>
          <a href={blog.url}> {blog.url} </a>
          <p>Likes: {blog.likes}</p>
          <button onClick={() => handleUpdate(blog)}>Like</button>
          <p>added by {blog.user.name}</p>
        </div>
      </div>
    );
  }
}


export default Blog