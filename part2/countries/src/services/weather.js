import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = (capital) => {
  const apiKey = import.meta.env.VITE_SOME_KEY;
  const url = `${baseUrl}?q=${capital}&appid=${apiKey}&units=metric`;
  return axios.get(url).then((response) => {
    const data = response.data;
    return {
      temperature: data.main.temp,
      main: data.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      description: data.weather[0].description,
      wind: data.wind.speed,
    };
  });
};

export default getWeather;
