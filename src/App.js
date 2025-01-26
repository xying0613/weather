import { useEffect } from "react";
import useThemeStore from "./store/themeStore";
import WeatherApp from "./components/WeatherApp";

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className={`${theme === "dark" ? "bg-dark-theme" : "bg-light-theme"}`}>
      <WeatherApp />
    </div>
  );
}

export default App;
