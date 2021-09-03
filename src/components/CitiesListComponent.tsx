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

    const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        console.log(e.currentTarget.textContent);
    };

    const CitiesList = () => {
        const citiesList: ICity[] = JSON.parse(cities) || [];
        const items = citiesList.map((city: ICity) =>
            <div key={city.key} className="city tile is-parent is-clickable" onClick={clickHandler}>
                <article className="tile is-child box">
                    <p className="title has-text-white">{city.name}</p>
                </article>
            </div>

        );

        return (
          <>
            {items}
          </>
        );
      }

    return (
        <div>
            <section className="section">
                <div className="container">
                    <h1 className="title has-text-centered" style={{marginBottom: 50}}>Saved cities</h1>
                    {
                        cities === '' ?
                            <h2 className="has-text-centered is-size-3">List of cities is empty</h2> :
                            <div className="tile is-ancestor has-text-centered is-flex-wrap-wrap">
                                <CitiesList />
                            </div>
                    }
                </div>
            </section>
        </div>
    );
}

export default CitiesListComponent;