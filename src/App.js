import React, { useEffect, useState } from "react";
import axios from "axios";

//Image imports
import feelsLike from "./Assets/thermometer-celsius.svg";
import humidityIcon from "./Assets/raindrops.svg";
import windSock from "./Assets/windsock.svg";

//Component imports
import { Header } from "./Components/Header.js";
import { SearchBar } from "./Components/SearchBar.js";
import { WeatherIcon } from "./Components/WeatherIcon.js";
import { Footer } from "./Components/Footer.js";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [theme, setTheme] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

  console.log(url);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          setLocation("");
        })
        .catch((error) => console.log(error));
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
      <Header handleThemeSwitch={handleThemeSwitch}></Header>

      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-400">
        {/* Main Container */}
        <div className="flex-grow max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-2xl mb-20 dark:bg-gray-800 dark:border-gray-700">
          {/* Search Bar */}
          <div className="mb-4">
            <SearchBar
              location={location}
              handleSearch={handleSearch}
              searchLocation={searchLocation}
            />
          </div>
          {/* Top Left */}
          <div className="flex mb-20 justify-between">
            <div className="mr-4">
              <div className="location">
                <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {data.name}
                </p>
              </div>

              <div className="temp">
                {data.main ? (
                  <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {data.main.temp.toFixed()}°C
                  </h1>
                ) : null}
              </div>

              <div className="description">
                {data.weather ? (
                  <p className="text-gray-700 dark:text-gray-400 font-semibold text-xl">
                    {data.weather[0].main}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Top Right */}
            <div className="flex-shrink">
              {data.weather ? (
                <WeatherIcon
                  weatherIcon={data.weather[0].icon}
                  altText={"WeatherIcon"}
                />
              ) : null}
            </div>
          </div>

          {/* Bottom Div with 3 Columns */}
          {data.name !== undefined && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-100 p-2 rounded-md text-center">
                <img
                  src={feelsLike}
                  alt="feelsLikeIcon"
                  className="w-18 h-auto "
                />
                {data.main ? (
                  <p className="font-semibold text-xl">
                    {data.main.feels_like.toFixed()}°C
                  </p>
                ) : null}
                <h2 className="font-normal">Feels Like</h2>
              </div>

              <div className="bg-gray-100 p-2 rounded-md text-center">
                <img
                  src={humidityIcon}
                  alt="humidityIcon"
                  className="w-18 h-auto "
                />
                {data.main ? (
                  <p className="font-semibold text-xl">
                    {data.main.humidity.toFixed()}%
                  </p>
                ) : null}
                <h2 className="font-normal">Humidity</h2>
              </div>

              <div className="bg-gray-100 p-2 rounded-md text-center">
                <img
                  src={windSock}
                  alt="windSockIcon"
                  className="w-18 h-auto "
                />
                {data.main ? (
                  <p className="font-semibold text-xl">
                    {data.wind.speed.toFixed()} km/h
                  </p>
                ) : null}
                <h2 className="font-normal">Winds</h2>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
