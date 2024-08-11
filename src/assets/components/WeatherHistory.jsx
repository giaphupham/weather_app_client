import React, { useState, useEffect } from 'react';

const WeatherHistory = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        const fetchWeatherData = () => {
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
            const storageKey = `weather_data_${today}`;
            const storedData = JSON.parse(localStorage.getItem(storageKey)) || {};

            // Flatten the data into a single array
            const dataArray = Object.keys(storedData).reduce((acc, location) => {
                return acc.concat(storedData[location].map(entry => ({
                    location: location,
                    timestamp: entry.timestamp,
                    weather: entry.weather
                })));
            }, []);

            if (dataArray.length > 0) {
                setWeatherData(dataArray);
                setHasData(true);
            } else {
                setHasData(false);
            }
        };

        fetchWeatherData();
    }, []);

    const handleDelete = (timestamp, location) => {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        const storageKey = `weather_data_${today}`;
        const storedData = JSON.parse(localStorage.getItem(storageKey)) || {};

        // Remove the specific entry from the data
        if (storedData[location]) {
            const updatedEntries = storedData[location].filter(entry => entry.timestamp !== timestamp);

            // Update localStorage with the new data
            if (updatedEntries.length > 0) {
                storedData[location] = updatedEntries;
                localStorage.setItem(storageKey, JSON.stringify(storedData));
            } else {
                delete storedData[location];
                localStorage.setItem(storageKey, JSON.stringify(storedData));
            }
        }

        // Refresh the state
        fetchWeatherData();
    };

    const fetchWeatherData = () => {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        const storageKey = `weather_data_${today}`;
        const storedData = JSON.parse(localStorage.getItem(storageKey)) || {};

        // Flatten the data into a single array
        const dataArray = Object.keys(storedData).reduce((acc, location) => {
            return acc.concat(storedData[location].map(entry => ({
                location: location,
                timestamp: entry.timestamp,
                weather: entry.weather
            })));
        }, []);

        if (dataArray.length > 0) {
            setWeatherData(dataArray);
            setHasData(true);
        } else {
            setHasData(false);
        }
    };

    return (
        <div className=''>
            {hasData ? (
                <ul>
                    {weatherData.map((entry, index) => (
                        <li key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-2/6 w-full mt-4 lg:mt-0 mb-2 lg:flex lg:justify-between">
                            <div>
                                <strong>{entry.location}</strong> - {entry.timestamp}
                                <div className="ml-4">
                                    <p><strong>Temperature:</strong> {entry.weather.current.temp_c}°C</p>
                                    <p><strong>Condition:</strong> {entry.weather.current.condition.text}</p>
                                    <p><strong>Humidity:</strong> {entry.weather.current.humidity}%</p>
                                    <p><strong>Wind Speed:</strong> {entry.weather.current.wind_kph} km/h</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleDelete(entry.timestamp, entry.location)}
                                className="bg-red-500 text-white p-2 rounded-lg h-1/4"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No history available for today.</p>
            )}
        </div>
    );
};

export default WeatherHistory;
