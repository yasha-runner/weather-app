import React, {FC} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';

import { RootState } from '../store';
import SearchComponent from './SearchComponent';
import AlertComponent from './AlertComponent';
import WeatherComponent from './WeatherComponent';
import LocationComponent from './LocationComponent';
import { setAlert } from '../store/actions/alertAction';
import { setError } from '../store/actions/weatherActions';

const DefaultComponent: FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);
  const alertMessage = useSelector((state: RootState) => state.alert.message);

  return (
    <div className="has-text-centered">
      <LocationComponent />
      <SearchComponent title="Enter city name and press search button" />
      {loading ? <h2 className="is-size-3 py-2">Loading...</h2> : weatherData && <WeatherComponent data={weatherData} />}
      
      {alertMessage && <AlertComponent message={alertMessage} onClose={() => dispatch(setAlert(''))} />}
      {error && <AlertComponent message={error} onClose={() => dispatch(setError())} />}
    </div>
  );
}

export default DefaultComponent;