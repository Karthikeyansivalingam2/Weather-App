
import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const API_KEY = '747c79bcadc8663494275e9e5a5a68db'; // Use your own key

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      setCity('');
    } catch (err) {
      setError('City not found or API error.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`weather-app-animated ${weather ? weather.weather[0].main.toLowerCase() : ''}`}> 
      <div className="weather-card-glass animated-card">
        <h2><span role="img" aria-label="cloud">☁️</span> Weather Report</h2>
        <p className="subtitle">Get real-time weather updates for your city!</p>
        <form onSubmit={fetchWeather} className="weather-form">
          <input
            type="text"
            placeholder="Enter your City Name"
            value={city}
            onChange={e => setCity(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Get Report'}</button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {weather && (
          <div className="weather-details">
            <div className="weather-main-info">
              <div className="weather-icon">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt={weather.weather[0].description}
                />
              </div>
              <div className="weather-temp-block">
                <span className="weather-temp">{Math.round(weather.main.temp)}°C</span>
                <span className="weather-condition">{weather.weather[0].main}</span>
                <span className="weather-desc">{weather.weather[0].description}</span>
              </div>
            </div>
            <div className="weather-extra-info">
              <div><b>Humidity:</b> {weather.main.humidity}%</div>
              <div><b>Wind Speed:</b> {weather.wind.speed} m/s</div>
              <div><b>City:</b> <span className="city-name">{weather.name}</span></div>
              <div><b>Date:</b> {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
