import React from 'react';
import './App.css';

import PetInserter from './components/petInserter';
import AppointmentInserter from './components/appointmentInserter';
import ProductInserter from './components/productInserter';
import ClientInserter from './components/clientInserter';
import Selector from './components/selector';
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
      <Row gutter={16}>
        <Col span={8}>
          <Card hoverable>
            <PetInserter />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable>
            <ClientInserter />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable>
            <ProductInserter />
          </Card>
        </Col>
      </Row>
      </div>
      <div style={{'padding': '30px', 'margin': '10px', 'marginBottom': '30px'}}>
      <Row>
        <Col offset={8} span={8}>
          <Card hoverable>
          <AppointmentInserter />
          </Card>
        </Col>
      </Row>
      </div>
      </TabPane>
      <TabPane tab="QUERY" key="2">
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
