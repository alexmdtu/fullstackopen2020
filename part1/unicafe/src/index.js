import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({ text }) => <h1>{text}</h1>

const FeedbackStats = ({ text, number }) => <p>{text} {number}</p>

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
            <FeedbackStats text='good' number={good} />
            <FeedbackStats text='neutral' number={neutral} />
            <FeedbackStats text='neutral' number={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)