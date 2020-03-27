import React from 'react'

const Person = ({ name, number, deleteEntry }) => {
    return (
        <p>
            {name} {number}
            <button onClick={deleteEntry}>delete</button>
        </p>
    )
}

export default Person