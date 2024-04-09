interface Result {
    periodLength: number, 
    trainingDays: number, 
    target: number, 
    average: number, 
    success: boolean, 
    rating: number, 
    ratingDescription: string
}

const calculateExercises = (args: number[], target: number): Result => {

    const hitSuccess: number = args.reduce((acc: number, curr: number): number => acc + curr, 0);
    const isSuccess: number = Number(process.env[1])

    return {
        periodLength: args.length,
        trainingDays: args.filter(day => day > 0).length,
        target: target,
        average: hitSuccess / args.length,
        success: hitSuccess > isSuccess? true : false,
        rating: hitSuccess > 0 && hitSuccess < 10? 1: hitSuccess > 10 && hitSuccess < 15? 2: hitSuccess > 15? 3: 0,
        ratingDescription: hitSuccess > 0 && hitSuccess < 10? 'could improve a lot': hitSuccess > 10 && hitSuccess < 15? 'not too bad but could be better': hitSuccess > 15? 'very good': 'very very bad'
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))