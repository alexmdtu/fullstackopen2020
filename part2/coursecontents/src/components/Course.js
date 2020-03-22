import React from 'react'

const Header = ({ courseName }) => {
    return (
        <>
            <h1>{courseName}</h1>
        </>
    )
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </>
    )
}

const Part = ({ part }) => {
    return (
        <>
            <p>
                {part.name} {part.exercises}
            </p>
        </>
    )
}

const Total = ({ parts }) => {
    return (
        <>
            <strong>Number of exercises {parts.reduce((acc, part) => acc + part.exercises, 0)}</strong>
        </>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course