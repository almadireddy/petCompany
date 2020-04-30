import React from 'react';
import instance from './utils';
import QueryTable from './queryTable';
import { Card } from 'antd';
import { Select } from 'antd';
import { Row, Col, Input } from 'antd';
import { Typography, Divider } from 'antd';
import { Button } from 'antd';

import 'antd/es/card/style/css';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import 'antd/es/input/style/css';
import 'antd/es/typography/style/css';
import 'antd/es/divider/style/css';
import 'antd/es/button/style/css';
import 'antd/es/select/style/css';


const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            table: null,
            query: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeQuery = this.changeQuery.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(x) {
        this.setState({value: x});
    }

    changeQuery(event) {
        this.setState({query: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        let x;
        if (this.state.value == 5 && this.state.query !== '') {
            x = await instance.get('/query', {
                params: {
                    value: this.state['query']
                }
            });
        } else {
            x = await instance.get('/sample-query', {
                params: {
                    value: this.state['value']
                }
            });
        }

        console.log(x.data);
        this.setState({table: x.data});
    }

    render() {
        return (
            <div>
                <Card>
                    <Row>
                        <Col>
                            <Title>
                                Queries
                            </Title>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row style={{'marginBottom': 15}}>
                        <Col span={6}>
                            <Text>
                                Select Query:
                            </Text>
                        </Col>
                        <Col span={18}>
                            <Select style={{width: '100%'}} value={this.state.value} onChange={this.handleChange}>
                            <Option value='0'>Show count of largest population</Option>
                            <Option value='1'>Show a listing of a key entity in the database</Option>
                            <Option value='2'>Show a list of entities that must function together 
                            (Show a list of managers and receptionists who work together (JOIN))</Option>
                            <Option value='3'>Show the cost of an occurrence, derived 
                            using aggregate functions (Cost to groom a pet)</Option>
                            <Option value='4'>Show a schedule for multiple occurrences, 
                            sorted by date and time (today’s appointments)</Option>
                            <Option value='5'>Other</Option>
                            </Select>
                        </Col>
                    </Row> 
                    {this.state.value == 5 && 
                    <Row style={{'marginBottom': 15}}>
                        <Col offset={5} span={6}>
                            <Text>
                                Execute your own Query:
                            </Text>
                        </Col>
                        <Col span={8}>
                            <TextArea value={this.state.query} onChange={this.changeQuery} />
                        </Col>
                    </Row>}
                    <Row style={{'marginBottom': 15}}>
                        <Col offset={9} span={6}>
                            <Button onClick={this.handleSubmit}>
                                Execute 
                            </Button>
                        </Col>
                    </Row>
                </Card>
                <Row style={{'marginBottom': 30}}>
                    <Col offset={6} span={12}>
                    {this.state.table && (<Card>
                    <QueryTable table={this.state.table} />
                </Card>)}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Selector;