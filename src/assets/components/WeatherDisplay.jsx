// components/WeatherDisplay.js
import React from 'react';

const WeatherDisplay = ({ weather, error }) => {
  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!weather) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-2/6 w-full mt-4 lg:mt-0">
      <div className="lg:flex">
        <div className='flex flex-col space-y-2'>
          <h2 className="text-xl lg:text-3xl font-bold text-gray-800 mb-2">{weather.location.name} ({formatDate(weather.location.localtime)})</h2>
          <p className="text-md lg:text-lg text-gray-600">{weather.location.country}</p>
          <p className="text-gray-700">Wind Speed: {weather.current.wind_kph} kph</p>
          <p className="text-gray-700">Humidity: {weather.current.humidity}%</p>
        </div>
        <div className='my-6 mx-2 self-center'>
          <p className="text-6xl font-semibold text-blue-600">{weather.current.temp_c}°C</p>
        </div>
        <div className='flex flex-col items-center mx-auto'>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className="w-20 h-20 mb-4"
          />
          <p className="text-md text-gray-600 mb-2">{weather.current.condition.text}</p>
          
        </div>
        
      </div>
    </div>
  );
};

export default WeatherDisplay;
