import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import "./index.css";

const SM = ({ successfulMessage }) => {
  if (successfulMessage === null) {
    return null;
  }

  return <div className="successful">{successfulMessage}</div>;
};
const EM = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null;
  }

  return <div className="error">{errorMessage}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "", number: "", id: 0 }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [successfulMessage, setsuccessfulMessage] = useState(null);
  const [errorMessage, seterrorMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  console.log("render", persons.length, "persons");

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const nameExists = persons.some((person) => person.name === newName);
    console.log(nameExists);
    if (nameExists) {
      if (
        window.confirm(
          newName +
            " is already added to phonebook, replace the old number with a new one?"
        )
      ) {
        const existingPerson = persons.find((p) => p.name === newName);
        const changedNumber = { ...existingPerson, number: newNumber };
        personService
          .update(changedNumber.id, changedNumber)
          .then((returnedPerons) => {
            console.log(returnedPerons);
            setPersons(
              persons.map((person) =>
                person.id !== changedNumber.id ? person : returnedPerons
              )
            );
            setsuccessfulMessage(
              changedNumber.name + "'s number has been updated."
            );
            setTimeout(() => {
              setsuccessfulMessage(null);
            }, 5000);

            setNewNumber("");
            setNewName("");
          })
          .catch((error) => {
            seterrorMessage(
              `'${changedNumber.name}' was already removed from server`
            );
            setTimeout(() => {
              seterrorMessage(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== changedNumber.id));
          });
      }
    } else {
      personService.create(personObject).then((returnedPerons) => {
        console.log(returnedPerons);
      });

      setPersons(persons.concat(personObject));
      setsuccessfulMessage(personObject.name + " has been added");
      setTimeout(() => {
        setsuccessfulMessage(null);
      }, 5000);
      setNewNumber("");
      setNewName("");
    }
  };
  console.log("This is outside event handler", persons);
  const deleteName = (event) => {
    event.preventDefault();

    if (window.confirm("Delete " + event.target.name + " ?")) {
      const id = event.target.value;
      personService.deleteName(id).then(() => {
        setPersons(persons.filter((p) => p.name !== event.target.name));
        console.log("this is inside deleteName event  handler", persons);
      });
      setsuccessfulMessage(
        event.target.name + " has been deleted from the records"
      );
      setTimeout(() => {
        setsuccessfulMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SM successfulMessage={successfulMessage} />
      <EM errorMessage={errorMessage} />
      <form onSubmit={addName}>
        <div>
          <label htmlFor="name">Name: </label>
          <input id="name" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="number">Number: </label>
          <input id="number" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => (
        <div key={i}>
          {person.name} {person.number}
          <button value={person.id} name={person.name} onClick={deleteName}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
