import React, {FC} from 'react';
import { useRoutes, A } from 'hookrouter';
import './App.css';

import DefaultComponent from './components/DefaultComponent';
import SearchComponent from './components/SearchComponent';

const routes = {
  '/': () => <DefaultComponent />,
  '/search': () => <SearchComponent title="NEW SearchComponent" />,
};

const App = () => {
  const routeResult = useRoutes(routes);
  return (
    <div className="App">
      <A href="/">Default</A>
      <A href="/search">SearchComponent</A>
        {routeResult}
    </div>
  );
}

export default App;
