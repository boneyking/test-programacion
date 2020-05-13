import React from 'react';
import './App.css';
import Indicadores from './indicadores';

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center">
          <h1> Indicadores </h1>
        </div>        
      </div>
      <div className="row">
        <div className="container">
          <div className="row">
            <Indicadores></Indicadores>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
