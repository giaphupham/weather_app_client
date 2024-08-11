import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherDisplay from './WeatherDisplay';
import ForecastSection from './ForcastSection';

const MainSection = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Clear old weather data at the start of a new day
    const clearOldWeatherData = () => {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      const storedData = Object.keys(localStorage).filter(key => key.startsWith('weather_data_'));
      storedData.forEach(key => {
        if (!key.includes(today)) {
          localStorage.removeItem(key);
        }
      });
    };

    clearOldWeatherData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/weather`, {
        location: city,
      });
      setWeather(response.data);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
      setWeather(null);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/weather-by-location`, {
              lat: latitude,
              lon: longitude,
            });
            setWeather(response.data);
            setCity('Current Location');
            setError(null);
          } catch (error) {
            setError(error.response ? error.response.data.error : 'An error occurred');
            setWeather(null);
          }
        },
        () => {
          setError('Unable to retrieve your location.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const saveWeatherData = () => {
    if (weather) {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      const storageKey = `weather_data_${today}`;
      const existingData = JSON.parse(localStorage.getItem(storageKey)) || {};
      
      if (!existingData[city]) {
        existingData[city] = [];
      }
      
      existingData[city].push({
        timestamp: new Date().toLocaleString(),
        weather: weather.current,
      });

      localStorage.setItem(storageKey, JSON.stringify(existingData));
      alert('Weather data saved!');
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-svh lg:flex mx-auto lg:justify-around">
      <div className="max-w-full w-full lg:w-2/6 h-1/3 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Weather Forecast</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">Enter City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="City name"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get Weather
          </button>

          <button
            type="button"
            onClick={getCurrentLocation}
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Use Current Location
          </button>

          {weather && (
            <button
              type="button"
              onClick={saveWeatherData}
              className="mt-4 w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Save Weather Data
            </button>
          )}
        </form>
      </div>

      {/* Display weather data */}
      {weather && (
        <div className='h-full lg:w-3/5'>
          <WeatherDisplay weather={weather.current} error={error} />
          <ForecastSection forecast={weather.forecast.forecast.forecastday} />
        </div>
      )}

    </div>
  );
};

export default MainSection;
