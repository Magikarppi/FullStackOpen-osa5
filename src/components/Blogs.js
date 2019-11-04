import React from 'react'

const Blogs = ({ blogs, user }) => {
    console.log('Blogs component runs with blogs:', blogs)
    const blogsByUser = blogs.filter(blog => {
        return blog.user.username === user.username})
    console.log('blogsByUser in Blogs component', blogsByUser)
    if (blogsByUser) {
    return (
        <div>
        <ul>
          {blogsByUser.map((e) => {
            return (
              <div key={e.id}>
                <li >{e.title} - {e.author}</li>
              </div>
            )
          })
          }
        </ul>
      </div>
    )
    } else {
        console.log('else block')
        return (
            <div>ei blogsej</div>
        )
    }
}

export default Blogs