const Weather = ({ capital, temperature, icon, description, wind }) => {
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature {temperature}°C</p>
      <img src={icon} alt={description} />
      <p>Wind {wind} m/s</p>
    </div>
  );
};

export default Weather;
