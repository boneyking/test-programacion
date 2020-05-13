import React from 'react';
import Moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import './indicadores.css';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Indicadores extends React.Component {

    dataUltimosIndicadores;

    constructor(props) {
        super(props);
        this.state = {
            seCargaronIndicadores: false,
            seCargoDataGrafico: false,
            seCargoDetalle: false,
            paginaActual: 1,
            ultimosIndicadores: {
                indicadores: [],                
                cantidadPorPagina: 2,
                mensajeUltimosIndicadores: '',
            },
            porIndicador: {
                llaveAnterior: '',
                llaveSeleccionada: '',
                valores: [],
                mensajePorIndicador: ''
            },
            detalleIndicador: {
                fechaSeleccionada: '',
                indicador: {
                    llave: '',
                    nombre: '',
                    fecha: '',
                    descripcion: '',
                    unidad: '',
                    valor: '',
                    mensajeDetalle: ''
                }
            }
        };

        this.clicPagina = this.clicPagina.bind(this);
    }

    componentDidMount() {
        this.obtenerUltimosIndicadores();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.porIndicador.llaveSeleccionada !== '' && !this.state.seCargoDataGrafico) {
                this.obtenerIndicadorPorTipo();
        }

        if (this.state.detalleIndicador.fechaSeleccionada !== ''){
            this.obtenerDetalleIndicadorPorFecha();
        }
    }

    obtenerUltimosIndicadores() {
        Moment.locale('es');
        fetch('http://localhost:5000/api/ultimosIndicadores')
            .then(response => response.json())
            .then(indicadores => {
                let listadoIndicadores = [];
                Object.keys(indicadores).forEach(nombreIndicador => {
                    listadoIndicadores.push({
                        'llave': indicadores[nombreIndicador].key,
                        'nombre': indicadores[nombreIndicador].key,
                        'fecha': indicadores[nombreIndicador].date,
                        'descripcion': indicadores[nombreIndicador].name,
                        'unidad': indicadores[nombreIndicador].unit,
                        'valor': indicadores[nombreIndicador].value
                    });
                });

                if (listadoIndicadores.length > 0) {
                    this.setState({
                        seCargaronIndicadores: true,
                        ultimosIndicadores: {
                            indicadores: listadoIndicadores,
                            mensajeUltimosIndicadores: 'Últimos Indicadores',
                            cantidadPorPagina: 2,
                        }
                    });
                } else {
                    this.setState({
                        seCargaronIndicadores: true,
                        ultimosIndicadores: {
                            indicadores: [],
                            mensajeUltimosIndicadores: 'No existen indicadores',
                        }
                    });
                }
                
            },
            (error) => {
                this.setState({
                    seCargaronIndicadores: true,
                    indicadores: [],
                    mensajeUltimosIndicadores: error                    
                })
            });
    }

    obtenerIndicadorPorTipo() {
        Moment.locale('es');
            fetch('http://localhost:5000/api/indicador/' + this.state.porIndicador.llaveSeleccionada)
                .then(response => response.json())
                .then(indicadores => {
                    let listadoValores = [];
                    Object.keys(indicadores.values).forEach(fecha => {
                        listadoValores.push({
                            fecha: Moment(Number(fecha)).format('DD-MM-yyyy'),
                            valor: indicadores.values[fecha]
                        });
                    });
                    
                    if(listadoValores.length > 0){
                        this.setState({
                            seCargoDataGrafico: true,
                            porIndicador: {
                                llaveSeleccionada: this.state.porIndicador.llaveSeleccionada,
                                valores: listadoValores,
                                mensajePorIndicador: ''
                            },
                        });
                    } else {
                        this.setState({
                            seCargoDataGrafico: true,
                            porIndicador: {
                                llaveSeleccionada: this.state.porIndicador.llaveSeleccionada,
                                valores: listadoValores,
                                mensajePorIndicador: 'No hay data para gráfico.'
                            },
                        });
                    }

                },
                (error) => {
                    this.setState({
                        seCargoDataGrafico: false,
                        porIndicador: {
                            llaveSeleccionada: this.state.porIndicador.llaveSeleccionada,
                            valores: [],
                            mensajePorIndicador: error
                        },
                    });
                });
        
    }

    obtenerDetalleIndicadorPorFecha() {
        Moment.locale('es');
            fetch('http://localhost:5000/api/indicador/' + this.state.porIndicador.llaveSeleccionada + '?fecha=' 
                + this.state.detalleIndicador.fechaSeleccionada)
                .then(response => response.json())
                .then(indicador => {
                    console.log('indicador', indicador);
                },
                (error) => {
                    
                });
    }

    clicPagina = async (event) => {
        this.setState({
            paginaActual: Number(event.target.id)           
        });
    };

    clicIndicador = async (nombreIndicador) => {
        if (nombreIndicador !== this.state.porIndicador.llaveSeleccionada) {
            this.setState({
                seCargoDataGrafico: false,
                porIndicador: {
                    llaveSeleccionada: nombreIndicador,
                    valores: [],
                    llaveAnterior: this.state.porIndicador.llaveAnterior
                }
            });
        }        
    };

    seleccionFecha = async (fecha) => {
        if (fecha !== this.state.detalleIndicador.fechaSeleccionada){
            this.setState({
                detalleIndicador: {
                    fechaSeleccionada: fecha,
                    indicador: {
                        llave: '',
                        nombre: '',
                        fecha: '',
                        descripcion: '',
                        unidad: '',
                        valor: '',
                        mensajeDetalle: ''
                    }
                }
            });
        }        
    };

    tipoUnidad(tipo, valor){
        let tipoMoneda = <CurrencyFormat value={valor} displayType={'text'} thousandSeparator={true} prefix={'$ '} />;
        switch (tipo) {
            case 'dolar':
                tipoMoneda = <CurrencyFormat value={valor} displayType={'text'} thousandSeparator={true} prefix={'US$ '} />;
                break;
            case 'pesos':
                tipoMoneda = <CurrencyFormat value={valor} displayType={'text'} thousandSeparator={true} prefix={'CLP$ '} />;
                break;
            case 'porcentual':
                tipoMoneda = + valor + ' %';
                break;
            default:
                break;
        }
        return tipoMoneda;
    }

    renderUltimosIndicadores() {
        return (
        <div className="col-sm-12 col-lg-4 col-xl-4">
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <h3>{this.state.ultimosIndicadores.mensajeUltimosIndicadores}</h3>
                    <span className="badge badge-pill badge-primary">{this.state.paginaActual}</span>
                </li>
                {this.crearListadoIndicadores()}
            </ul>
            <ul id="page-numbers">
                {this.crearPaginacion()}
            </ul>
        </div>
        )
    }

    crearListadoIndicadores() {
        const indicePagina = this.state.paginaActual * this.state.ultimosIndicadores.cantidadPorPagina;
        const indiceInicial = indicePagina - this.state.ultimosIndicadores.cantidadPorPagina;
        const todos = this.state.ultimosIndicadores.indicadores.slice(indiceInicial, indicePagina);

        return todos.map((indicador, index) => {
            return <li key={indicador.llave} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="card ancho-maximo">
                <h5 className="card-header">{indicador.nombre.toUpperCase()} <span className="float-right">{Moment(indicador.fecha).format('DD-MM-yyyy')}</span> </h5>
                <div className="card-body">
                    <h6 className="card-title">{indicador.descripcion}</h6>
                    <p className="card-text">
                        {this.tipoUnidad(indicador.unidad, indicador.valor)}
                    </p>
                    <button type="button" className="btn btn-outline-primary btn-sm" 
                        onClick={() => this.clicIndicador(indicador.llave)}>Ver gráfico</button>
                </div>
            </div>
        </li>
        });
    }

    crearPaginacion() {
        const numerosPagina = [];
        for (let i = 1; i <= Math.ceil(this.state.ultimosIndicadores.indicadores.length / this.state.ultimosIndicadores.cantidadPorPagina); i++){
            numerosPagina.push(i);
        }

        return numerosPagina.map(numero => {
            return (
                <li
                    key={numero}
                    id={numero}
                    onClick={this.clickPagina}
                    className={(this.state.paginaActual === numero) ? 'pagina-activa' : 'pagina-inactiva'}
                >
                    {numero}
                </li>
            );
        });
    }

    renderGraficoIndicador() {
        if(this.state.seCargoDataGrafico){
            return (
                <div className="col-sm-12 col-lg-12 col-xl-12">
                    <h1>{this.state.porIndicador.llaveSeleccionada}</h1>
                    <h2>{this.state.porIndicador.mensajePorIndicador}</h2>
                    <div className="row">
                        <LineChart
                            width={500}
                            height={300}
                            data={this.state.porIndicador.valores}
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
                            onChange={(date) => this.seleccionFecha(Moment(date).format('DD-MM-yyyy'))}
                            dateFormat="dd-MM-yyyy"
                            maxDate={new Date()} />
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="col-sm-12 col-lg-12 col-xl-12">
                {
                    !this.state.seCargoDataGrafico &&
                    <span>Cargando...</span>
                }

                {
                    this.state.porIndicador.mensajePorIndicador
                }
            </div>
        );        
    }

    renderDetalleIndicador() {
        if (this.state.seCargoDetalle !== ''){
            return <div>a</div>;
        }
        return (
            <div className="col-sm-12 col-lg-12 col-xl-12">
                {
                    !this.state.seCargoDetalle &&
                    <span>Cargando...</span>
                }

                {
                    this.state.porIndicador.mensajePorIndicador
                }
            </div>
        );  
        
    }
    

    render() {
        if (!this.state.seCargaronIndicadores) {
            return (
                <div className="col-12">
                    <h1>Cargando Indicadores</h1>
                </div>
            );
        }
        return (
            <>
            {this.renderUltimosIndicadores()}
            <div className="col-sm-12 col-lg-8 col-xl-8">
                <div className="row">
                    {
                        this.state.porIndicador.llaveSeleccionada !== '' &&
                        this.renderGraficoIndicador()           
                    }
                    {
                        this.state.detalleIndicador.fechaSeleccionada !== '' &&
                        this.renderDetalleIndicador()
                    }
                </div>
            </div>
            </>
        );
    }

}



export default Indicadores;