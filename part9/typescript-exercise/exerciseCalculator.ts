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
  }

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
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));