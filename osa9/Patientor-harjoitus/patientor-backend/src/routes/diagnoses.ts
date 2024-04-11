import express from 'express';
import diagnosesService from '../services/diagnosesService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
    const diagnosesArr = diagnosesService.getAllDiagnoses()
    res.send(diagnosesArr);
});

export default diagnosesRouter;