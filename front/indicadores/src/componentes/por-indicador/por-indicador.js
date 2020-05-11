import React from "react";
import Moment from 'moment';
import { Chart } from 'react-charts';

export class PorIndicador extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            llave: '',
            nombre: '',
            unidad: '',
            valores: []            
        };
    }

    obtenerIndicadorPorTipo() {
        Moment.locale('es');
        fetch('http://localhost:5000/api/indicador/cobre')
            .then(response => response.json())
            .then(indicadores => {
                let listadoValores = [];
                Object.keys(indicadores.values).forEach(fecha => {
                    listadoValores.push({
                        fecha: Moment(fecha).format('DD-MM-yyyy'),
                        valor: indicadores.values[fecha]
                    });
                });

                this.setState({
                    llave: indicadores.key,
                    nombre: indicadores.name,
                    unidad: indicadores.unit,
                    valores: listadoValores
                });
            },
            () => {
                this.setState({
                    llave: '',
                    nombre: '',
                    unidad: '',
                    valores: [] 
                });
            });
    }



    render() {

        if(this.props.llaveIndicador === ''){
            return (<div className="col-sm-12 col-lg-4 col-xl-4"></div>);
        } else {
            this.obtenerIndicadorPorTipo();
            return (
                <div className="col-sm-12 col-lg-4 col-xl-4">
                    <h1>{this.props.llaveIndicador}</h1>
                    <>
                    
                    
                                                  
                    </>
                    
                </div>
            );
        }        
    }
}

export default PorIndicador;