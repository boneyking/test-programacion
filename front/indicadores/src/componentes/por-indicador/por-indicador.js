import React from "react";

export class PorIndicador extends React.Component {
    // llaveIndicador = '';

    render() {
        console.log(this.props);
        if(this.props.llaveIndicador === ''){
            return (<div className="col-sm-12 col-lg-4 col-xl-4"></div>);
        } else {
            return (
                <div className="col-sm-12 col-lg-4 col-xl-4">
                    <h1>Por Indicador</h1>
                </div>
            );
        }        
    }
}

export default PorIndicador;