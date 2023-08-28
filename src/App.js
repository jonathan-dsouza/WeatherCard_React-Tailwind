import React, { useEffect, useState } from "react";
import axios from "axios";

//Image imports

//Component imports
import { Header } from "./Components/Header.js";
import { SearchBar } from "./Components/SearchBar.js";
import { WeatherIcon } from "./Components/WeatherIcon.js";
import { Footer } from "./Components/Footer.js";
import { Error } from "./Components/Error";
import { BasicInfo } from "./Components/BasicInfo";
import { InfoCards } from "./Components/InfoCards.js";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [theme, setTheme] = useState(null);
  const [error, setError] = useState(false);

  const openWeather_url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

  const visualCrossing_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/2023-08-29/?key=${process.env.REACT_APP_VISUALCROSSING_API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(openWeather_url)
        .then((response) => {
          setData(response.data);
          console.log(response.data.currentConditions);
          setError(false);
          setLocation("");
        })
        .catch((error) => {
          console.log(error);
          setData({});
          setError(true);
          setLocation("");
        });
    }
  };

  const handleSearch = (event) => {
    setLocation(event.target.value);
  };

  //For Dark theme switcher
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="App">
      <Header handleThemeSwitch={handleThemeSwitch} theme={theme}></Header>

      <div className="flex items-center justify-center h-screen  dark:bg-[#1a1a1b]">
        {/* Main Container */}
        <div className="card-container p-6 mb-20 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-black dark:border-none ">
          {/* Search Bar */}
          <SearchBar
            location={location}
            handleSearch={handleSearch}
            searchLocation={searchLocation}
          />

          {error && <Error></Error>}

          {/* Top Left */}
          {data.main && <BasicInfo data={data} />}

          {/* Bottom Div with 3 Columns */}
          {data.main && data.name !== undefined && <InfoCards data={data} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
