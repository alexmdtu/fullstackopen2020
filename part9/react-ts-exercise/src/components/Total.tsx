import React from 'react';
import { CoursePartProps } from '../types';

const Total: React.FC<CoursePartProps> = ({ courseParts }) => {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
};

export default Total;