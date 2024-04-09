interface HeightAndWeight {
    height: number;
    weight: number;
}

interface ExerciseDetails {
    argsArr: number[],
    targetValue: number
}

export const parseArgumentsHeightWeight = (args: string[]): HeightAndWeight => {
    if (process.argv.length > 4) throw new Error('Too many arguments');
    if (process.argv.length < 4) throw new Error('Insert more arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    }
    else {
        throw new Error('Arguments must be numbers');
    }  
};

export const parseArgumentsExercises = (args: string[]): ExerciseDetails => {
    if (process.argv.length > 10) throw new Error('Too many arguments');
    if (process.argv.length < 10) throw new Error('Insert more arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])) && !isNaN(Number(args[4])) && !isNaN(Number(args[5])) && !isNaN(Number(args[6])) && !isNaN(Number(args[7])) && !isNaN(Number(args[8])) && !isNaN(Number(args[9]))) {
        return {
            argsArr: [Number(args[3]), Number(args[4]), Number(args[5]), Number(args[6]), Number(args[7]), Number(args[8]), Number(args[9])],
            targetValue: Number(args[2])
        };
    }
    else {
        throw new Error('Arguments must be numbers');
    } 
};