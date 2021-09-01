import React, { FC } from 'react';
import { useEffect } from 'react';
import Geocode from "react-geocode";
import { useDispatch } from 'react-redux';
import { GOOGLE_MAPS_API_KEY } from '../constant';
import { setAlert } from '../store/actions/alertAction';
import { setCity } from '../store/actions/cityAction';
import { getWeather, setLoading } from '../store/actions/weatherActions';

Geocode.setApiKey(GOOGLE_MAPS_API_KEY);
Geocode.enableDebug();

const Location: FC = () => {
    const dispatch = useDispatch();  

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                (response) => {
                    const addressArray: any = response.results[0].address_components;
                    const city = getCity(addressArray);

                    if (city === undefined)
                        dispatch(setAlert('City ​​not found!'));
                    else {
                        dispatch(setCity(city));
                        dispatch(setLoading());
                        dispatch(getWeather(city));
                    }
                },
                (error) => {
                    dispatch(setAlert('City ​​not found!'));
                    console.error(error);
                }
            );
        });
    }, []);

    const getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'locality' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };

    return (
        <></>
    );
}

export default Location;