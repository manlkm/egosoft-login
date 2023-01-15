import React, { Component } from 'react'

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '../../node_modules/bootstrap-4-required/src/css/bootstrap.css'
import '../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '../style/ProductList.css'


const columns = [
    {
        dataField: 'df1',
        isDummyField: true,
        text: '貨品號碼',
        formatter: dummyProductCodeFormatter
    },
    {
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
        dataField: 'df2',
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
        style: {
            padding: '5px'
        },
        formatter: productActionButtonFormatter
    }
];

function productActionButtonFormatter(cell, row) {
    return (
        <>
            <Button variant="success">修改</Button>
            <Button variant="warning">開單</Button>
        </>
    )
}

function dummyProductCodeFormatter(cell, row, rowIndex) {
    return (
        'E1' + (rowIndex + 1).toString().padStart(4, '0')
    )
}

function productSummaryFormatter(cell, row, rowIndex) {
    let trimmed = '';
    if (cell != null && cell.length > 0) {
        trimmed = cell.substring(0, 10).replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, "");
    }
    return (
        trimmed + '...'
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
        //this.getProducts();
    }

    render() {
        return (
            <>
                <div className='container'>
                    <div className='row'>
                        <div className='col-4'>
                            <Form.Select size="lg">
                                <option>選擇種類</option>
                                <option value="1">摺椅</option>
                                <option value="2">疊凳</option>
                                <option value="3">摺檯</option>
                                <option value="3">茶几</option>
                                <option value="3">小膠椅</option>
                                <option value="3">書檯</option>
                                <option value="3">電腦檯</option>
                                <option value="3">晾衫架</option>
                                <option value="3">晾衣架</option>
                                <option value="3">梳化</option>
                                <option value="3">扶手椅</option>
                                <option value="3">床架</option>
                            </Form.Select>
                        </div>
                        <div className='col-4'>
                            <Form.Control type="text" placeholder="貨品號碼或名稱" />
                        </div>
                        <div className='col-4'>
                            <Button variant="primary" onClick={this.getProducts}>
                                搜索
                            </Button>
                        </div>
                    </div>
                    <BootstrapTable
                        keyField="df1"
                        data={this.state.products}
                        columns={columns}
                        striped
                        hover
                        condensed
                        pagination={paginationFactory()}
                    />
                </div>
            </>
        )
    }
}
