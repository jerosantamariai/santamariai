import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import injectContext from './store/appContext';
import Navbar from './components/navbar';
import Home from './views/home';
import NotFound from './views/notfound';
import Footer from './components/footer';
import Projects from './views/projects';
import Perfil from './views/perfil';
import Icom from './views/icom';
import Fstack from './views/fstack';
import SimpleCounter from './views/projects/exercises/simplecounter';
import ContactList from './views/projects/exercises/contactlist';
import SMBarber from './views/projects/web/smbarber';
import Rapinmi from './views/projects/web/rapinmi';
import TicTacToe from './views/projects/exercises/tictactoe';
import TrafficLight from './views/projects/exercises/trafficlight';

const App = props => {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/proyectos" component={Projects} />
            <Route exact path="/proyectos/contadorsimple" component={SimpleCounter} />
            <Route exact path="/proyectos/listadecontactos" component={ContactList} />
            <Route exact path="/proyectos/tictactoe" component={TicTacToe} />
            <Route exact path="/proyectos/semaforo" component={TrafficLight} />
            <Route exact path="/proyectos/smbarber" component={SMBarber} />
            <Route exact path="/proyectos/rapinmi" component={Rapinmi} />
            <Route exact path="/miperfil" component={Perfil} />
            <Route exact path="/icom" component={Icom} />
            <Route exact path="/fstack" component={Fstack} />
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
