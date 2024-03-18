import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const getNumbers = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addNumber = (newPersonObj) => {
    const request = axios.post("http://localhost:3001/persons", newPersonObj)
    return request.then(response => response.data)
}

export default {getNumbers, addNumber}