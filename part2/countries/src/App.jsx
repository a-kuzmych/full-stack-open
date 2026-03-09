import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import getWeather from "./services/weather";
import Filter from "./components/Filter";
import Content from "./components/Content";
import List from "./components/List";
import Weather from "./components/Weather";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()),
  );

  const showCountry = (country) => {
    setFilter(country.name.common);
  };

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const capital = filteredCountries[0].capital[0];
      getWeather(capital).then((weatherData) => {
        setWeather(weatherData);
      });
    }
  }, [filteredCountries]);

  return (
    <>
      <Filter filter={filter} setFilter={setFilter} />

      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        <List countriesList={filteredCountries} onShowCountry={showCountry} />
      )}

      {filteredCountries.length === 1 && (
        <>
          <Content country={filteredCountries[0]} />
          <Weather
            capital={filteredCountries[0].capital[0]}
            temperature={weather?.temperature}
            icon={weather?.icon}
            description={weather?.description}
            wind={weather?.wind}
          />
        </>
      )}
    </>
  );
};

export default App;
