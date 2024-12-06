import React, { useState, useEffect } from "react";
import "../static/weather.css";

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = "456e9a7d06a03c41c593829a5f316e88";
    const city = "Kasungu";

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch weather data");
                }
                const data = await response.json();
                setWeatherData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [city, apiKey]);

    if (loading) return <div className="weather">Loading weather...</div>;
    if (error) return <div className="weather error">{error}</div>;

    const { name, main, weather, wind } = weatherData;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

    return (
        <div className="weather">
            <h2>{name} Weather</h2>


            <p><strong> {weather[0].description}</strong></p>
            <div className="icon-container">
                <img src={iconUrl} alt={weather[0].description} className="weather-icon" />
            </div>
            <p><strong>Temperature:</strong> {main.temp}°C</p>
            
            <p><strong>Humidity:</strong> {main.humidity}%</p>
            <p><strong>Wind Speed:</strong> {wind.speed} m/s</p>
        </div>
    );
};

export default Weather;
