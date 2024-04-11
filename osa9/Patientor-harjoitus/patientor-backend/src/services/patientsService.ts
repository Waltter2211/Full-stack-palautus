import patientData from "../../data/patients";
import { NonSensitivePatientDetails, Patient } from "../../types";
import { NewPatient } from "../../types";
import { v4 as uuidv4 } from 'uuid';

const patients: Patient[] = patientData;

const getAllPatients = (): NonSensitivePatientDetails[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
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
    patients.push(newPatient)
    return newPatient;
};

export default {
    getAllPatients,
    addPatient
}