const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / (height * height)*10000;
    if (bmi < 18.5) {
        return 'Underweight'
    }
    else if (bmi > 18.5 && bmi < 25) {
        return 'Normal (healthy weight)'
    }
    else if (bmi > 25) {
        return 'Overweight'
    }
}

console.log(calculateBmi(180, 74))