import React, {FC} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './style/App.css';

import DefaultComponent from './components/DefaultComponent';
import SearchComponent from './components/SearchComponent';

const App: FC = () => {
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
                <Link className="navbar-item has-text-white" to="/search">SearchComponent</Link>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <SearchComponent />
                </div>
              </div>
            </div>
          </nav> 

          <Switch>
            <Route exact path="/">
              <DefaultComponent />
            </Route>
            <Route path="/search">
              <SearchComponent />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
