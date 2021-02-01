import React from 'react';
import { CoursePartProps } from '../types';
import Part from './Part';

const Content: React.FC<CoursePartProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(course => <Part key={course.name} part={course} />)}
    </div>
  )
};

export default Content;