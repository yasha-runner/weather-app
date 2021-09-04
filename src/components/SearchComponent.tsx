import React, { FC, FormEvent, useState} from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '../store/actions/alertAction';
import { getWeatherNow, setLoading } from '../store/actions/weatherNowActions';
import { getWeatherDay } from '../store/actions/weatherDayAction';

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
        dispatch(getWeatherNow(city));
        dispatch(getWeatherDay(city));
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
                            autoComplete="on"
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