import React from "react";
import feelsLike from "../Assets/thermometer-celsius.svg";
import humidityIcon from "../Assets/raindrops.svg";
import windSock from "../Assets/windsock.svg";

export const InfoCards = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <div className="bg-gray-100 p-2 rounded-[8px] text-center dark:bg-[#1a1a1b]">
        <img
          src={feelsLike}
          alt="feelsLikeIcon"
          className="w-12 sm:w-16 md:w-20 h-auto mx-auto mb-2"
        />

        <p className="font-semibold text-lg sm:text-xl md:text-xl dark:text-white">
          {data.main.feels_like.toFixed()}°C
        </p>

        <h2 className="font-normal text-base sm:text-lg md:text-lg dark:text-white">
          Feels Like
        </h2>
      </div>

      <div className="bg-gray-100 p-2 rounded-[8px] text-center dark:bg-[#1a1a1b]">
        <img
          src={humidityIcon}
          alt="humidityIcon"
          className="w-12 sm:w-16 md:w-20 h-auto mx-auto mb-2"
        />

        <p className="font-semibold text-lg sm:text-xl md:text-xl dark:text-white">
          {data.main.humidity.toFixed()}%
        </p>

        <h2 className="font-normal text-md sm:text-md md:text-lg dark:text-white">
          Humidity
        </h2>
      </div>

      <div className="bg-gray-100 p-2 rounded-[8px] text-center dark:bg-[#1a1a1b]">
        <img
          src={windSock}
          alt="windSockIcon"
          className="w-12 sm:w-16 md:w-20 h-auto mx-auto mb-2"
        />

        <p className="font-semibold text-lg sm:text-xl md:text-xl dark:text-white">
          {data.wind.speed.toFixed()} km/h
        </p>

        <h2 className="font-normal text-base sm:text-lg md:text-lg dark:text-white">
          Winds
        </h2>
      </div>
    </div>
  );
};
