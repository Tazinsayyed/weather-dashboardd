import React, { useState } from 'react';
import axios from 'axios';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import Favorites from './Favorites';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [cityName, setCityName] = useState('');

  // Handle Search functionality
  const handleSearch = (data) => {
    setWeatherData(data);
    setCityName(data.name);  // Set the city name for favorites
    fetchForecast(data.name); // Fetch 5-day forecast data
  };

  // Fetch the 5-day weather forecast
  const fetchForecast = async (city) => {
    const apiKey = 'a801eecf311e153ce397cf393691953a'; // Replace with your OpenWeatherMap API key
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(forecastUrl);
      setForecastData(response.data);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  return (
    <div>
      <h1>Weather Dashboard</h1>
      {/* Search Component */}
      <Search onSearch={handleSearch} />
      
      {/* Weather Display Component */}
      <WeatherDisplay weatherData={weatherData} forecastData={forecastData} />
      
      {/* Favorites Component */}
      {cityName && <Favorites cityName={cityName} />}
    </div>
  );
};

export default WeatherDashboard;
