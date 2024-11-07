import React from 'react';

const WeatherDisplay = ({ weatherData, forecastData }) => {
  if (!weatherData) return <p>Please search for a city.</p>;

  return (
    <div className="weather-info">
      <h2>{weatherData.name} Weather</h2>
      <p>Temperature: {weatherData.main.temp} °C</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Weather: {weatherData.weather[0].description}</p>

      <h3>5-Day Forecast</h3>
      {forecastData && forecastData.list.map((item, index) => (
        <div key={index}>
          <p>{item.dt_txt}: {item.main.temp} °C, {item.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherDisplay;
