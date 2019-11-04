import React, { useState, useEffect } from "react";
import loginService from "./services/login";
import blogsService from "./services/blogs";
// import Blogs from './components/Blogs'
import NotificationError from "./components/NotificationError";
import NotificationSuccess from "./components/NotificationSuccess";
import Blog from "./components/Blog";
import CreateBlogForm from "./components/createBlogForm";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // start backend with npm run watch

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     console.log('fetchblogs runs')
  //       const blogs = await blogsService.getAll()
  //       console.log('blogs after getAll', blogs)
  //       setBlogs(blogs)
  //   }
  //   fetchBlogs()
  // }, [])

  useEffect(() => {
    console.log("loggeduser", window.localStorage.getItem("loggedBlogAppUser"));
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      console.log("loggeduser in if block:", loggedUserJSON);
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
      const fetchBlogs = async () => {
        console.log("fetchblogs runs");
        const initialBlogs = await blogsService.getAll();
        console.log("blogs after getAll", initialBlogs);
        const blogsByUser = initialBlogs.filter(blog => {
          return blog.user.username === user.username;
        });
        setBlogs(blogsByUser);
      };
      fetchBlogs();
    }
  }, []);

  // useEffect(() => {
  //   const blogsByUser = blogs.filter(blog => {
  //         return blog.user.username === user.username
  //       })
  //     setBlogs(blogsByUser)
  // }, [user])

  const handleLogin = async event => {
    event.preventDefault();
    let newUser = null;
    try {
      try {
        newUser = await loginService.login({
          username,
          password
        });
      } catch (exception) {
        console.log("exception in handlelogin", exception);
      }
      console.log("newuser in handlelogin", newUser.toString().toUpperCase());
      if (
        newUser.toString().toUpperCase() ===
        "ERROR: REQUEST FAILED WITH STATUS CODE 401"
      ) {
        console.log("intothe if block");
        setErrorMessage("Wrong username or password");
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      }
      if (newUser.username) {
        window.localStorage.setItem(
          "loggedBlogAppUser",
          JSON.stringify(newUser)
        );
        console.log("code continues after (if newuser.username");
        console.log("newuser.username", newUser.username);
        blogsService.setToken(newUser.token);
        setUser(newUser);
        console.log("USER after setUser in handlelogin");
        const fetchBlogs = async () => {
          console.log("fetchblogs runs");
          const initialBlogs = await blogsService.getAll();
          console.log("blogs after getAll", initialBlogs);
          const blogsByUser = initialBlogs.filter(blog => {
            console.log("user in filter", newUser);
            return blog.user.username === newUser.username;
          });
          setBlogs(blogsByUser);
        };
        fetchBlogs();
        console.log("blogs after setblogs in handlelogin", blogs);
        setUsername("");
        setPassword("");
      }

      console.log("handlelogin has run");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    setBlogs([])
    setUser(null);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = e => {
    setAuthor(e.target.value);
  };

  const handleUrlChange = e => {
    setUrl(e.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      };

      let createdBlog = null;
      console.log("newBlog in handlesubmit", newBlog);
      try {
        createdBlog = await blogsService.create(newBlog);
        console.log("createdBlog", createdBlog);
      } catch (error) {
        console.log("error", error);
      }
      // if (createdBlog) {
      //   const blogsByUser = blogs.filter(blog => {
      //     console.log('blog:', blog)
      //     console.log('user.username', user.username)
      //       return blog.user.username === user.username
      //     })
      const vittuBlogs = [...blogs, createdBlog];
      setBlogs(vittuBlogs);
      console.log("blogs after add", blogs);
      setSuccessMessage(`${createdBlog.title} was added!`);
      setAuthor("");
      setUrl("");
      setTitle("");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);
    } catch (exception) {
      setErrorMessage("Blog creation failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <NotificationError errorMessage={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <NotificationError errorMessage={errorMessage} />
      <NotificationSuccess successMessage={successMessage} />
      <h4>{user.name} logged in</h4>
      <button onClick={handleLogOut}>Log Out</button>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <CreateBlogForm
        handleAuthorChange={handleAuthorChange}
        handleTitleChange={handleTitleChange}
        handleUrlChange={handleUrlChange}
        handleSubmit={handleSubmit}
        title={title}
        author={author}
        url={url}
      />
    </div>
  );
};

export default App;
