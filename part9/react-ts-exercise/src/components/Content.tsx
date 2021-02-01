import React from 'react';

const Content: React.FC<{ courseParts: { name: string, exerciseCount: number }[] }> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(course => <p key={course.name}>{course.name} {course.exerciseCount}</p>)}
    </div>
  )
};

export default Content;