const List = ({ countriesList, onShowCountry }) => {
  return (
    <>
      {countriesList.map((country) => (
        <div key={country.name.common}>
          <p>{country.name.common}</p>
          <button onClick={() => onShowCountry(country)}>Show</button>
        </div>
      ))}
    </>
  );
};

export default List;
