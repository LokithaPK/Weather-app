import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'fd860f61d6beba8e41c9e7a5cb2cf138'; 

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError('');
    setWeather(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${apiKey}`
      );
      setWeather(response.data);
    } catch (err) {
      console.error('API Error:', err.response?.data || err.message);
      if (err.response?.status === 401) {
        setError('Invalid API key. Please check your API key.');
      } else if (err.response?.status === 404) {
        setError('Location not found. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try later.');
      }
    }
  };

  return (
    <div style={appContainer}>
      <div style={weatherContainer}>
        <h1 style={titleStyle}>Weather Forecast</h1>
        <form onSubmit={fetchWeather} style={formStyle}>
          <input
            type="text"
            placeholder="Enter city"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Get Weather
          </button>
        </form>

        {error && <p style={errorStyle}>{error}</p>}

        {weather && (
          <div style={weatherDetails}>
            <h2 style={cityName}>
              {weather.name}, {weather.sys.country}
            </h2>
            <p style={weatherDescription}>{weather.weather[0].description}</p>
            <div style={tempContainer}>
              <h1 style={tempStyle}>{Math.round(weather.main.temp)}°C</h1>
            </div>
            <p style={infoStyle}>Humidity: {weather.main.humidity}%</p>
            <p style={infoStyle}>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const appContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f0f4f8',
  fontFamily: 'Arial, sans-serif',
};

const weatherContainer = {
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
};

const titleStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '20px',
};

const formStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
};

const inputStyle = {
  padding: '12px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginRight: '10px',
  flex: '1',
};

const buttonStyle = {
  padding: '12px 20px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const weatherDetails = {
  marginTop: '20px',
};

const cityName = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px',
};

const weatherDescription = {
  fontSize: '18px',
  color: '#666',
  marginBottom: '20px',
};

const tempContainer = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '10px',
};

const tempStyle = {
  fontSize: '48px',
  color: '#ff4c4c',
};

const infoStyle = {
  fontSize: '16px',
  color: '#333',
  margin: '5px 0',
};

const errorStyle = {
  color: 'red',
  fontSize: '14px',
};

export default WeatherApp;
