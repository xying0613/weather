import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { format } from "date-fns";
import useThemeStore from "../store/themeStore";
import ThemeButton from "../components/Button/ThemeButton";
import SearchInputBox from "../components/InputBox/SearchInputBox";
import SearchButton from "../components/Button/SearchButton";
import SearchHistoryCard from "../components/Card/SearchHistoryCard";
import "./WeatherApp.css";

const API_KEY = process.env.REACT_APP_API_KEY;

function WeatherApp() {
    const { theme } = useThemeStore();
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);

    // Load search history from local storage
    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
        setHistory(savedHistory);
    }, []);

    // Save search history to local storage when it changes
    useEffect(() => {
        localStorage.setItem("weatherHistory", JSON.stringify(history));
    }, [history]);

    // Fetch weather data
    const fetchWeather = useCallback(async (cityName) => {
        try {
            setError(null);
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
            );
            setWeather(response.data);

            const newEntry = {
                countryName: response.data.name,
                countryCode: response.data.sys.country,
                date: format(new Date(), "dd-MM-yyyy hh:mma"),
            };

            setHistory((prev) => [newEntry, ...prev]);
        } catch (err) {
            setError("Country not found. Please try again.");
        }
    }, []);

    // Handle search action
    const handleSearch = () => {
        if (city.trim()) fetchWeather(city);
    };

    const themeClass = theme === "dark" ? "dark-mode" : "light-mode";

    return (
        <div className="weather-app">

        <ThemeButton />

        <div className="app-container">
            <div className="search-container">
                <SearchInputBox city={city} setCity={setCity} />
                <SearchButton onClick={handleSearch} />
            </div>

            { error && <p className="error-message">{error}</p>}

            <div className={`weather-info-container ${themeClass}`}>

                { weather && (
                    <div className="searched-weather-container">
                        <img   
                            src={weather.weather[0].main.toLowerCase().includes("clear") ? "/sun.png" : "/cloud.png"} 
                            alt="weather icon" 
                            className="weather-icon" 
                        />
                        <div className="today-weather-container">
                            <h1 className={`today-weather-title ${themeClass}`}>Today's Weather</h1>
                            <h1 className={`today-weather-temp ${themeClass}`}>{weather.main.temp}°</h1>
                            <span className={`today-weather-min-max-temp ${themeClass}`}>H:{weather.main.temp_max}° L:{weather.main.temp_min}°</span>
                            <p className={`today-weather-location ${themeClass}`}>{weather.name}, {weather.sys.country}</p>                            
                        </div>
                        
                        <div className={`today-weather-details ${themeClass}`}>
                            <p className="today-weather-cloud-sun">{weather.weather[0].main}</p>
                            <p className="today-weather-humidity">Humidity: {weather.main.humidity}%</p>
                            <p className="today-weather-datetime">{format(new Date(), "dd-MM-yyyy hh:mma")}</p>
                        </div>
                    </div>
                    )}

                    {/* Search History Section */}
                    <div className={`search-history-container ${themeClass}`}>
                        <div className="search-history-title">
                            <span>Search History</span>
                        </div>
                        <div className="search-history-list">
                            {history.map((entry, index) => (
                                <SearchHistoryCard
                                key={index}
                                entry={entry}
                                fetchWeather={fetchWeather}
                                onDelete={() => setHistory(history.filter((_, i) => i !== index))}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
