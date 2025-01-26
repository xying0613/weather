import { FaRegSun, FaRegMoon } from 'react-icons/fa'; // Import icons for sun and moon
import useThemeStore from "../../store/themeStore";
import "./ThemeButton.css"; // Make sure to include your CSS for the switch styling

function ThemeButton() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={theme === "dark"} // Set the switch based on the current theme
        onChange={toggleTheme} // Toggle the theme on change
      />
      <span className="slider">
        <FaRegMoon className="icon moon-icon" />
        <FaRegSun className="icon sun-icon" />
      </span>
    </label>
  );
}

export default ThemeButton;
