import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" onClick={() => setGood(good + 1)}/>
      <Button text="Neutral"onClick={() => setNeutral(neutral + 1)}/>
      <Button text="Bad"onClick={() => setBad(bad + 1)}/>
      <h1>Statistics</h1>
      <Statistic text='Good' value={good}/>
      <Statistic text='Neutral' value={neutral}/>
      <Statistic text='Bad' value={bad}/>
      <Statistic text='All' value={good + neutral + bad}/>
      <Statistic text='Average' value={(good - bad) / (good + neutral + bad)}/>
      <Statistic text='Positive' value={(good) / (good + neutral + bad)}/>
    </div>
  )
}

export default App