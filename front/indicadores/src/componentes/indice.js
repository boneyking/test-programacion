import React from "react";
import UltimosIndicadores from "./ultimos-indicadores/ultimos-indicadores";
import PorIndicador from "./por-indicador/por-indicador";
import IndicadorFecha from "./indicador-fecha/indicador-fecha";

class Indice extends React.Component {
    handlePorIndicador = async (parametro) => {
        console.log(parametro);
    };

    render(){
        return (
            <>
                <UltimosIndicadores handlePorIndicador={this.handlePorIndicador}></UltimosIndicadores>
                <PorIndicador handlePorIndicador={this.handlePorIndicador}></PorIndicador>
                <IndicadorFecha></IndicadorFecha>
            </>
        );
        
    }
}


export default Indice;