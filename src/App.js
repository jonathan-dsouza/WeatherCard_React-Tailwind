import React, { useEffect, useState } from "react";
import axios from "axios";
import SunCalc from "suncalc";

// Image imports
import feelsLike from "./Assets/thermometer-celsius.svg";
import humidityIcon from "./Assets/raindrops.svg";
import windSock from "./Assets/windsock.svg";
import sunrise from "./Assets/sunrise.svg";
import sunset from "./Assets/sunset.svg";

// Component imports
import { Header } from "./Components/Header.js";
import { SearchBar } from "./Components/SearchBar.js";
import { Footer } from "./Components/Footer.js";
import { Error } from "./Components/Error";
import { BasicInfo } from "./Components/BasicInfo";
import { TinyCard } from "./Components/TinyCard";
import getMoonPhaseImage from "./Components/MoonPhaseImg";
import { ExpandButton } from "./Components/ExpandButton";

function App() {
  const [data, setData] = useState({});
  const [currentConditions, setCurrentConditions] = useState({});
  const [location, setLocation] = useState("");
  const [theme, setTheme] = useState(null);
  const [error, setError] = useState(false);
  const [expand, setExpand] = useState(false);

  const openWeather_url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  const fetchData = () => {
    axios.get(openWeather_url).then(handleWeatherData).catch(handleFetchError);
  };

  const handleWeatherData = (response) => {
    setData(response.data);
    console.log(response.data);
    setError(false);
    setLocation("");

    const latitude = response.data.coord.lat;
    const longitude = response.data.coord.lon;

    const times = SunCalc.getTimes(new Date(), latitude, longitude);

    const formattedCurrentDate = times.sunrise.toISOString().split("T")[0]; // Use sunrise time as an approximation

    const visualCrossing_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${formattedCurrentDate}/?key=${process.env.REACT_APP_VISUALCROSSING_API_KEY}`;

    axios
      .get(visualCrossing_url)
      .then(handleCurrentConditions)
      .catch(handleFetchError);
  };

  const handleCurrentConditions = (response) => {
    setCurrentConditions(response.data.currentConditions);
    console.log(response.data.currentConditions);
  };

  const handleFetchError = (error) => {
    console.log(error);
    setData({});
    setError(true);
    setLocation("");
  };

  const handleSearch = (event) => {
    setLocation(event.target.value);
  };

  const formatTimeToAMPM = (time) => {
    try {
      if (!time) {
        return "";
      }

      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours);
      const minute = parseInt(minutes);

      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

      return `${formattedHour}:${
        minute < 10 ? "0" + minute : minute
      } ${period}`;
    } catch (error) {
      console.error("Error in formatTimeToAMPM:", error);
      return "";
    }
  };

  const { image: moonPhaseImage, description: moonPhaseDescription } = (() => {
    try {
      return getMoonPhaseImage(currentConditions.moonphase);
    } catch (error) {
      console.error("Error fetching moon phase image:", error);
      return { image: null, description: "" };
    }
  })();

  // For Theme switcher
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
      <Header handleThemeSwitch={handleThemeSwitch} theme={theme} />

      <div
        className={`flex items-center justify-center h-screen overflow-y-auto dark:bg-[#1a1a1b] ${
          expand ? "pt-36 pb-20 md:pt-0 md:pb-0" : ""
        }`}
      >
        {/* Main Container */}
        <div className="flex flex-col gap-0 sm:gap-3 md:flex-row mt-20">
          <div className="card-container p-6 mb-6 md:mb-20 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-black dark:border-none">
            {/* Search Bar */}
            <SearchBar
              location={location}
              handleSearch={handleSearch}
              searchLocation={searchLocation}
            />

            {error && <Error />}

            {/* Top Left */}
            {data.main && <BasicInfo data={data} />}

            {/* Bottom Div with 3 Columns */}
            {data.main && data.name !== undefined && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                <TinyCard
                  iconSrc={feelsLike}
                  altText="feelsLikeIcon"
                  value={data.main.feels_like.toFixed()}
                  units="°C"
                  description="Feels Like"
                />

                <TinyCard
                  iconSrc={humidityIcon}
                  altText="humidityIcon"
                  value={data.main.humidity.toFixed()}
                  units="%"
                  description="Humidity"
                />

                <TinyCard
                  iconSrc={windSock}
                  altText="windSockIcon"
                  value={data.wind.speed.toFixed()}
                  units="km/h"
                  description="Winds"
                />
              </div>
            )}
          </div>
          {data.main && currentConditions !== undefined && error === false && (
            <ExpandButton expand={expand} setExpand={setExpand} theme={theme} />
          )}

          {currentConditions !== undefined && expand && error === false && (
            <div className="card-container p-6 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-black dark:border-none mb-30 md:mb-20">
              {/* New Card Content */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4">
                <TinyCard
                  iconSrc={sunrise}
                  altText="sunriseIcon"
                  value={formatTimeToAMPM(currentConditions.sunrise)}
                  units=""
                  description="Sunrise"
                />

                <TinyCard
                  iconSrc={sunset}
                  altText="sunsetIcon"
                  value={formatTimeToAMPM(currentConditions.sunset)}
                  units=""
                  description="Sunset"
                />

                <TinyCard
                  iconSrc={moonPhaseImage}
                  altText="moonPhaseIcon"
                  value={moonPhaseDescription}
                  units=""
                  description="Moon Phase"
                />
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
