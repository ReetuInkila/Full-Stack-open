import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good+1)} text="good" />
        <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
        <Button handleClick={() => setBad(bad+1)} text="bad" />
        
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
)

const Statistics = (props) => {
    if (props.good || props.neutral|| props.bad) {
        return(
            <table>
                <tbody>
                    <StatisticLine text='good' value={props.good}/>
                    <StatisticLine text='neutral' value={props.neutral}/>
                    <StatisticLine text='bad' value={props.bad}/>
                    <StatisticLine text='all' value={props.good+props.neutral+props.bad}/>
                    <StatisticLine text='average' value={(props.good-props.bad)/(props.good+props.neutral+props.bad)}/>
                    <StatisticLine text='positive' value={props.good/(props.good+props.neutral+props.bad)} unit='%'/>
                </tbody>
            </table>
        )              
    }else{
        return(
            <p>No feedback given</p>
        )
    }
}

const StatisticLine = (props)=>(
    <tr><td>{props.text}</td><td>{props.value} {props.unit}</td></tr>
)
  

export default App