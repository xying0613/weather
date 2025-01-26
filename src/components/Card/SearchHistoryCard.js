import React from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import "./SearchHistoryCard.css"; 
import useThemeStore from "../../store/themeStore";

const SearchHistoryCard = ({ entry, fetchWeather, onDelete }) => {
    const { theme } = useThemeStore();

    return (
        <div className={`history-card ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
        <div className="history-content">
            <span className="history-city">{entry.countryName}, {entry.countryCode}</span>
            <span className={`history-date ${theme === "dark" ? "dark-mode" : "light-mode"}`}>{entry.date}</span>
        </div>
        <div className="history-buttons">
            <button className={`search-btn ${theme === "dark" ? "dark-mode" : "light-mode"}`} onClick={() => fetchWeather(entry.countryName)}>
            <FaSearch />
            </button>
            <button className={`delete-btn ${theme === "dark" ? "dark-mode" : "light-mode"}`} onClick={onDelete}>
            <FaTrash />
            </button>
        </div>
        </div>
    );
      
};

export default SearchHistoryCard;
