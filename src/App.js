import React, { useState, useEffect } from 'react';
import loginService from './services/login';
import blogsService from './services/blogs';
import NotificationError from './components/NotificationError';
import NotificationSuccess from './components/NotificationSuccess';
import Blog from './components/Blog';
import CreateBlogForm from './components/createBlogForm';
import Togglable from './components/Toggleable';
import { useField } from './hooks'

const App = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  // const [title, setTitle] = useState('');
  // const [author, setAuthor] = useState('');
  // const [url, setUrl] = useState('');
  const name = useField('text')
  const pass = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const createBlogFormRef = React.createRef();


  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogsService.getAll()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);




  const handleLogin = async event => {
    event.preventDefault();
    let newUser = null;
    try {
      try {
        const username = name.value
        const password = pass.value
        newUser = await loginService.login({
          username,
          password
        });
      } catch (exception) {
        console.log('exception in handlelogin', exception);
      }
      if (
        newUser.toString().toUpperCase() ===
        'ERROR: REQUEST FAILED WITH STATUS CODE 401'
      ) {
        setErrorMessage('Wrong username or password');
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      }
      if (newUser.username) {
        window.localStorage.setItem(
          'loggedBlogAppUser',
          JSON.stringify(newUser)
        );
        blogsService.setToken(newUser.token);
        setUser(newUser);
        name.reset()
        pass.reset()
        // setUsername('');
        // setPassword('');
      }

    } catch (exception) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    createBlogFormRef.current.toggleVisibility()
    try {
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value
      };

      let createdBlog = null;
      try {
        createdBlog = await blogsService.create(newBlog);
      } catch (error) {
        console.log('error', error);
      }
      const updatedBlogs = [...blogs, createdBlog];
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
      setSuccessMessage(`${createdBlog.title} was added!`);
      author.reset()
      title.reset()
      url.reset()
      // setAuthor('');
      // setUrl('');
      // setTitle('');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);
    } catch (exception) {
      setErrorMessage('Blog creation failed');
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  const handleUpdate = async blog => {
    const updateBlog = {
      ...blog,
      likes: blog.likes + 1
    };

    try {
      const likedBlog = await blogsService.update(updateBlog);
      const filteredBlogs = blogs.filter(blog => blog.id !== likedBlog.id);
      const updatedBlogs = [...filteredBlogs, likedBlog];
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleRemove = async deleteBlog => {
    if (window.confirm(`Do you want to delete blog: ${deleteBlog.title} by ${deleteBlog.author}?`)) {
      try {
        await blogsService.remove(deleteBlog);
        setBlogs(blogs.filter(blog => blog.id !== deleteBlog.id))
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  const removeReset = (obj) => {
    // eslint-disable-next-line no-unused-vars
    const { reset, ...noReset } = obj
    return noReset
  }

  if (user === null) {
    return (
      <div className='loginFormView'>
        <h2>Log in to application</h2>
        <NotificationError errorMessage={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input {...removeReset(name)} />
          </div>
          <div>
            password
            <input {...removeReset(pass)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div className='loggedInView'>
      <h2>Blogs</h2>
      <NotificationError errorMessage={errorMessage} />
      <NotificationSuccess successMessage={successMessage} />
      <h4>{user.name} logged in</h4>
      <button onClick={handleLogOut}>Log Out</button>
      <Togglable buttonLabel="new blog" ref={createBlogFormRef}>
        <CreateBlogForm
          handleSubmit={handleSubmit}
          title={removeReset(title)}
          author={removeReset(author)}
          url={removeReset(url)}
        />
      </Togglable>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdate={handleUpdate}
          handleRemove={handleRemove}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
