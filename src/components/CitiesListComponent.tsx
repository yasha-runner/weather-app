import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCities } from '../store/actions/cityAction';
import { ICity } from '../store/types';


const CitiesListComponent: FC = () => {
    const dispatch = useDispatch();
    const [cities, setCitiesState] = useState(useSelector((state: RootState) => state.city.cities));

    useEffect(() => {
        const storage: string | null = localStorage.getItem('cities');

        if (storage !== null && cities !== storage) {
            setCitiesState(storage);
            dispatch(setCities(storage));
        }
    });

    const clickHandler = (e: MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        console.log(e.currentTarget.textContent);
    };

    const CitiesList = () => {
        const citiesList: ICity[] = JSON.parse(cities) || [];
        const listItems = citiesList.map((city: ICity) =>
            <li key={city.key} onClick={clickHandler}>
                {city.name}
            </li>
        );

        return (
          <ul>
            {listItems}
          </ul>
        );
      }

    return (
        <div>
            {
                cities === '' ?
                    <h2 className="is-size-3 py-2">List of cities is empty</h2> :
                    <CitiesList />
            }
        </div>
    );
}

export default CitiesListComponent;