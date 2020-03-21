import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const VoteCount = ({ votes, selected }) => {
    return (
        <p>has {votes[selected]} votes</p>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVote] = useState(new Array(anecdotes.length).fill(0))

    const handleSelected = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length))
    }

    const handleVote = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVote(copy)
    }

    return (
        <div>
            <p>{props.anecdotes[selected]}</p>
            <VoteCount votes={votes} selected={selected} />
            <Button onClick={handleVote} text='vote' />
            <Button onClick={handleSelected} text='next anectdote' />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)