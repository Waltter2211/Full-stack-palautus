import express from 'express';
import patientsService from '../services/patientsService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    const patientArr = patientsService.getAllPatients();
    res.send(patientArr);
});

export default patientsRouter;