import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/personService'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const numberToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter))

    useEffect(() => {
        personService
            .getAll()
            .then(allPersons => {
                setPersons(allPersons)
            })
    }, [])

    const addNumber = (event) => {
        event.preventDefault()

        if (persons.filter(person => person.name === newName).length === 0) {
            const numberObject = {
                name: newName,
                number: newNumber
            }
            personService
                .create(numberObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
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