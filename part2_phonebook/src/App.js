import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: '', number: '', id:0 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    const nameExists = persons.some(person => person.name === newName);
    console.log(nameExists)
    if(nameExists){
      if(window.confirm(newName+" is already added to phonebook, replace the old number with a new one?")){
        const existingPerson = persons.find(p => p.name === newName)
        const changedNumber = {...existingPerson, number: newNumber}
        const url = `http://localhost:3001/persons/${changedNumber.id}`
        axios.put(url,changedNumber) 
        .then(response => {
          console.log(response)
          setPersons(persons.map(person => person.id !== changedNumber.id ? person : response.data))
        })

      }
    }
    else{

      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
      })
  
    setPersons(persons.concat(personObject))
    setNewNumber('')
    setNewName('')
  }
}

const deleteName = (event) => {
  event.preventDefault()
  const name = persons[event.target.value - 1].name
  if (window.confirm("Delete "+name+" ?")) {
    const id = event.target.value
  axios.delete("http://localhost:3001/persons/"+id).then(response => {
    console.log(response)
    


  });
   
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
        <label htmlFor="name">Name: </label>
        <input
          id ="name"
          value={newName}
          onChange={handleNameChange}
        />
        </div>
        <div>
        <label htmlFor="number">Number: </label>
        <input
          id = "number"
          value={newNumber}
          onChange={handleNumberChange}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person, i) => 
          <div key={i}>
            {person.name} {person.number} 
            <button value= {person.id} onClick={deleteName}>delete</button>
          </div>
         
  )}

    </div>
  )
}

export default App