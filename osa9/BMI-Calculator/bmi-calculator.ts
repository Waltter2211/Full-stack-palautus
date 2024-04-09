import { parseArgumentsHeightWeight } from './utils';

export const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / (height * height)*10000;
    if (bmi < 18.5) {
        return 'Underweight';
    }
    else if (bmi >= 18.5 && bmi <= 25) {
        return 'Normal (healthy weight)';
    }
    else if (bmi > 25) {
        return 'Overweight';
    }
    else {
        return 'Please provide real value';
    }
};

try {
    const { height, weight } = parseArgumentsHeightWeight(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}