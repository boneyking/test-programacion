import React from 'react';
import './App.css';
import Indice from './componentes/indice';

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <h1> Indicadores </h1>
      </div>
      <div className="row">
        <div className="container">
          <div className="row">
            <Indice></Indice>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
