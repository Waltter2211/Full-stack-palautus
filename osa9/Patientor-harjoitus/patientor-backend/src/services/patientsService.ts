import patientData from "../../data/patients";
import { NonSensitivePatient, Patient, NewPatient, Entry, EntryWithoutId } from "../../types";
import { v4 as uuidv4 } from 'uuid';

const getAllPatients = (): NonSensitivePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getSinglePatient = (id: string) => {
    return patientData.find(patient => patient.id === id);
    /* if (typeof foundPatient !== 'undefined') {
        return foundPatient.map((patient) => ({
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation
        }));
    } else {
        throw new Error('not found');
    } */
};

const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient = {
        id: uuidv4(),
        ...patient
    };
    patientData.push(newPatient);
    return newPatient;
};

const addEntry = ( entry: EntryWithoutId ): Entry => {
    const newEntry = {
        id: uuidv4(),
        ...entry
    };
    return newEntry;
};

export default {
    getAllPatients,
    getSinglePatient,
    addPatient,
    addEntry
};