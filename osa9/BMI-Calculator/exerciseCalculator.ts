import { parseArgumentsExercises } from "./utils";

interface Result {
    periodLength: number, 
    trainingDays: number, 
    target: number, 
    average: number, 
    success: boolean, 
    rating: number, 
    ratingDescription: string
}

export const calculateExercises = (args: number[], target: number): Result => {

    const hitSuccess: number = args.reduce((acc: number, curr: number): number => acc + curr, 0);

    return {
        periodLength: args.length,
        trainingDays: args.filter(day => day > 0).length,
        target: target,
        average: hitSuccess / args.length,
        success: (hitSuccess / args.length) > target? true : false,
        rating: hitSuccess > 0 && hitSuccess < 10? 1: hitSuccess > 10 && hitSuccess < 15? 2: hitSuccess > 15? 3: 0,
        ratingDescription: hitSuccess > 0 && hitSuccess < 10? 'could improve a lot': hitSuccess > 10 && hitSuccess < 15? 'not too bad but could be better': hitSuccess > 15? 'very good': 'very very bad'
    };
};

try {
    const { argsArr, targetValue } = parseArgumentsExercises(process.argv);
    console.log(calculateExercises(argsArr, targetValue));
} catch (error) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}