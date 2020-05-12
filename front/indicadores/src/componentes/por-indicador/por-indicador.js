import React, { useState } from "react";
import Moment from 'moment';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export class PorIndicador extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            llave: '',
            nombre: '',
            unidad: '',
            valores: [],
            llaveAnterior: '',
            fechaSeleccionada: ''         
        };
    }

    componentDidMount() {
        this.obtenerIndicadorPorTipo();
    }

    obtenerIndicadorPorTipo() {
        if (this.props.llaveIndicador !== '') {
            Moment.locale('es');
            fetch('http://localhost:5000/api/indicador/' + this.props.llaveIndicador)
                .then(response => response.json())
                .then(indicadores => {
                    let listadoValores = [];
                    Object.keys(indicadores.values).forEach(fecha => {
                        listadoValores.push({
                            fecha: Moment(Number(fecha)).format('DD-MM-yyyy'),
                            valor: indicadores.values[fecha]
                        });
                    });
    
                    this.setState({
                        llave: indicadores.key,
                        nombre: indicadores.name,
                        unidad: indicadores.unit,
                        valores: listadoValores,
                        llaveAnterior: this.props.llaveIndicador,
                        fechaSeleccionada: ''
                    });
                },
                () => {
                    this.setState({
                        llave: '',
                        nombre: '',
                        unidad: '',
                        valores: [],
                        llaveAnterior: this.props.llaveIndicador,
                        fechaSeleccionada: ''
                    });
                });
        }
        
    }

    render() {
        const {handlePorFecha} = this.props;
        
        if ((this.state.llaveAnterior !== undefined && this.state.llaveAnterior !== '') && this.state.llaveAnterior !== this.props.llaveIndicador){
            this.obtenerIndicadorPorTipo();
        }

        if(this.props.llaveIndicador === ''){
            this.setState({llave: '', valores: ''});
            return (<div className="col-sm-12 col-lg-12 col-xl-12"></div>);
        } else {
            if(this.state.llave !== ''){
                return (
                    <div className="col-sm-12 col-lg-12 col-xl-12">
                        <h1>{this.props.llaveIndicador}</h1>
                        <div className="row">
                            <LineChart
                                width={500}
                                height={300}
                                data={this.state.valores}
                                margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="fecha" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="valor" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </div>
                        <div className="row">
                            <div className="col-12">
                            <DatePicker 
                                selected={this.state.fechaSeleccionada}
                                onChange={(date) => handlePorFecha(Moment(date).format('DD-MM-yyyy'))}
                                dateFormat="dd-MM-yyyy"
                                maxDate={new Date()} />
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (<div className="col-sm-12 col-lg-4 col-xl-4">Cargando...</div>);
            }            
        }        
    }
}

export default PorIndicador;