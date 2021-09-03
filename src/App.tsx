import React, {FC} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './style/App.css';

import DefaultComponent from './components/DefaultComponent';
import SearchComponent from './components/SearchComponent';
import SaveCityComponent from './components/SaveCityComponent';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import DayComponent from './components/DayComponent';
import WeekComponent from './components/WeekComponent';

const App: FC = () => {
  const city: string = useSelector((state: RootState) => state.city.currentCity);

  return (
    <div className="App">

      <Router>
        <div>
          <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                <img src="https://img.icons8.com/fluency/48/000000/snowy-sunny-day.png" width="28" height="28" alt="Weather" />
              </Link>

              <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">
                <Link className="navbar-item has-text-white" to={`/Today/${city}`}>Today</Link>
                <Link className="navbar-item has-text-white" to={`/Tomorrow/${city}`}>Tomorrow</Link>
                {/* <Link className="navbar-item has-text-white" to={`/Week/${city}`}>Week</Link> */}
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <SearchComponent />
                </div>
                <div className="navbar-item">
                  <SaveCityComponent />
                </div>
              </div>
            </div>
          </nav> 

          <Switch>
            <Route exact path="/" render={() => <DefaultComponent /> } />
            <Route path="/:day/:city" render={(props) => <DayComponent {...props} /> }/>
            <Route path="/:day/:city" render={(props) => <DayComponent {...props} /> }/>
            {/* <Route path="/Week/:city" render={(props) => <WeekComponent {...props} /> }/> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
