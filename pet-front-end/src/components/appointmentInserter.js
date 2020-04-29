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

const {Title, Text} = Typography

class AppointmentInserter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: 0,
            start_time: '',
            groomer_ID: 0,
            owner_ID: 0,
            pet: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleGroomerIDChange = this.handleGroomerIDChange.bind(this);
        this.handleOwnerIDChange = this.handleOwnerIDChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleDurationChange(value) {
        this.setState({duration: value});
    }

    handleGroomerIDChange(value) {
        this.setState({groomer_ID: value});
    }

    handleOwnerIDChange(value) {
        this.setState({owner_ID: value});
    }

    handleSubmit(event) {
        console.log(this.state)
        instance.post('/', ['appointment', this.state]).then(function(res) {
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
                    New Appointment
                </Title>
                <Divider />
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>Duration</Text>
                        </Col>
                        <Col span={6}>
                            <InputNumber name='duration' value={this.state.duration} onChange={this.handleDurationChange}/>
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>Start Time</Text>
                        </Col>
                        <Col span={18}>
                            <Input allowClear name='start_time' value={this.state.start_time} onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>Groomer ID</Text>
                        </Col>
                        <Col span={6}>
                            <InputNumber name='groomer_id' value={this.state.groomer_ID} onChange={this.handleGroomerIDChange}/>
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>Owner ID</Text>
                        </Col>
                        <Col span={6}>
                            <InputNumber name='owner_id' value={this.state.owner_ID} onChange={this.handleOwnerIDChange}/>
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>Pet Name</Text>
                        </Col>
                        <Col span={18}>
                            <Input allowClear name='pet' value={this.state.pet} onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Button onClick={this.handleSubmit}>
                        Insert Appointment
                    </Button>
                </div>
            </div>
        );
    }
}

export default AppointmentInserter;