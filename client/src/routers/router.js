import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import FourOhFour from '../pages/FourOhFour';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route component={FourOhFour} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Router;
