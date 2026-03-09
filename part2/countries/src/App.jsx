import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import Filter from "./components/Filter";
import Content from "./components/Content";
import List from "./components/List";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countriesService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <>
      <Filter filter={filter} setFilter={setFilter} />

      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        <List countries={filteredCountries} />
      )}

      {filteredCountries.length === 1 && (
        <Content country={filteredCountries[0]} />
      )}
    </>
  );
};

export default App;
