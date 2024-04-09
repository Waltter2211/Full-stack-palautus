import express from 'express';
import { calculateBmi } from './bmi-calculator';

const app = express();

const PORT = 3003;

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

app.listen(PORT, () => {
    console.log(`connected to ${PORT}`);
});