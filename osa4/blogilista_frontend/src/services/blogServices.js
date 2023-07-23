import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
  }

const deleteOne = (id, newObject) => {
  axios.delete(`${baseUrl}/${id}`, newObject)
}

export default { 
  getAll: getAll, 
  create: create,
  update: update,
  deleteOne: deleteOne,
}