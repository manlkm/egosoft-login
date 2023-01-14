import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import '../../node_modules/bootstrap-4-required/src/css/bootstrap.css'
import '../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Button from 'react-bootstrap/Button';

const columns = [{
    dataField: 'name',
    text: '貨品名稱'
}, {
    dataField: 'summary',
    text: '規格',
    formatter: productSummaryFormatter
},
{
    dataField: 'categories[0].name',
    text: '種類' 
},
{
    dataField: 'df1',
    isDummyField: true,
    text: '供應商',
    formatter: dummySupplierFormatter
}, {
    dataField: 'price.value',
    text: '價錢'
},
{
    dataField: 'df2',
    isDummyField: true,
    text: '動作',
    formatter: productActionButtonFormatter
}
];

function productActionButtonFormatter(cell, row) {
    return (
        <Button variant="success">修改</Button>
    )
}

function productSummaryFormatter(cell, row, rowIndex) {
    let trimmed = '';
    if (cell != null && cell.length > 0) {
        trimmed = cell.substring(0, 10).replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, "");;
    }
    return (
        trimmed
    );
}

function dummySupplierFormatter(cell, row) {
    let supplier = '供應商一'
    if (row.price.value != null) {
        if (row.price.value > 200 && row.price.value <= 300) {
            supplier = '供應商二';
        }
        else if (row.price.value > 300 && row.price.value <= 500) {
            supplier = '供應商三';
        }
        else {
            supplier = '供應商一';
        }
    }

    return (
        supplier
    );
}

export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    getProducts = async () => {
        const url = "/products2.json";
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
                //console.warn(responseJson);
                this.setState({ products: responseJson })
            })
            .catch((error) => {
                console.warn(error);
            })
    }

    componentDidMount() {
        this.getProducts();
    }

    render() {
        return (
            <BootstrapTable
                keyField="name"
                data={this.state.products}
                columns={columns}
                striped
                hover
                condensed
                pagination={paginationFactory()}
            />
        )
    }
}
