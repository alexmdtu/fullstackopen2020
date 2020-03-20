import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({ text }) => <h1>{text}</h1>

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value} {text === 'positive' ? '%' : ''}</td>
        </tr>

    )
}

const Statistics = ({ good, neutral, bad }) => {
    if (good + neutral + bad === 0) {
        return (
            <p>No feedback given</p>
        )
    }

    return (
        <table>
            <tbody>
                <Statistic text='good' value={good} />
                <Statistic text='neutral' value={neutral} />
                <Statistic text='bad' value={bad} />
                <Statistic text='all' value={good + neutral + bad} />
                <Statistic text='average' value={(good - bad) / (good + neutral + bad)} />
                <Statistic text='positive' value={good / (good + neutral + bad) * 100} />
            </tbody>
        </table>
    )
}

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => setGood(good + 1)
    const handleNeutralClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)

    return (
        <div>
            <Title text='give feedback' />
            <Button onClick={handleGoodClick} text='good' />
            <Button onClick={handleNeutralClick} text='neutral' />
            <Button onClick={handleBadClick} text='bad' />
            <Title text='statistics' />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)