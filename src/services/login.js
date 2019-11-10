import axios from 'axios'
const baseurl = '/api/login'

const login = async (credentials) => {
  console.log('credentials', credentials)
  try {
    const response = await axios.post(baseurl, credentials)
    console.log('response', response)
    return response.data
  } catch (exception) {
    console.log(exception)
    return exception
  }
}

export default { login }