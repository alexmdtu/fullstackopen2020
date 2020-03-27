import React from 'react'
import Person from './Person'

const Persons = ({ numberToShow, handleDelete }) => {
    return (
        <div>
            {numberToShow.map(person => <Person key={person.name} name={person.name} number={person.number} deleteEntry={() => handleDelete(person.id)} />)}
        </div>
    )
}

export default Persons