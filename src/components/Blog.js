import React, { useState } from 'react'

const Blog = ({ blog, handleUpdate, handleRemove, user }) => {
   const [showMore, setShowMore] = useState(false)

   console.log('user in Blog', user)
   console.log('blog in BLog', blog)

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
      <div onClick={() => setShowMore(true)}>
      {blog.title} - {blog.author}
      </div>
    </div>
    )
  }

  if (blog.user.id === user.id || blog.user === user.id) {
    return (
      <div style={blogStyle}>
        <div onClick={() => setShowMore(false)}>
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
        <div onClick={() => setShowMore(false)}>
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


  // return (
  //   <div style={blogStyle}>
  //     <div onClick={() => setShowMore(false)}>
  //     <p> {blog.title} - {blog.author} </p>
  //     <a href={blog.url}> {blog.url} </a>
  //     <p>Likes: {blog.likes}</p>
  //     <button onClick={() => handleUpdate(blog)}>Like</button>
  //     <p>added by {user.name}</p>
  //     {(blog.user.username === user.username) 
  //     ? <button onClick={() => handleRemove(blog)}>Delete</button>
  //     : null
  //     }
  //     </div>
  //   </div>
  //   )
}


export default Blog