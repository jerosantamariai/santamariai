import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import injectContext from './store/appContext';
import Navbar from './components/navbar';
import Home from './views/home';
import NotFound from './views/notfound';
import Footer from './components/footer';
import Projects from './views/projects';
import Perfil from './views/perfil';

const App = props => {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/proyectos" component={Projects} />
            <Route exact path="/miperfil" component={Perfil} />
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
