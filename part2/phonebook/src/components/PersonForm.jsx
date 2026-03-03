import { useState } from "react";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const nameExists = persons.some(
      (person) => person.name.toLowerCase() === newName.trim().toLowerCase(),
    );

    const numberExists = persons.some(
      (person) => person.number === newNumber.trim(),
    );

    if (numberExists) {
      alert(`${newNumber.trim()} is already added to phonebook`);
      return;
    }

    if (nameExists) {
      alert(`${newName.trim()} is already added to phonebook`);
      return;
    }

    if (newName.trim().length === 0 || newNumber.trim().length === 0) {
      alert("Тhe name and number fields cannot be empty.");
      return;
    }

    const personObject = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
