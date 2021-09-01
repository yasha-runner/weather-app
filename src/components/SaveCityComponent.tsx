import React, { FC, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ICity {
    name: string,
    key: string
}

const SaveCityComponent: FC = () => {
    const cityName: string = useSelector((state: RootState) => state.city.name);

    const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const storage = localStorage.getItem('cities');

        let cities: ICity[] = [];
        if (storage !== null)
            cities = JSON.parse(storage)

        let city = cities.find(city => city.name === cityName)

        if (city === undefined) {
            city = {
                key: getGuid(),
                name: cityName
            }

            cities.push(city);
        }
    
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
        <button
            className="button is-primary is-fullwidth"
            style={{maxWidth: 300, margin: '0 auto'}}
            onClick={clickHandler}
        >Save city</button>
    );
}

export default SaveCityComponent;