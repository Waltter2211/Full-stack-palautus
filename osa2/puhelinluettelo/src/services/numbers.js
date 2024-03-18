import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const getNumbers = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addNumber = (newPersonObj) => {
    const request = axios.post(baseUrl, newPersonObj)
    return request.then(response => response.data)
}

const deleteNumber = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateNumber = (id, updatedPersonObj) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPersonObj)
    return request.then(response => response.data)
}

export default {getNumbers, addNumber, deleteNumber, updateNumber}