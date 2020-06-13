import React from 'react';
import injectContext from './store/appContext';
import Navbar from './components/navbar';
import TextEditor from './components/texteditor';

const App = props => {
  return (
    <div className="App">
      <Navbar />
      <div className="row">
        <div className="col-md-4">
          <h1>Texto 1</h1>
          <TextEditor />
        </div>
      </div>
      <br />
      <h1>Texto 2</h1>
      <TextEditor />
      <br />
      <h1>Texto 3</h1>
      <TextEditor />
      <br />
      <h1>Texto 4</h1>
      <TextEditor />
    </div>
  );
}

export default injectContext(App);
