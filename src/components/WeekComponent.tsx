import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setAlert } from "../store/actions/alertAction";
import { getWeatherNow, setError  } from "../store/actions/weatherNowActions";
import AlertComponent from "./AlertComponent";
import WeatherNowComponent from "./WeatherNowComponent";

const WeekComponent = (props) => {
    const dispatch = useDispatch();
    const weatherNowData = useSelector((state: RootState) => state.weatherNow.data);
    const loadingNow = useSelector((state: RootState) => state.weatherNow.loading);
    const errorNow = useSelector((state: RootState) => state.weatherNow.error);
    const alertMessage = useSelector((state: RootState) => state.alert.message);

    const city = props.match.params.city;

    useEffect(() => {
        dispatch(getWeatherNow(city));
    }, []);
    
    return (
        <div>
            {loadingNow ? <h2 className="is-size-3 py-2">Loading...</h2> : weatherNowData && <WeatherNowComponent data={weatherNowData} />}
            <hr className="m-0"/>
            <section className="section">
                <div className="container">
                    WEEK
                </div>
            </section>
      
            {alertMessage && <AlertComponent message={alertMessage} onClose={() => dispatch(setAlert(''))} />}
            {errorNow && <AlertComponent message={errorNow} onClose={() => dispatch(setError())} />}
        </div>
    );
}

export default WeekComponent;