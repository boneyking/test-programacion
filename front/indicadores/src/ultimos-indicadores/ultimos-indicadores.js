import React from "react";


class UltimosIndicadores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000/")
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result);
              this.setState({
                isLoaded: true,
                items: result.items
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log('errroR:', error);
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                {items.map(item => (
                    <li key={item.name}>
                    {item.name} {item.price}
                    </li>
                ))}
                </ul>
            );
        }
        // return (
        //     <div className="col-sm-12 col-lg-4 col-xl-4">
        //         <h1>Ultimos indicadores</h1>
        //     </div>
        //   );
    }
}

export default UltimosIndicadores;