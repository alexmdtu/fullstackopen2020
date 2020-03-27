import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/personService'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [error, setError] = useState(false)

    const numberToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter))

    useEffect(() => {
        personService
            .getAll()
            .then(allPersons => {
                setPersons(allPersons)
            })
    }, [])

    const setNotification = (message, error) => {
        setError(error)
        setNotificationMessage(message)
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

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
                    setNotification(`added ${returnedPerson.name}`, false)
                })
                .catch(error => {
                    setNotification(`Information of ${numberObject.name} has already been removed from server`, true)
                })
        } else {
            updateEntry(persons.find(person => person.name === newName).id)
            setNotification(`updated number of ${newName}`, false)
            setNewName('')
            setNewNumber('')
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

    const deleteEntry = (id) => {
        if (window.confirm(`Do you want to delete ${persons.find(person => person.id === id).name}?`)) {
            personService
                .deleteEntry(id)
                .then(() => {
                    setNotification(`deleted ${persons.find(person => person.id === id).name}`, false)
                    setPersons(persons.filter(person => person.id !== id))
                })
                .catch(error => {
                    setNotification(`Information of ${persons.find(person => person.id === id).name} has already been removed from server`, true)
                })
        }
    }

    const updateEntry = (id) => {
        if (window.confirm(`${persons.find(person => person.id === id).name} is already in the phonebook.Do you want to replace the old number with a new one ? `)) {
            const numberObject = {
                name: newName,
                number: newNumber
            }
            personService
                .update(id, numberObject)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                })
                .catch(error => {
                    setNotification(`Information of ${numberObject.name} has already been removed from server`, true)
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} isError={error} />
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>Add a new</h2>
            <PersonForm addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons numberToShow={numberToShow} handleDelete={deleteEntry} />
        </div>
    )
}

export default App