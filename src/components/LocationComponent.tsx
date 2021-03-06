import React, { FC } from 'react';
import { useEffect } from 'react';
import Geocode from "react-geocode";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setAlert } from '../store/actions/alertAction';
import { getWeatherNow, setLoading } from '../store/actions/weatherNowActions';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.enableDebug();

const LocationComponent: FC = () => {
    const dispatch = useDispatch();
    const city: string = useSelector((state: RootState) => state.city.currentCity.name);

    useEffect(() => {
        if (city === '') {
            navigator.geolocation.getCurrentPosition(position => {
                Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                    (response) => {
                        const addressArray: any = response.results[0].address_components;
                        const city = getCity(addressArray);
    
                        if (city === undefined)
                            dispatch(setAlert('City ​​not found!'));
                        else {
                            dispatch(setLoading());
                            dispatch(getWeatherNow(city));
                        }
                    },
                    (error) => {
                        dispatch(setAlert('City ​​not found!'));
                        console.error(error);
                    }
                );
            });
        }
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

export default LocationComponent;