import React from "react";
import image01d from "../Assets/01d.svg";
import image01n from "../Assets/01n.svg";
import image02d from "../Assets/02d.svg";
import image02n from "../Assets/02n.svg";
import image03d from "../Assets/03d.svg";
import image03n from "../Assets/03n.svg";
import image04d from "../Assets/04d.svg";
import image04n from "../Assets/04n.svg";
import image09d from "../Assets/09d.svg";
import image09n from "../Assets/09n.svg";
import image10d from "../Assets/10d.svg";
import image10n from "../Assets/10n.svg";
import image11d from "../Assets/11d.svg";
import image11n from "../Assets/11n.svg";
import image13d from "../Assets/13d.svg";
import image13n from "../Assets/13n.svg";
import image50d from "../Assets/50d.svg";
import image50n from "../Assets/50n.svg";

const imageMap = {
  "01d": image01d,
  "01n": image01n,
  "02d": image02d,
  "02n": image02n,
  "03d": image03d,
  "03n": image03n,
  "04d": image04d,
  "04n": image04n,
  "09d": image09d,
  "09n": image09n,
  "10d": image10d,
  "10n": image10n,
  "11d": image11d,
  "11n": image11n,
  "13d": image13d,
  "13n": image13n,
  "50d": image50d,
  "50n": image50n,
};

export const WeatherIcon = ({ weatherIcon, altText }) => {
  const imageSrc = imageMap[weatherIcon] || null;

  if (!imageSrc) {
    return null;
  }

  return <img src={imageSrc} alt={altText} className="w-28 h-auto" />;
};
