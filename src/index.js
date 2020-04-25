import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NotFound from './NotFound';
import Login from './Login';
import Register from './Register';
import Info from './Info';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';

const Root = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route exact path="/" component={App} />
      <Route path="/register" component={Register} />
      <Route path="/info" component={Info} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
