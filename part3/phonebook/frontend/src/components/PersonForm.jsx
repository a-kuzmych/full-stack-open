import { useState } from "react";

const PersonForm = ({ createPerson, updatePerson, persons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const nameTrimmed = newName.trim();
    const numberTrimmed = newNumber.trim();

    if (!nameTrimmed || !numberTrimmed) {
      alert("Please fill in both name and number.");
      return;
    }

    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === nameTrimmed.toLowerCase(),
    );

    if (existingPerson) {
      updatePerson(existingPerson.id, {
        ...existingPerson,
        number: numberTrimmed,
      }).then(() => {
        setNewName("");
        setNewNumber("");
      });
      return;
    }

    createPerson({ name: nameTrimmed, number: numberTrimmed }).then(() => {
      setNewName("");
      setNewNumber("");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
