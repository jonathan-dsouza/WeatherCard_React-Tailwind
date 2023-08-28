import React from "react";
import { WeatherIcon } from "./WeatherIcon";

export const BasicInfo = ({ data }) => {
  return (
    <div className="flex  justify-between">
      <div className="mr-4 my-8">
        <div className="location">
          <p className="mb-2 text-xl sm:text-2xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.name}
          </p>
        </div>

        <div className="temp">
          <h1 className="mb-2 text-2xl sm:text-4xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.main.temp.toFixed()}°C
          </h1>
        </div>

        <div className="description">
          <p className="text-gray-700 dark:text-gray-400 font-semibold text-base sm:text-xl md:text-xl">
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
  );
};
