import React from "react";
import UltimosIndicadores from "./ultimos-indicadores/ultimos-indicadores";
import PorIndicador from "./por-indicador/por-indicador";
import IndicadorFecha from "./indicador-fecha/indicador-fecha";

class Indice extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            llave: undefined,
            fechaSeleccionada: undefined
        };
    }

    handlePorIndicador = async (parametro) => {
        this.setState({llave: parametro});
    };

    handlePorFecha = async (parametro) => {
        console.log('sasas', parametro);
        this.setState({fechaSeleccionada: parametro});
    };

    render(){
        return (
            <>
                <UltimosIndicadores handlePorIndicador={this.handlePorIndicador}></UltimosIndicadores>
                <div className="col-sm-12 col-lg-8 col-xl-8">
                    <div className="row">
                    {
                        this.state.llave !== undefined &&
                        <PorIndicador llaveIndicador={this.state.llave} handlePorFecha={this.handlePorFecha}></PorIndicador>
                    }                
                    {
                        this.state.fechaSeleccionada !== undefined &&
                        <IndicadorFecha fechaSeleccionada={this.state.fechaSeleccionada}></IndicadorFecha>
                    }
                    </div>
                </div>
            </>
        );
        
    }
}


export default Indice;