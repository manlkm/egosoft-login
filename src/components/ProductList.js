import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import '../../node_modules/bootstrap-4-required/src/css/bootstrap.css'
import '../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

const columns = [{
    dataField: 'userId',
    text: 'User iD'
}, {
    dataField: 'title',
    text: 'Title'
}, {
    dataField: 'completed',
    text: 'Completed'
}];

export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    getProducts = async () => {
        const url = "/products.json";
        const obj = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }

        await fetch(`${url}`, obj)
            .then((response) => response.json())
            .then((responseJson) => {
                console.warn(responseJson);
                this.setState({ products: responseJson })
            })
            .catch((error) => {
                console.warn(error);
            })
    }

    componentDidMount() {
        this.getProducts();
        console.log('products', this.state.products);
    }

    render() {
        return (
            <BootstrapTable
                keyField="id"
                data={this.state.products}
                columns={columns}
                striped
                hover
                condensed
                pagination={ paginationFactory() }
            />
        )
    }
}
