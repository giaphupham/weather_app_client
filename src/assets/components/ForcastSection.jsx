import React, { useState } from 'react';

const ForecastSection = ({ forecast }) => {
  const [daysToShow, setDaysToShow] = useState(4);

  // Get the current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Filter out the current day's forecast
  const futureForecasts = forecast.filter(day => day.date !== today);

  // Slice the futureForecasts array based on the number of days to show
  const displayedForecasts = futureForecasts.slice(0, daysToShow);

  // Check if there are more forecasts to show
  const hasMore = futureForecasts.length > daysToShow;

  // Function to load more forecasts
  const loadMore = () => {
    setDaysToShow(prevDays => prevDays + 4);
  };

  // Function to show fewer forecasts
  const showLess = () => {
    setDaysToShow(prevDays => Math.max(prevDays - 4, 4)); // Ensure at least 4 days are shown
  };

  return (
    <div className="mt-6 ">
      <h2 className="text-xl font-bold mb-4">Forecast for the Next Days</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedForecasts.map((day, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">{new Date(day.date).toLocaleDateString()}</h3>
            <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-12 h-12 mb-2" />
            <p className="text-gray-700">Temperature: {day.day.avgtemp_c}°C</p>
            <p className="text-gray-700">Wind: {day.day.maxwind_kph} kph</p>
            <p className="text-gray-700">Humidity: {day.day.avghumidity}%</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between">
        {daysToShow > 4 && (
          <button
            onClick={showLess}
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Show Less
          </button>
        )}
        {hasMore && (
          <button
            onClick={loadMore}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default ForecastSection;
