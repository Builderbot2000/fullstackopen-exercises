import { useState } from 'react'

const Statistics = (props) => {
  if (props.all == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text='good' value={props.good} />
          <StatisticsLine text='neutral' value={props.neutral} />
          <StatisticsLine text='bad' value={props.bad} />
          <StatisticsLine text='all' value={props.all} />
          <StatisticsLine text='average' value={props.average} />
          <StatisticsLine text='positive' value={props.positive + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <Button text='good' onClick={() => {  
        setGood(good + 1)
        setAll(all + 1)
        console.log('good: ', good, 'bad: ', bad)
        setAverage((good - bad)/(all+1))
        setPositive(good/(all+1)*100)
      }}/>
      
      <Button text='neutral' onClick={() => {
        setNeutral(neutral + 1)
        setAll(all + 1)
        console.log('good: ', good, 'bad: ', bad)
        setAverage((good - bad)/(all+1))
        setPositive(good/(all+1)*100)
      }}/>

      <Button text='good' onClick={() => {
        setBad(bad + 1)
        setAll(all + 1)
        console.log('good: ', good, 'bad: ', bad+1)
        setAverage((good - bad - 1)/(all+1))
        setPositive(good/(all+1)*100)
      }}/>

      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App
