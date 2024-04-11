import patientData from "../../data/patients";
import { NonSensitivePatientDetails, Patient } from "../../types";

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

export default {
    getAllPatients
}