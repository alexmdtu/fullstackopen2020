import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addNumber = (event) => {
        event.preventDefault()
        console.log(persons.filter(person => person.name === newName));

        if (persons.filter(person => person.name === newName).length === 0) {
            const numberObject = {
                name: newName
            }
            setPersons(persons.concat(numberObject))
            setNewName('')

        } else {
            window.alert(`${newName} is already added to phonebook`)
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNumber}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map(person => <p key={person.name}>{person.name}</p>)}
            </div>
        </div>
    )
}

export default App