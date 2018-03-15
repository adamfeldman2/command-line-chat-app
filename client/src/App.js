import React, { Component } from 'react';
import './styles/App.css';
import Router from './routers/router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
    };
  }

  render() {
    return <Router />;
  }
}

export default App;
