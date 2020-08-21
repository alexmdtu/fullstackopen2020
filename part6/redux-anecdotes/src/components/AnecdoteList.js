import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationsReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const showNotification = message => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    const voteOnAnecdote = (anecdote) => {
        dispatch(vote(anecdote))
        showNotification(anecdote.content)
    }

    return (
        anecdotes
            .sort((a, b) => a.votes - b.votes)
            .filter(anecdote => anecdote.content.includes(filter))
            .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteOnAnecdote(anecdote)}>vote</button>
                    </div>
                </div>
            )
    )
}

export default AnecdoteList