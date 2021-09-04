import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentCity } from "../store/actions/cityAction";
import { IWeatherDaily } from "../store/types";

interface IWeatherProps {
    data: IWeatherDaily[];
}

const WeatherWeekComponent: FC<IWeatherProps> = ({ data }) => {
    const startDate = new Date(data[0].dt * 1000);
    const endDate = new Date(data[data.length - 2].dt * 1000);

    const DayList = () => {
        const items = data.map((day: IWeatherDaily, index) => {
            if (index !== data.length-1) {
                const weatherDate = new Date(day.dt * 1000);
                return <div key={day.dt} className="weather-day tile is-parent">
                    <article className="tile is-child box" >
                        <p className="heading has-text-white">{weatherDate.toDateString()}</p>
                        <hr />
                        <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt={`${day.weather[0].icon}`} />
                        <p className="heading has-text-white"><strong className="has-text-white">{day.weather[0].description}</strong></p>
                        <hr />
                        <p className="heading has-text-white">Day: {(day.temp.day - 273.15).toFixed(1)}<sup>o</sup>C</p>
                        <p className="heading has-text-white">Night {(day.temp.night - 273.15).toFixed(1)}<sup>o</sup>C</p>
                        <p className="heading has-text-white">Humidity: {day.humidity}</p>
                        <p className="heading has-text-white">Pressure: {day.pressure}</p>
                        <p className="heading has-text-white">Wind: {day.wind_speed} m/s</p>
                    </article>
                </div>
            }
        });

        return (
            <>
                {items}
            </>
        );
    }

    return (
        <section className="section">
            <div className="container">
                <h1 className="title m-0">Week</h1>
                <h2 className="is-size-4 mb-2">{startDate.toDateString()} - {endDate.toDateString()}</h2>
                <div className="tile is-ancestor has-text-centered">
                    <DayList />
                </div>
            </div>
        </section>
    );
}

export default WeatherWeekComponent;