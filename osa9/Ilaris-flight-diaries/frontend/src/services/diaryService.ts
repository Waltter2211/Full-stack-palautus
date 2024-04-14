import axios from "axios"
import { Diary, NewDiary } from "../../types"

const baseUrl = 'http://localhost:3000/api';

export const fetchDiaries = async () => {
    return await axios.get<Diary[]>(`${baseUrl}/diaries`)
}

export const addNewDiary = async (diaryObj: NewDiary) => {
    try {
        return await axios.post<Diary[]>(`${baseUrl}/diaries`, diaryObj)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response!.data.split('.')[1])
        } else {
            console.error(error);
        }
    }
}