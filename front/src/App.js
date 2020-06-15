import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import injectContext from './store/appContext';
import Navbar from './components/navbar';
import TextEditor from './components/texteditor';
import Home from './views/home';
import NotFound from './views/notfound';

const App = props => {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
        <div className="row">
          <div className="col-md-4">
            <h1>Texto 1</h1>
            <TextEditor />
          </div>
        </div>
      </div>
    </>
  );
}

export default injectContext(App);
