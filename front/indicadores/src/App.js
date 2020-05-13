import React from 'react';
import './App.css';
import Indicadores from './indicadores';

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="card border-dark mb-3 App-width">
          <div className="card-header"><h4>Indicadores</h4></div>
          <div className="card-body text-dark">
            <div className="row">
              <Indicadores></Indicadores>
            </div>
          </div>
        </div>
      </div>
    </div>
      
  );
}

export default App;
