const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.name}>
          <p>
            {person.name} {person.number}
          </p>
          <button onClick={() => deletePerson(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
