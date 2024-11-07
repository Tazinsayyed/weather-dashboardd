
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Favorites = ({ cityName }) => {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorite cities from the JSON Server
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, []);

  // Add city to favorites
  const addFavorite = async () => {
    if (!cityName) return;

    const newFavorite = { city: cityName };

    // Avoid duplicates
    if (favorites.some((fav) => fav.city === cityName)) return;

    try {
      const response = await axios.post('http://localhost:5000/favorites', newFavorite);
      setFavorites([...favorites, response.data]);
    } catch (error) {
      console.error("Error adding favorite city:", error);
    }
  };

  // Remove city from favorites
  const removeFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${id}`);
      setFavorites(favorites.filter((city) => city.id !== id));
    } catch (error) {
      console.error("Error removing favorite city:", error);
    }
  };

  return (
    <div className="favorites">
      <h2>Your Favorite Cities</h2>
      <button onClick={addFavorite}>Add {cityName} to Favorites</button>
      <ul className="favorites-list">
        {favorites.map((city) => (
          <li key={city.id} className="favorite-item">
            {city.city} <button onClick={() => removeFavorite(city.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
