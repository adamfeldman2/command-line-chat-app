import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import FourOhFour from '../pages/FourOhFour';
import Header from '../components/Header';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Router;
