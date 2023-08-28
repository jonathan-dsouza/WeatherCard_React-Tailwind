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
import { Error } from "./Components/Error";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [theme, setTheme] = useState(null);
  const [error, setError] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
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
        <div className="flex-grow max-w-sm p-6 bg-white border border-gray-200 rounded-[12px] shadow-xl mb-20 dark:bg-black dark:border-black">
          {/* Search Bar */}
          <SearchBar
            location={location}
            handleSearch={handleSearch}
            searchLocation={searchLocation}
          />

          {error && <Error></Error>}

          {/* Top Left */}
          {data.main && (
            <div className="flex  justify-between">
              <div className="mr-4 my-8">
                <div className="location">
                  <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {data.name}
                  </p>
                </div>

                <div className="temp">
                  <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {data.main.temp.toFixed()}°C
                  </h1>
                </div>

                <div className="description">
                  <p className="text-gray-700 dark:text-gray-400 font-semibold text-xl">
                    {data.weather[0].main}
                  </p>
                </div>
              </div>

              {/* Top Right */}
              <div className="flex-shrink">
                <WeatherIcon
                  weatherIcon={data.weather[0].icon}
                  altText={"WeatherIcon"}
                />
              </div>
            </div>
          )}

          {/* Bottom Div with 3 Columns */}
          {data.main && data.name !== undefined && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-100 p-2 rounded-[8px] text-center dark:bg-[#1a1a1b]">
                <img
                  src={feelsLike}
                  alt="feelsLikeIcon"
                  className="w-18 h-auto "
                />

                <p className="font-semibold text-xl dark:text-white">
                  {data.main.feels_like.toFixed()}°C
                </p>

                <h2 className="font-normal dark:text-white">Feels Like</h2>
              </div>

              <div className="bg-gray-100 p-2 rounded-[8px] text-center dark:bg-[#1a1a1b]">
                <img
                  src={humidityIcon}
                  alt="humidityIcon"
                  className="w-18 h-auto "
                />

                <p className="font-semibold text-xl dark:text-white">
                  {data.main.humidity.toFixed()}%
                </p>

                <h2 className="font-normal dark:text-white">Humidity</h2>
              </div>

              <div className="bg-gray-100 p-2 rounded-[8px] text-center dark:bg-[#1a1a1b]">
                <img
                  src={windSock}
                  alt="windSockIcon"
                  className="w-18 h-auto "
                />

                <p className="font-semibold text-xl dark:text-white">
                  {data.wind.speed.toFixed()} km/h
                </p>

                <h2 className="font-normal dark:text-white">Winds</h2>
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
