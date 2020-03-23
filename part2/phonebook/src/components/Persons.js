import React from 'react'
import Person from './Person'

const Persons = ({ numberToShow }) => {
    return (
        <div>
            {numberToShow.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
        </div>
    )
}

export default Persons