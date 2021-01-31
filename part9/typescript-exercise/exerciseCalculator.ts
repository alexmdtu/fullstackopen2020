interface WorkoutStats {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface FullRating {
  rating: number,
  ratingDescription: string
}

interface Workout {
  dailyExerciseHours: Array<number>,
  target: number
}

const parseWorkoutArguments = (args: Array<string>): Workout => {
  if (args.length < 4) throw new Error('Not enough arguments');
  args.splice(0, 2);
  args.map(n => {
    if (isNaN(Number(n))) {
      throw new Error('Provided values were not numbers!');
    }
  });

  const target = Number(args[0]);
  args.splice(0, 1);
  const workoutHours: Array<number> = [];
  args.map(n => workoutHours.push(Number(n)));


  return {
    target: target,
    dailyExerciseHours: workoutHours
  };
};

const calculateExercises = (dailyExerciseHours: Array<number>, targetAmount: number): WorkoutStats => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(n => n !== 0).length;
  const average = dailyExerciseHours.reduce((acc, val) => acc + val, 0) / periodLength;

  const fullRating = (): FullRating => {
    const successPercentage = average / targetAmount;

    switch (true) {
      case successPercentage >= 1:
        return { rating: 1, ratingDescription: 'Great work! Keep it up!' };
      case successPercentage >= 0.8:
        return { rating: 2, ratingDescription: 'Not too bad, but could be better.' };
      case successPercentage < 0.8:
        return { rating: 3, ratingDescription: 'Not your best week. Do better next time.' };
      default:
        throw new Error('Something went wrong when calculating the rating.');
    }
  };

  const rating = fullRating();

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: average >= targetAmount,
    rating: rating.rating,
    ratingDescription: rating.ratingDescription,
    target: targetAmount,
    average: average
  };
};

try {
  const { dailyExerciseHours, target } = parseWorkoutArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (e) {
  const error = e as Error;
  console.log('Error, something bad happened, message: ', error.message);
}