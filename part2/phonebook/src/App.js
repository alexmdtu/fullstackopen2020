import React, { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const numberToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter))

    const addNumber = (event) => {
        event.preventDefault()

        if (persons.filter(person => person.name === newName).length === 0) {
            const numberObject = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(numberObject))
            setNewName('')
            setNewNumber('')
        } else {
            window.alert(`${newName} is already added to phonebook`)
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>Add a new</h2>
            <PersonForm addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons numberToShow={numberToShow} />
        </div>
    )
}

export default App