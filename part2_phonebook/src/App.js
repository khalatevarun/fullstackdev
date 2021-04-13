import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length + 1,
    }
    const nameExists = persons.some(person => person.name === newName);
    console.log(nameExists)
    if(nameExists){
      window.alert(`${newName} is already added to phonebook`);
    }
    else{
  
    setPersons(persons.concat(personObject))
    setNewName('')
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
        <input
          value={newName}
          onChange={handleNameChange}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person, i) => 
          <p key={i}>
            {person.name}
          </p>
  )}

    </div>
  )
}

export default App