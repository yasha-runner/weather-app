import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setAlert } from "../store/actions/alertAction";
import { getWeatherDay, setError } from "../store/actions/weatherDayAction";
import { getWeatherNow } from "../store/actions/weatherNowActions";
import AlertComponent from "./AlertComponent";
import MapComponent from "./MapComponent";
import WeatherDayComponent from "./WeatherDayComponent";
import WeatherNowComponent from "./WeatherNowComponent";

const DayComponent = (props) => {
    const dispatch = useDispatch();
    const weatherNowData = useSelector((state: RootState) => state.weatherNow.data);
    const loadingNow = useSelector((state: RootState) => state.weatherNow.loading);
    const errorNow = useSelector((state: RootState) => state.weatherNow.error);
    const weatherDayData = useSelector((state: RootState) => state.weatherDay.data);
    const loadingDay = useSelector((state: RootState) => state.weatherDay.loading);
    const errorDay = useSelector((state: RootState) => state.weatherDay.error);
    const alertMessage = useSelector((state: RootState) => state.alert.message);

    const city = props.match.params.city;
    const day = props.match.params.day;

    let date = new Date;

    if (day === 'Tomorrow') 
        date.setDate(date.getDate() + 1);

    useEffect(() => {
        dispatch(getWeatherNow(city));
        dispatch(getWeatherDay(city));
    }, []);
    
    return (
        <div>
            {loadingNow ? <h2 className="is-size-3 py-2">Loading...</h2> : weatherNowData && <WeatherNowComponent data={weatherNowData} />}
            <hr className="m-0"/>
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-4">
                            <h1 className="title m-0">{day}</h1>
                            <h2 className="is-size-4">{date.toDateString()}</h2>
                            {loadingDay ? <h2 className="is-size-3 py-2">Loading...</h2> : weatherDayData && <WeatherDayComponent data={weatherDayData.list} date={date} />}
                        </div>
                        <div className="column is-8 is-relative" style={{minHeight: '350px'}}>
                            {loadingNow ? <h2 className="is-size-3 py-2">Loading...</h2> : weatherNowData && <MapComponent data={weatherNowData} />}
                        </div>
                    </div>
                </div>
            </section>
      
            {alertMessage && <AlertComponent message={alertMessage} onClose={() => dispatch(setAlert(''))} />}
            {errorNow && <AlertComponent message={errorNow} onClose={() => dispatch(setError())} />}
            {errorDay && <AlertComponent message={errorDay} onClose={() => dispatch(setError())} />}
        </div>
    );
}

export default DayComponent;