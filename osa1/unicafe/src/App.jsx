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
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {(good-bad)/all}</p>
        <p>positive {(good*100)/all}%</p>
      </div>
    )
  }
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