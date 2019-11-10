const blogs = [
  {
    id: '5a451df771c224a31b5c8ce',
    title: 'Blog about investing',
    author: 'Make Manninen',
    url: 'www.etfs.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'dudeR',
      name: 'Ivan Ivanovna'
    }
  },
  {
    id: '5a451e21e0bb04a45638211',
    title: 'Meditation blog',
    author: 'Sam Jarris',
    url: 'www.Sam-Jarris-meditation.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'dudeR',
      name: 'Ivan Ivanovna'
    }
  },
  {
    id: '5a451e30b5ffd4a58fa79ab',
    title: 'Burger Blog Block',
    author: 'Treay Parkery',
    url: 'www.burger-palace.com',
    user: {
      _id: '5a437a9e54a7f168ddf138',
      username: 'TheCoon',
      name: 'Eric Cartman'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  let token = `bearer ${newToken}`
  console.log('token after setToken', token)
}

export default { getAll, setToken }