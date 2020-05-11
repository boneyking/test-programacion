import React from "react";
import UltimosIndicadores from "./ultimos-indicadores/ultimos-indicadores";
import PorIndicador from "./por-indicador/por-indicador";
import IndicadorFecha from "./indicador-fecha/indicador-fecha";

class Indice extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            llave: undefined
        };
    }

    handlePorIndicador = async (parametro) => {
        this.setState({llave: parametro});
    };

    render(){
        return (
            <>
                <UltimosIndicadores handlePorIndicador={this.handlePorIndicador}></UltimosIndicadores>
                {
                    this.state.llave !== undefined && 
                    <PorIndicador llaveIndicador={this.state.llave}></PorIndicador>
                }                
                <IndicadorFecha></IndicadorFecha>
            </>
        );
        
    }
}


export default Indice;