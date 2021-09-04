import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import weatherNowReducer from './reducers/weatherNowReducer';
import weatherDayReducer from './reducers/weatherDayReducer';
import weatherWeekReducer from './reducers/weatherWeekReducer';
import alertReducer from './reducers/alertReducer';
import cityReducer from './reducers/cityReducer';


const rootReducer = combineReducers({
    weatherNow: weatherNowReducer,
    weatherDay: weatherDayReducer,
    weatherWeek: weatherWeekReducer,
    alert: alertReducer,
    city: cityReducer
});

const store = createStore (
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;