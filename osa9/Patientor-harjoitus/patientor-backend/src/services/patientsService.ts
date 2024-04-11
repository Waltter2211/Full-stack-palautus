import patientData from "../../data/patients";
import { NonSensitivePatientDetails, Patient, NewPatient } from "../../types";
import { v4 as uuidv4 } from 'uuid';

const getAllPatients = (): NonSensitivePatientDetails[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient = {
        id: uuidv4(),
        ...patient
    }
    patientData.push(newPatient)
    return newPatient;
};

export default {
    getAllPatients,
    addPatient
}