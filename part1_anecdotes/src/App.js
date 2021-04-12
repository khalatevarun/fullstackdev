import React, { useState } from 'react'

const Max = (props) => {
  const max = Math.max(...props.votes)
  let index = props.votes.indexOf(max)

  if(max===0){
      return (
          <p>no votes yet</p>
      )
  }
  return (
    <>
    <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[index]}</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Array(6).fill(0))

  const change = () => {
    var random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const addvote = (selected) => {
    
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
     
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <button onClick = {() => addvote(selected)}>vote</button>
      <button onClick = {change}>next anecdote</button>
      <Max votes = {votes} anecdotes={anecdotes} />

    </div>
  )
}

export default App;