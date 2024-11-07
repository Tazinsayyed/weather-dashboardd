import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = async () => {
    if (!city) return;

    const apiKey = 'a801eecf311e153ce397cf393691953a'; // Replace with your OpenWeatherMap API key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(weatherUrl);
      onSearch(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;

