import React, { FC, FormEvent, useState} from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '../store/actions/alertAction';
import { getWeather, setLoading } from '../store/actions/weatherActions';
import { setCity } from '../store/actions/cityAction';
import SaveCityComponent from './SaveCityComponent';

interface SearchProps {
    title: string;
}

const SearchComponent: FC<SearchProps> = ({title}) => {
    const dispatch = useDispatch();
    const [city, setCityState] = useState('');

    const changeHandler = (e: FormEvent<HTMLInputElement>) => {
        setCityState(e.currentTarget.value);
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(city.trim() === '') {
            return dispatch(setAlert('City is required!'));
        }

        dispatch(setLoading());
        dispatch(setCity(city));
        dispatch(getWeather(city));
        setCityState('');
    };

    return (
        <div className="hero is-light has-text-centered">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">{title}</h1>
                    <form className="py-5" onSubmit={submitHandler}>
                        <input
                            type="text"
                            className="input has-text-centered mb-2"
                            placeholder="City"
                            style={{maxWidth: 300}}
                            value={city}
                            onChange={changeHandler}
                        />
                        <button
                            className="button is-primary is-fullwidth"
                            style={{maxWidth: 300, margin: '0 auto'}}
                        >Search</button>
                    </form>
                    <SaveCityComponent />
                </div>
            </div>
        </div>
    );
}

export default SearchComponent;