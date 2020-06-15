import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import injectContext from './store/appContext';
import Navbar from './components/navbar';
import TextEditor from './components/texteditor';
import Home from './views/home';
import NotFound from './views/notfound';
import Footer from './components/footer';

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
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default injectContext(App);
