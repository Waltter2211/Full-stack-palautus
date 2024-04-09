import express from 'express';
import { calculateBmi } from './bmi-calculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get(`/bmi?:height?:weight`, (req, res) => {

    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);

    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        const calculatedBmi = calculateBmi(height, weight);

        res.send({ weight, height, bmi: calculatedBmi });
    }
    else {
        res.send({error: 'malformatted parameters'});
    }    
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exerciseHours: number[] = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const targetHours: number = req.body.target;

    if (exerciseHours === undefined || targetHours === undefined) {
        res.status(500).send({ error: 'parameters missing' });
    }
    
    else {
        exerciseHours.forEach(element => {
            if (typeof element !== 'number') {
                res.status(500).send({ error: 'malformatted parameters' });
            }
        });

        if (exerciseHours.some(isNaN) || typeof targetHours !== 'number') {
            res.status(500).send({ error: 'malformatted parameters' });
        }
        else {
            const result = calculateExercises(exerciseHours, targetHours);
            res.send(result);
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`connected to ${PORT}`);
});