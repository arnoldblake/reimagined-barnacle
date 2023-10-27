import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <>{text} {value}</>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  if (good || neutral || bad) {
    return (
      <div>
        <h1>Give Feedback</h1>
        <Button text="Good" onClick={() => setGood(good + 1)}/>
        <Button text="Neutral"onClick={() => setNeutral(neutral + 1)}/>
        <Button text="Bad"onClick={() => setBad(bad + 1)}/>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <tr><td><Statistic text='Good' value={good}/></td></tr>
            <tr><td><Statistic text='Neutral' value={neutral}/></td></tr>
            <tr><td><Statistic text='Bad' value={bad}/></td></tr>
            <tr><td><Statistic text='All' value={good + neutral + bad}/></td></tr>
            <tr><td><Statistic text='Average' value={(good - bad) / (good + neutral + bad)}/></td></tr>
            <tr><td><Statistic text='Positive' value={(good) / (good + neutral + bad)}/></td></tr>
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Give Feedback</h1>
        <Button text="Good" onClick={() => setGood(good + 1)}/>
        <Button text="Neutral"onClick={() => setNeutral(neutral + 1)}/>
        <Button text="Bad"onClick={() => setBad(bad + 1)}/>
        <h1>Statistics</h1>
        <p>No feedback given.</p>
      </div>
    )
  }
}

export default App