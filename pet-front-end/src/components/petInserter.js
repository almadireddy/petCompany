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


class PetInserter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            owner_id: 0,
            name: '',
            breed: '',
            species: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOwnerIdChange = this.handleOwnerIdChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleOwnerIdChange(value) {
        this.setState({owner_id: value});
    }

    handleSubmit(event) {
        console.log(this.state)
        instance.post('/', ['pet', this.state]).then(function(res) {
            console.log(res);
            alert(`${res.status}: ${res.data}`);
        });
        
        //event.preventDefault();
        //construct query to insert
    }

    render() {
        return (
            <div>
                <Title>
                    New Pet
                </Title>
                <Divider />
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col offset={6} span={6}>
                            <Text>Owner ID</Text>
                        </Col>
                        <Col span={6}>
                            <InputNumber name='owner_id' value={this.state.owner_id} onChange={this.handleOwnerIdChange}/>
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
                            <Text>Breed</Text>
                        </Col>
                        <Col span={18}>
                            <Input allowClear name='breed' value={this.state.breed} onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={6}>
                            <Text>Species</Text>
                        </Col>
                        <Col span={18}>
                            <Input allowClear name='species' value={this.state.species} onChange={this.handleInputChange} />
                        </Col>
                    </Row> 
               </div>
                <div style={{ marginBottom: 16 }}>
                    <Button onClick={this.handleSubmit}>
                        Create Pet
                    </Button>
                </div>
                
            </div>
        );
    }
}

export default PetInserter;