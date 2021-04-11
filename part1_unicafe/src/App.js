import React, {useState} from 'react'


var count = 0.0
var sum = 0


const Button = (props) => {
  console.log(props)
  return (
  <button onClick= {props.handleClick}>{props.option}</button>
  )
}

const App = () => {
 
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)


  const handleClicks = (value) => {
    if(value === 1){
      setGood(good+1)
      count +=  1
      sum += 1
      setAverage(sum/count)
      setPositive(good/count *100)

    }
     if(value === 0){
      setNeutral(neutral+1)
      count +=1
      sum += 0
      setAverage(sum/count)
      setPositive(good/count *100)
    }
    if(value === -1){
      setBad(bad+1)
      count += 1
      sum -= 1
      setAverage(sum/count)
      setPositive(good/count *100)
    }

  }

 


  





  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {() => handleClicks(1) } option = "good"/>
      <Button handleClick = {() => handleClicks(0) } option = "neutral"/>
      <Button handleClick = {() => handleClicks(-1)} option = "bad"/>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>  
      <p>average {average}</p>
      <p>positive {positive}</p>
     
      
    </div>
  )
}

export default App;
