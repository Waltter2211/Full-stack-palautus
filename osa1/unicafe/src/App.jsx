import { useState } from 'react'

const Feedback = ({ setGood, setNeutral, setBad }) => {
  return(
    <div>
      <h1>give feedback</h1>
      <button onClick={setGood}>good</button>
      <button onClick={setNeutral}>neutral</button>
      <button onClick={setBad}>bad</button>
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  const all = good+neutral+bad
  const average = (good-bad)/all
  const positive = (good*100)/all

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={all} />
            <StatisticsLine text="average" value={average} />
            <StatisticsLine text="positive" value={positive} />
          </tbody>
        </table>
      </div>
    )
  }
}

const StatisticsLine = ({ text, value }) => {
  if(text === "positive") return <tr><td>{text}</td><td>{value}%</td></tr>
  return <tr><td>{text}</td><td>{value}</td></tr>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Feedback setGood={handleGood} setNeutral={handleNeutral} setBad={handleBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App