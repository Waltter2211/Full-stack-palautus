import express from 'express';
import patientsService from '../services/patientsService';
import validateNewPatient from '../../utils';

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

export default patientsRouter;