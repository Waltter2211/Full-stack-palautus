import express from 'express';
import patientsService from '../services/patientsService';
import validateNewPatient from '../../utils';
import { Diagnose } from '../../types';
import patients from '../../data/patients';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    const patientArr = patientsService.getAllPatients();
    res.send(patientArr);
});

patientsRouter.get('/:id', (req, res) => {
    try {
        const patientDetails = patientsService.getSinglePatient(req.params.id);
        if (typeof patientDetails !== 'undefined') {
            res.send(patientDetails);
        } else {
            res.status(500).send({ message: 'id not found' });
        }
    } catch (error) {
        console.log(error);
    }
});

patientsRouter.post('/', (req, res) => {
    try {
        const newPatient = validateNewPatient(req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

patientsRouter.post('/:id/entries', (req, res) => {
    const foundUser = patients.find(patient => patient.id === req.params.id);

    const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
        if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
          // we will just trust the data to be in correct form
          return [] as Array<Diagnose['code']>;
        }
      
        return object.diagnosisCodes as Array<Diagnose['code']>;
    };

    try {
        const parsedDiagnoses = parseDiagnosisCodes(req.body.diagnosisCodes);
        const entryObj = {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            description: req.body.description,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            date: req.body.date,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            specialist: req.body.specialist,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            healthCheckRating: req.body.healthCheckRating,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            type: req.body.type,
            diagnosisCodes: parsedDiagnoses,
        };
        const addedEntry = patientsService.addEntry(entryObj);
        foundUser?.entries.push(addedEntry);
        res.send(addedEntry);
    } catch (error) {
        console.log(error);
    }
});

export default patientsRouter;