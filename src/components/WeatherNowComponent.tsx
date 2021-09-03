import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentCity } from "../store/actions/cityAction";
import { IWeatherData } from "../store/types";

interface WeatherProps {
    data: IWeatherData;
}

const WeatherNowComponent: FC<WeatherProps> = ({ data }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentCity(data.name));
    }, []);

    const celsius = (data.main.temp - 273.15).toFixed(1);
    
    return (
        <section className="section">
            <div className="container">
                <h1 className="title has-text-centered" style={{marginBottom: 50}}>{data.name} - {data.sys.country}</h1>
                <div className="level" style={{alignItems: 'flex-start'}}>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">{data.weather[0].description}</p>
                            <p className="title"><img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt={`${data.weather[0].icon}`} /></p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Temp</p>
                            <div className="title">
                                <p>{celsius}<sup>o</sup>C</p>
                            </div>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Humidity</p>
                            <p className="title">{data.main.humidity}</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Pressure</p>
                            <p className="title">{data.main.pressure}</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Wind</p>
                            <p className="title">{data.wind.speed} m/s</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WeatherNowComponent;