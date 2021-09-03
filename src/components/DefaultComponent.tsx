import React, {FC} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../style/App.css';
import { RootState } from '../store';
import AlertComponent from './AlertComponent';
import WeatherComponent from './WeatherComponent';
import LocationComponent from './LocationComponent';
import { setAlert } from '../store/actions/alertAction';
import { setError } from '../store/actions/weatherActions';
import CitiesListComponent from './CitiesListComponent';

const DefaultComponent: FC = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);
  const alertMessage = useSelector((state: RootState) => state.alert.message);

  return (
    <div className="has-text-centered">
      <LocationComponent />
      {loading ? <h2 className="is-size-3 py-2">Loading...</h2> : weatherData && <WeatherComponent data={weatherData} />}
      <hr className="m-0"/>
      <CitiesListComponent />
      
      {alertMessage && <AlertComponent message={alertMessage} onClose={() => dispatch(setAlert(''))} />}
      {error && <AlertComponent message={error} onClose={() => dispatch(setError())} />}
    </div>
  );
}

export default DefaultComponent;