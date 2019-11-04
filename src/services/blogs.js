import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log('token after setToken', token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  console.log('newblog:', newBlog)
  const config = {
    headers: { Authorization : token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  console.log('response.data:', response.data)
  return response.data
}

const update = async (updateBlog) => {
  console.log('updateBlog in blogservice update', updateBlog)
  const config = {
    headers: { Authorization : token }
  }
  const response = await axios.put(`${baseUrl}/${updateBlog.id}`, updateBlog, config)
  return response.data
}

const remove = async (deleteBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${deleteBlog.id}`, config)
  console.log('response', response)
  return response.data
}

export default { getAll, setToken, create, update, remove }