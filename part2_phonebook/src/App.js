import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: 9881190119 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState()


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
      window.alert(`${newName} is already added to phonebook`);
    }
    else{
  
    setPersons(persons.concat(personObject))
    setNewNumber()
    setNewName('')
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
          <p key={i}>
            {person.name} {person.number}
          </p>
  )}

    </div>
  )
}

export default App