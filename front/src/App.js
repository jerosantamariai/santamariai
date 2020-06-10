import React from 'react';
import injectContext from './store/appContext';

const App = props => {
  return (
    <div className="App">
      <h1>Hola</h1>
    </div>
  );
}

export default injectContext(App);
