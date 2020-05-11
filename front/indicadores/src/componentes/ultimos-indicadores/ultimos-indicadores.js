import React from "react";
import Moment from 'moment';
import './ultimos-indicadores.css';
import CurrencyFormat from 'react-currency-format';


class UltimosIndicadores extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            seCargaronIndicadores: false,
            mensaje: '',
            indicadores: [],
            llave: '',
            paginaActual: 1,
            cantidadPorPagina: 2
        };
        this.handleAvanzar = this.handleAvanzar.bind(this);

    }

    handleAvanzar(event) {
        this.setState({
            paginaActual: Number(event.target.id)
        });
    }

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

    componentDidMount() {
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
                        mensaje: 'Se cargaron Indicadores',
                        indicadores: listadoIndicadores,
                        llave: ''
                    });
                } else {
                    this.setState({
                        seCargaronIndicadores: true,
                        mensaje: 'No hay Indicadores',
                        indicadores: [],
                        llave: ''
                    });
                }
                
            },
            () => {
                this.setState({
                    seCargaronIndicadores: true,
                    mensaje: 'No se cargaron los Indicadores',
                    indicadores: [],
                    llave: ''
                })
            });
    }    

    render() {
        const {handlePorIndicador} = this.props;


        if (this.state.seCargaronIndicadores) {
            if (this.state.indicadores.length > 0) {
                const indicePagina = this.state.paginaActual * this.state.cantidadPorPagina;
                const indiceInicial = indicePagina - this.state.cantidadPorPagina;
                const todos = this.state.indicadores.slice(indiceInicial, indicePagina);
        
                const renderTodos = todos.map((indicador, index) => {
                    return <li key={indicador.llave} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="card ancho-maximo">
                        <h5 className="card-header">{indicador.nombre.toUpperCase()} <span className="float-right">{Moment(indicador.fecha).format('DD-MM-yyyy')}</span> </h5>
                        <div className="card-body">
                            <h6 className="card-title">{indicador.descripcion}</h6>
                            <p className="card-text">
                                {this.tipoUnidad(indicador.unidad, indicador.valor)}
                            </p>
                            <button type="button" className="btn btn-primary" 
                                onClick={() => handlePorIndicador(indicador.llave)}>Go somewhere</button>
                        </div>
                    </div>
                </li>
                });
        
                const numerosPagina = [];
                for (let i = 1; i <= Math.ceil(this.state.indicadores.length / this.state.cantidadPorPagina); i++){
                    numerosPagina.push(i);
                }
    
                const renderNumerosPaginas = numerosPagina.map(numero => {
                    return (
                        <>
                        {
                            this.state.paginaActual === numero &&
                            <li
                                key={numero}
                                id={numero}
                                onClick={this.handleAvanzar}
                                className="pagina-activa"
                            >
                                {numero}
                            </li>
                        }
    
                        {
                            this.state.paginaActual !== numero &&
                            <li
                                key={numero}
                                id={numero}
                                onClick={this.handleAvanzar}
                                className="pagina-inactiva"
                            >
                                {numero}
                            </li>
                        }
                        </>
                        
                    );
                });
        
                return (
                    <div className="col-sm-12 col-lg-4 col-xl-4">
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <h3>Últimos Indicadores</h3>
                                <span className="badge badge-pill badge-primary">{this.state.paginaActual}</span>
                            </li>
                            {renderTodos}
                        </ul>
                        <ul id="page-numbers">
                            {renderNumerosPaginas}
                        </ul>
                    </div>
                );
            }
            return this.state.mensaje;
            
        }
        return 'Cargando últimos indicadores';
        

        // if (this.state.seCargaronIndicadores) {
        //     return (
        //         <div className="col-sm-12 col-lg-4 col-xl-4">
        //             <ul className="list-group">
        //                 <li className="list-group-item d-flex justify-content-between align-items-center"><h3>Últimos Indicadores</h3></li>
        //                 {this.state.indicadores.map(indicador => 
        //                     <li key={indicador.llave} className="list-group-item d-flex justify-content-between align-items-center">
        //                         <div className="card ancho-maximo">
        //                             <h5 className="card-header">{indicador.nombre.toUpperCase()} <span className="float-right">{Moment(indicador.fecha).format('DD-MM-yyyy')}</span> </h5>
        //                             <div className="card-body">
        //                                 <h6 className="card-title">{indicador.descripcion}</h6>
        //                                 <p className="card-text">
        //                                     {this.tipoUnidad(indicador.unidad, indicador.valor)}
        //                                 </p>
        //                                 <button type="button" className="btn btn-primary" 
        //                                     onClick={() => handlePorIndicador(indicador.llave)}>Go somewhere</button>
        //                             </div>
        //                         </div>
        //                     </li>
        //                 )}
        //             </ul>
        //         </div>
        //     );
        // } else {
        //     return 'Cargando últimos indicadores';
        // }        
    }
}

export default UltimosIndicadores;