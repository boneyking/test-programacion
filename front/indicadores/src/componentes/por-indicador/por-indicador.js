import React from "react";

export class PorIndicador extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    handlePorIndicador = (parametro) => {
        console.log(parametro);
    }

    render() {
        // const { handlePorIndicador } = this.props;
        const {handlePorIndicador} = this.props;
        console.log('haasdas', handlePorIndicador);

        return (
            <div className="col-sm-12 col-lg-4 col-xl-4">
                <h1>Por Indicador</h1>
            </div>
        );
    }
}

export default PorIndicador;