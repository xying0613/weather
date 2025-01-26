import useThemeStore from "../../store/themeStore";
import "./SearchInputBox.css";

function SearchInput({ city, setCity }) {
    const { theme } = useThemeStore();

    return (
        <div className="input-container">
            <span className="label">Country</span>
            <input
                type="text"
                placeholder="Enter Country Name"
                className={`search-input ${theme === "dark" ? "dark-mode" : "light-mode"}`}
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
        </div>
        
    );
}

export default SearchInput;
