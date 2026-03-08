import { useState, useEffect } from "react";
import "./index.css";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: "success",
  });

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (newPersonObject) => {
    return personService.create(newPersonObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNotification({
        message: `Added ${returnedPerson.name}`,
        type: "success",
      });
      setTimeout(() => {
        setNotification({ message: null, type: "success" });
      }, 5000);
    });
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setNotification({ message: `Deleted ${name}`, type: "success" });
          setTimeout(() => {
            setNotification({ message: null, type: "success" });
          }, 5000);
        })
        .catch(() => {
          setNotification({
            message: `Information of ${name} has already been removed from server`,
            type: "error",
          });
          setTimeout(() => {
            setNotification({ message: null, type: "error" });
          }, 5000);
        });
    }
  };

  const updatePerson = (id, updatedPerson) => {
    if (
      window.confirm(
        `${updatedPerson.name} is already added to phonebook, replace the old number with a new one?`,
      )
    ) {
      return personService
        .update(id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map((p) => (p.id === id ? returnedPerson : p)));
          setNotification({
            message: `Updated ${returnedPerson.name}'s number`,
            type: "success",
          });
          setTimeout(() => {
            setNotification({ message: null, type: "success" });
          }, 5000);
        })
        .catch(() => {
          setNotification({
            message: `Information of ${updatedPerson.name} has already been removed from server`,
            type: "error",
          });
          setTimeout(() => {
            setNotification({ message: null, type: "error" });
          }, 5000);
        });
    }
  };

  const personsToShow = filter
    ? persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>
      <PersonForm
        createPerson={addPerson}
        updatePerson={updatePerson}
        persons={persons}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
