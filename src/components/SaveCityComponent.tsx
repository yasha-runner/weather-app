import React, { FC, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCities } from '../store/actions/cityAction';
import { ICity } from '../store/types';

const SaveCityComponent: FC = () => {
    const dispatch = useDispatch();
    const cityName: string = useSelector((state: RootState) => state.city.currentCity);
    const citiesStr: string = useSelector((state: RootState) => state.city.cities);

    const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let cities: ICity[] = [];
        if (citiesStr !== '') {
            cities = JSON.parse(citiesStr);
        }

        let city = cities.find(city => city.name === cityName)
        if (city === undefined) {
            city = {
                key: getGuid(),
                name: cityName
            }

            cities.push(city);
        }

        dispatch(setCities(JSON.stringify(cities)));
        localStorage.setItem('cities', JSON.stringify(cities));
    };

    const getGuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    return (
        <button className="button is-primary" onClick={clickHandler}>Save city</button>
    );
}

export default SaveCityComponent;