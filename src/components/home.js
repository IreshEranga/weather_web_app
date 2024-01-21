
import React, { useState } from 'react';
import img1 from '../photoes/img1.jpg';
import search_icon from '../photoes/search.png';
import clear from '../photoes/clear.png';
import cloud from '../photoes/cloud.png';
import drizzle from '../photoes/drizzle.png';
import humidity from '../photoes/humidity.png';
import rain from '../photoes/rain.png';
import snow from '../photoes/snow.png';
import wind from '../photoes/wind.png';

import './home.css';

const useWeatherIcon = () => {
  const [wicon, setWicon] = useState(cloud);

  const updateWeatherIcon = (weatherIconCode) => {
    switch (weatherIconCode) {
      case "01d":
      case "01n":
        setWicon(clear);
        break;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
        setWicon(cloud);
        break;
      case "04d":
      case "04n":
      case "09d":
      case "09n":
        setWicon(drizzle);
        break;
      case "10d":
      case "10n":
        setWicon(rain);
        break;
      case "13d":
      case "13n":
        setWicon(snow);
        break;
      default:
        setWicon(clear);
    }
  };

  return [wicon, updateWeatherIcon];
};

export const Home = () => {
  let api_key = "b56633b2259125ee93c65d43cef5ccc3";

  // Weather Icon State and Update Function
  const [wicon, updateWeatherIcon] = useWeatherIcon();

  // search function
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");

    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let responseData = await response.json();

      if (response.ok) {
        const humidityElement = document.getElementsByClassName("humidity-percent");
        const windElement = document.getElementsByClassName("wind-rate");
        const temperatureElement = document.getElementsByClassName("weather-temp");
        const locationElement = document.getElementsByClassName("weather-location");

        humidityElement[0].innerHTML = responseData.main.humidity + " %";
        windElement[0].innerHTML = Math.floor(responseData.wind.speed) + " km/h";
        temperatureElement[0].innerHTML = Math.floor(responseData.main.temp) + " °C";
        locationElement[0].innerHTML = responseData.name;

        updateWeatherIcon(responseData.weather[0].icon);
      } else {
        console.error("Error fetching weather data:", responseData.message);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className='body_container'>
      <div className='image_wrapper'>
        <img src={img1} alt='background ' className='background_image' />
        <div className='black_box'>
          <div className='container'>
            
            <div className='top-bar'>
              <input type="text" className='cityInput' placeholder='search'></input>

              <div className='search-icon' onClick={() => { search() }}>
                <img src={search_icon} alt='search icon' />
              </div>
            </div>

            <div className='weather-image'>
              <img src={wicon} alt='cloud' />
            </div>
            <div className='weather-temp'>24 °C</div>
            <div className='weather-location'>London</div>
            <div className='data-container'>
              <div className='element'>
                <img src={humidity} alt='' className='icon' />

                <div className='data'>
                  <div className='humidity-percent'>64%</div>
                  <div className='text'>Humidity</div>
                </div>
              </div>
              <div className='element'>
                <img src={wind} alt='' className='icon' />

                <div className='data'>
                  <div className='wind-rate'>18 km/h</div>
                  <div className='text'>Wind Speed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
