import React from "react";

export class IndicadorFecha extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            fechaSeleccionada: ''         
        };
    }

    render() {
        if (this.props.fechaSeleccionada !== '') {
            return (
                <div className="col-sm-12 col-lg-12 col-xl-12">
                    <h1>Indicador Fecha</h1>
                </div>
              );
        } else {
            return (
                <div className="col-sm-12 col-lg-12 col-xl-12">
                    Cargando...
                </div>
              );
        }
        
    }
}

export default IndicadorFecha;