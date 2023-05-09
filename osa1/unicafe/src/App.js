import { useState } from 'react'

const Header = () => {
  <h1>give feedback</h1>
}

const Statistictitle = () => {
  <h1>Statistics</h1>
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}:</td><td>{value}</td>
    </tr>
  )
}

const Statistics = ({goodRep, neutralRep, badRep, allRep, avrgRep, positiveRep}) => {
  if (goodRep || neutralRep || badRep !== 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={goodRep} />
          <StatisticLine text="neutral" value={neutralRep} />
          <StatisticLine text="bad" value={badRep} />
          <StatisticLine text="all" value={allRep} />
          <StatisticLine text="average" value={avrgRep} />
          <StatisticLine text="positive" value={positiveRep} />
        </tbody>
      </table>
    )
  } 
  
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  <button onClick={handleClick}>
    {text}
  </button>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const avrg = (good - bad)/all
  const positive = (good*100)/all

  const setGoodRep = () => {
    setGood(good + 1)
  }

  const setNeutralRep = () => {
    setNeutral(neutral + 1)
  }

  const setBadRep = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <Header />
        <Button handleClick={setGoodRep} text='good' />
        <Button handleClick={setNeutralRep} text='neutral' />
        <Button handleClick={setBadRep} text='bad' />
        <Statistictitle />
        <Statistics goodRep={good} neutralRep={neutral} badRep={bad} allRep={all} avrgRep={avrg} positiveRep={positive} />
      </div>
    </div>
  )
}

export default App
