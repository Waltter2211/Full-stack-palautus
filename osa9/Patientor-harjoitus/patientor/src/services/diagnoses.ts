import axios from "axios";
import { Diagnose } from "../types";

const getDiagnoses = async () => {
    const { data } = await axios.get<Diagnose[]>('http://localhost:3001/api/diagnoses');
    return data;
};

export default getDiagnoses;
