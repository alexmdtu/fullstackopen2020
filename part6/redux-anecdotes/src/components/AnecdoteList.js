import React from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationsReducer'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes
    const filter = props.filter
    const dispatch = useDispatch()

    const voteOnAnecdote = (anecdote) => {
        dispatch(vote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const ConnectedAnecdoteList = connect(
    mapStateToProps
)(AnecdoteList)

export default ConnectedAnecdoteList