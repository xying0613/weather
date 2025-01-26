import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WeatherApp from "../src/components/WeatherApp";
import axios from "axios";
import useThemeStore from "../src/store/themeStore";

jest.mock("axios");

// Mock the theme store
jest.mock("../src/store/themeStore", () => ({
  __esModule: true,
  default: () => ({ theme: "light" }), // Mock theme store as light mode
}));

describe("WeatherApp Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders WeatherApp component", () => {
    render(<WeatherApp />);
    expect(screen.getByText("Search History")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter city name")).toBeInTheDocument();
  });

  it("handles user input correctly", () => {
    render(<WeatherApp />);
    const inputBox = screen.getByPlaceholderText("Enter city name");
    fireEvent.change(inputBox, { target: { value: "London" } });
    expect(inputBox.value).toBe("London");
  });

  it("fetches and displays weather data", async () => {
    const mockWeatherData = {
      data: {
        name: "London",
        sys: { country: "GB" },
        main: { temp: 20, temp_max: 25, temp_min: 15, humidity: 50 },
        weather: [{ main: "Sunny" }],
      },
    };

    axios.get.mockResolvedValue(mockWeatherData);

    render(<WeatherApp />);
    fireEvent.change(screen.getByPlaceholderText("Enter city name"), { target: { value: "London" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText("Today's Weather")).toBeInTheDocument();
      expect(screen.getByText("20°")).toBeInTheDocument();
      expect(screen.getByText("London, GB")).toBeInTheDocument();
      expect(screen.getByText("Humidity: 50%")).toBeInTheDocument();
    });
  });

  it("displays correct weather icon based on weather condition", async () => {
    const mockWeatherData = {
      data: {
        name: "Los Angeles",
        sys: { country: "US" },
        main: { temp: 30, temp_max: 35, temp_min: 25, humidity: 40 },
        weather: [{ main: "Cloudy" }],
      },
    };

    axios.get.mockResolvedValue(mockWeatherData);

    render(<WeatherApp />);
    fireEvent.change(screen.getByPlaceholderText("Enter city name"), { target: { value: "Los Angeles" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByAltText("weather icon")).toHaveAttribute("src", "/cloud.png");
    });
  });

  it("stores search history in local storage", async () => {
    const mockWeatherData = {
      data: {
        name: "New York",
        sys: { country: "US" },
        main: { temp: 22, temp_max: 27, temp_min: 18, humidity: 55 },
        weather: [{ main: "Clear" }],
      },
    };

    axios.get.mockResolvedValue(mockWeatherData);

    render(<WeatherApp />);
    fireEvent.change(screen.getByPlaceholderText("Enter city name"), { target: { value: "New York" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(localStorage.getItem("weatherHistory")).toContain("New York");
    });
  });

  it("displays error message when city is not found", async () => {
    axios.get.mockRejectedValue(new Error("Country not found"));

    render(<WeatherApp />);
    fireEvent.change(screen.getByPlaceholderText("Enter city name"), { target: { value: "InvalidCity" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText("Country not found. Please try again.")).toBeInTheDocument();
    });
  });
});
