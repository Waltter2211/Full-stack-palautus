import axios from "axios"
import Diary from "../../types"

const baseUrl = 'http://localhost:3000/api';

export const fetchDiaries = async () => {
    return await axios.get<Diary[]>(`${baseUrl}/diaries`)
}