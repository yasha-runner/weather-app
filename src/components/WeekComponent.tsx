import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setAlert } from "../store/actions/alertAction";
import { getWeatherNow, setError  } from "../store/actions/weatherNowActions";
import { getWeatherWeek } from "../store/actions/weatherWeekAction";
import { ICurrentCity } from "../store/types";
import AlertComponent from "./AlertComponent";
import WeatherNowComponent from "./WeatherNowComponent";
import WeatherWeekComponent from "./WeatherWeekComponent";

const WeekComponent = (props) => {
    const dispatch = useDispatch();
    const weatherNowData = useSelector((state: RootState) => state.weatherNow.data);
    const loadingNow = useSelector((state: RootState) => state.weatherNow.loading);
    const errorNow = useSelector((state: RootState) => state.weatherNow.error);
    const weatherWeekData = useSelector((state: RootState) => state.weatherWeek.data);
    const loadingWeek = useSelector((state: RootState) => state.weatherWeek.loading);
    const errorWeek = useSelector((state: RootState) => state.weatherWeek.error);
    const alertMessage = useSelector((state: RootState) => state.alert.message);
    const currentCity: ICurrentCity = useSelector((state: RootState) => state.city.currentCity);

    const city = props.match.params.city;

    useEffect(() => {
        dispatch(getWeatherNow(city));
        dispatch(getWeatherWeek(currentCity))
    }, []);
    
    return (
        <div>
            {loadingNow ? <h2 className="is-size-3 py-2">Loading...</h2> : weatherNowData && <WeatherNowComponent data={weatherNowData} />}
            <hr className="m-0"/>
            {loadingWeek ? <h2 className="is-size-3 py-2">Loading...</h2> : weatherWeekData && <WeatherWeekComponent data={weatherWeekData.daily} />}
      
            {alertMessage && <AlertComponent message={alertMessage} onClose={() => dispatch(setAlert(''))} />}
            {errorNow && <AlertComponent message={errorNow} onClose={() => dispatch(setError())} />}
            {errorWeek && <AlertComponent message={errorWeek} onClose={() => dispatch(setError())} />}
        </div>
    );
}

export default WeekComponent;