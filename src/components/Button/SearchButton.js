import { FaSearch } from "react-icons/fa";
import useThemeStore from "../../store/themeStore";
import "./SearchButton.css";

function SearchButton({ onClick }) {
    const { theme } = useThemeStore();

    return (
        <button onClick={onClick} className={`search-button ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
            <FaSearch className="search-icon" />
        </button>
    );
}

export default SearchButton;
