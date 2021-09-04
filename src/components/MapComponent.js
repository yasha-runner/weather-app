import React, { useState} from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import { GOOGLE_MAPS_API_KEY } from "../constant";

const MapComponent = (props) => {
    const [activeMarker, setActiveMarker] = useState({});
    const [visibleInfoWindow, setVisibleInfoWindow] = useState(false);
    const weather = props.data;

    const onMarkerClick = (props, marker, e) => {
        setActiveMarker(marker);
        setVisibleInfoWindow(true);
    };

    const celsius = (weather.main.temp - 273.15).toFixed(1);

    return (
        <Map
            google={props.google}
            initialCenter={{
                lat: weather.coord.lat,
                lng: weather.coord.lon
            }}
            zoom={12}
        >
            <Marker onClick={onMarkerClick} name={'Current city'}/>
            <InfoWindow 
                marker={activeMarker}
                visible={visibleInfoWindow}>
                <div>
                    <p className="heading">{weather.weather[0].description}</p>
                    <p className="heading">Temp: {celsius}<sup>o</sup>C</p>
                    <p className="heading">Humidity: {weather.main.humidity}</p>
                    <p className="heading">Pressure: {weather.main.pressure}</p>
                    <p className="heading">Wind: {weather.wind.speed} m/s</p>
                </div>
            </InfoWindow>
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: (GOOGLE_MAPS_API_KEY)
})(MapComponent)