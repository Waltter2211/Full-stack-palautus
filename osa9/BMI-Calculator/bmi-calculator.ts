import { parseArgumentsHeightWeight } from './utils'

const calculateBmi = (height: number, weight: number) => {
    const bmi: number = weight / (height * height)*10000;
    if (bmi < 18.5) {
        console.log('Underweight')
    }
    else if (bmi >= 18.5 && bmi <= 25) {
        console.log('Normal (healthy weight)')
    }
    else if (bmi > 25) {
        console.log('Overweight')
    }
}

try {
    const { height, weight } = parseArgumentsHeightWeight(process.argv);
    calculateBmi(height, weight)
} catch (error) {
    let errorMessage = 'Something bad happened'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage)
}