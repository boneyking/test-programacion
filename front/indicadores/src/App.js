import React from 'react';
import './App.css';
import UltimosIndicadores from './ultimos-indicadores/ultimos-indicadores';
import PorIndicador from './por-indicador/por-indicador';
import IndicadorFecha from './indicador-fecha/indicador-fecha';

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <UltimosIndicadores></UltimosIndicadores>
        <PorIndicador></PorIndicador>
        <IndicadorFecha></IndicadorFecha>
      </div>
    </div>
  );
}

export default App;
