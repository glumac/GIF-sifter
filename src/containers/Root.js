import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import configureStore from '../configureStore';
import { NotFound } from '../components/NotFound';
import App from './App';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Redirect from="/" exact to="/trending" />
            <Route exact path="/trending" component={App} />
            <Route path="/search/:searchterm/" component={App} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}