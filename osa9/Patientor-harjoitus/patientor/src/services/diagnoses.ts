import axios from "axios";
import { Diagnose, Entry, NewEntry } from "../types";

export const getDiagnoses = async () => {
    const { data } = await axios.get<Diagnose[]>('http://localhost:3001/api/diagnoses');
    return data;
};

export const addEntry = async (id: string, object: NewEntry) => {
    const { data } = await axios.post<Entry[]>(`http://localhost:3001/api/patients/${id}/entries`, object);
    return data;
};

export default { getDiagnoses, addEntry };
