import React from 'react';
import instance from './utils';
import { Button, Input } from 'antd';
import { Typography, Divider } from 'antd';

import { Col, Row } from 'antd';
import 'antd/es/col/style/css';
import 'antd/es/row/style/css';

import 'antd/es/button/style/css';
import 'antd/es/input/style/css';
import 'antd/es/typography/style/css';
import 'antd/es/divider/style/css';

const { Title, Text } = Typography;

class ClientInserter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            minit: '',
            lname: '',
            phone_number: '',
            email: '',
            address: '',
            birthday: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        console.log(this.state)
        instance.post('/', ['client', this.state]).then(function(res) {
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
                    New Client
                </Title>
                <Divider />
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>Fname</Text>
                        </Col>
                        <Col span={12}>
                            <Input placeholder='First Name' allowClear name='fname' value={this.state.fname} onChange={this.handleInputChange} />
                        </Col>
                        <Col span={3}>
                            <Text>MInit</Text>
                        </Col>
                        <Col span={3}>
                            <Input name='minit' 
                            value={this.state.minit} onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>LName</Text>
                        </Col>
                        <Col span={18}>
                            <Input placeholder='Last Name' allowClear name='lname' value={this.state.lname} onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>Phone Number</Text>
                        </Col>
                        <Col span={18}>
                            <Input allowClear name='phone_number' value={this.state.phone_number} onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>Email</Text>
                        </Col>
                        <Col span={18}>
                            <Input allowClear name='email' value={this.state.email} onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>Address</Text>
                        </Col>
                        <Col span={18}>
                            <Input allowClear name='address' value={this.state.address} onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>Birthday</Text>
                        </Col>
                        <Col span={18}>
                            <Input allowClear name='birthday' value={this.state.birthday} onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Button onClick={this.handleSubmit}>
                        Insert Client
                    </Button>
                </div>
            </div>
        );
    }
}

export default ClientInserter;