import express from 'express';
import patientsService from '../services/patientsService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    const patientArr = patientsService.getAllPatients();
    res.send(patientArr);
});

patientsRouter.post('/', (req, res) => {
    try {
        const newPatient = patientsService.addPatient(req.body);
        const addedPatient = newPatient
        res.json(addedPatient);
    } catch (error) {
        console.log(error)
    }
});

export default patientsRouter;