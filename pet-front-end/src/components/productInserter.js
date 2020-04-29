import React from 'react';
import instance from './utils';
import { Button, Input, InputNumber } from 'antd';
import { Typography, Divider } from 'antd';

import { Col, Row } from 'antd';
import 'antd/es/col/style/css';
import 'antd/es/row/style/css';

import 'antd/es/button/style/css';
import 'antd/es/input-number/style/css';
import 'antd/es/input/style/css';
import 'antd/es/typography/style/css';
import 'antd/es/divider/style/css';

const { Title, Text } = Typography;

class ProductInserter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            brand: '',
            name: '',
            price: 0,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleQuantityChange(value) {
        this.setState({quantity: value});
    }

    handlePriceChange(value) {
        this.setState({price: value});
    }

    handleSubmit(event) {
        console.log(this.state)
        instance.post('/', ['store_products', this.state]).then(function(res) {
            console.log(res);
            alert(`${res.status}: ${res.data}`);
        });
        
        event.preventDefault();
        //construct query to insert
    }

    render() {
        return (
            <div>
                <Title>
                    New Product
                </Title>
                <Divider />
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>Quantity</Text>
                        </Col>
                        <Col span={6}>
                            <InputNumber name='quantity' value={this.state.quantity} onChange={this.handleQuantityChange}/>
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>Brand</Text>
                        </Col>
                        <Col span={18}>
                            <Input allowClear name='brand' value={this.state.brand} onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>Name</Text>
                        </Col>
                        <Col span={18}>
                            <Input allowClear name='name' value={this.state.name} onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>Price</Text>
                        </Col>
                        <Col span={6}>
                            <InputNumber
                            defaultValue={0}
                            formatter={value => `$ ${value}`}
                            step={0.1}
                            name='price' value={this.state.price} onChange={this.handlePriceChange}/>
                        </Col>
                    </Row> 
               </div>
                <div style={{ marginBottom: 16 }}>
                    <Button onClick={this.handleSubmit}>
                        Insert Product
                    </Button>
                </div>
            </div>
        );
    }
}

export default ProductInserter;