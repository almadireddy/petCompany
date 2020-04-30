import React from 'react';
import './App.css';

import PetInserter from './components/petInserter';
import AppointmentInserter from './components/appointmentInserter';
import ProductInserter from './components/productInserter';
import ClientInserter from './components/clientInserter';
import Selector from './components/selector';
import StateTable from './components/stateTable';
import { Card, Col, Row } from 'antd';
import { Tabs } from 'antd';

import 'antd/es/card/style/css';
import 'antd/es/col/style/css';
import 'antd/es/row/style/css';
import 'antd/dist/antd.css';

const {TabPane} = Tabs;

//console.log(PetInserter)

function App() {
  return (
    <div className='App'>
      <Tabs>
        <TabPane tab="INSERT" key="1">
      <div style={{'padding': '30px', 'margin': '10px'}}>
      <Row justify={"center"} gutter={16}>
        <Col span={8}>
          <Card hoverable>
            <PetInserter />
          </Card>
        </Col>
        <Col pan={8}>
          <Card hoverable>
            <ClientInserter />
          </Card>
        </Col>
      </Row>
      </div>
      <Row justify={"center"} gutter={16}>
        <Col span={8}>
          <Card hoverable>
          <AppointmentInserter />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable>
            <ProductInserter />
          </Card>
        </Col>
      </Row>
      </TabPane>
      <TabPane tab='STATE' key='2'>
      <Row>
        <Col span={24}>
          <Card>
          <StateTable table='Pet' />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card>
          <StateTable table='Client' />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card>
          <StateTable table='Appointment' />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card>
          <StateTable table='Store_Products' />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
          <StateTable table='Product_Species' />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
          <StateTable table='Species' />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card>
          <StateTable table='Employee' />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
          <StateTable table='Manager' />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
          <StateTable table='Groomer' />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
          <StateTable table='Receptionist' />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Card>
          <StateTable table='Shift' />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
          <StateTable table='Groomer_Shift' />
          </Card>
        </Col>
      </Row>
      </TabPane>
      <TabPane tab="QUERY" key="3">
      <Row>
        <Col span={24}>
          <Selector />
        </Col>
      </Row>
      </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
