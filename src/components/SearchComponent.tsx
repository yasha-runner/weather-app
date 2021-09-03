import React, { FC, FormEvent, useState} from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '../store/actions/alertAction';
import { getWeather, setLoading } from '../store/actions/weatherActions';
import { setCurrentCity } from '../store/actions/cityAction';

const SearchComponent: FC = () => {
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
        dispatch(setCurrentCity(city));
        dispatch(getWeather(city));
        setCityState('');
    };

    return (
        <div>
            <form onSubmit={submitHandler} >
                <div className="field is-grouped" style={{maxWidth: 300}}>
                    <p className="control is-expanded">
                        <input
                            className="input"
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={changeHandler}
                        />
                    </p>
                    <p className="control">
                        <button className="button is-primary is-fullwidth">Search</button>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default SearchComponent;