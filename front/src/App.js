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
import PostCard from './views/projects/exercises/postcard/postcard';
import InstagramIndex from './views/projects/exercises/instagram/instagramindex';
import InstagramFeed from './views/projects/exercises/instagram/instagramfeed';
import Form from './views/projects/exercises/form';
import ExcuseGenerator from './views/projects/exercises/excusegenerator';
import DomainNameGenerator from './views/projects/exercises/domainnamegenerator';
import RandomCard from './views/projects/exercises/randomcard';
import StarWars from './views/projects/web/starwars';
import BubbleSortCards from './views/projects/exercises/bubblesortcards';
import MusicPlayer from './views/projects/exercises/musicplayer';
import TodoList from './views/projects/exercises/todolist';



const App = props => {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/proyectos" component={Projects} />
            <Route exact path="/proyectos/postal" component={PostCard} />
            <Route exact path="/proyectos/instagramindex" component={InstagramIndex} />
            <Route exact path="/proyectos/instagramfeed" component={InstagramFeed} />
            <Route exact path="/proyectos/formulario" component={Form} />
            <Route exact path="/proyectos/generador_excusas" component={ExcuseGenerator} />
            <Route exact path="/proyectos/generador_nombres_dominio" component={DomainNameGenerator} />
            <Route exact path="/proyectos/carta_aleatoria" component={RandomCard} />
            <Route exact path="/proyectos/ordenador_cartas" component={BubbleSortCards} />
            <Route exact path="/proyectos/contadorsimple" component={SimpleCounter} />
            <Route exact path="/proyectos/listadecontactos" component={ContactList} />
            <Route exact path="/proyectos/tictactoe" component={TicTacToe} />
            <Route exact path="/proyectos/semaforo" component={TrafficLight} />
            <Route exact path="/proyectos/reproductor_musica" component={MusicPlayer} />
            <Route exact path="/proyectos/lista_tareas" component={TodoList} />
            <Route exact path="/proyectos/smbarber" component={SMBarber} />
            <Route exact path="/proyectos/rapinmi" component={Rapinmi} />
            <Route exact path="/proyectos/starwars" component={StarWars} />
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
