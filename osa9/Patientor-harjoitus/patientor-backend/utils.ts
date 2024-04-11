import { Gender, NewPatient } from "./types";

const isString = (value: unknown): value is string => {
    return typeof value === 'string' || value instanceof String;
};

const parseValues = (value: unknown): string => {
    if (!isString(value)) {
        throw new Error('Please add only string values');
    }

    return value;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    return date;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(gender)
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
}

const validateNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseValues(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseValues(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseValues(object.occupation)
        }

        return newPatient
    }

    throw new Error('Incorrect data: a field is missing');
};

export default validateNewPatient