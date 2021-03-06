import React, { FC } from "react";
import { IWeatherDay } from "../store/types";

interface IWeatherProps {
    data: IWeatherDay[];
    date: Date
}

const WeatherDayComponent: FC<IWeatherProps> = ({ data, date }) => {  
    const WeatherDayTable = () => {
        let day = data.filter((weather: IWeatherDay) => {
            const weatherDate = new Date(weather.dt * 1000);
            return date.toDateString() == weatherDate.toDateString()
        });
        const items: JSX.Element[] = day.map((weather) => {
            const weatherDate = new Date(weather.dt * 1000);
            const celsius = (weather.main.temp - 273.15).toFixed(1);
            return <tr key={weather.dt}>
                <td>{weatherDate.toLocaleTimeString()}</td>
                <td>{celsius}<sup>o</sup>C, {weather.weather[0].main}, Wind - {weather.wind.speed} m/s</td>
            </tr>
        })

        if(items.length === 0) 
            return (
                <h2 className="is-size-4">Data not available</h2>
            )
        else 
            return (
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th><abbr title="Time">Time</abbr></th>
                            <th><abbr title="Weather">Weather</abbr></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            );
    }

    return (
        <WeatherDayTable />
    );
}

export default WeatherDayComponent;