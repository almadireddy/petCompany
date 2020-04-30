import React from 'react';
import './App.css';

import PetInserter from './components/petInserter';
import AppointmentInserter from './components/appointmentInserter';
import ProductInserter from './components/productInserter';
import ClientInserter from './components/clientInserter';
import Selector from './components/selector';
import StateTable from './components/stateTable';
import { Card, Col, Row } from 'antd';
import 'antd/es/card/style/css';
import 'antd/es/col/style/css';
import 'antd/es/row/style/css';
import 'antd/dist/antd.css';



//console.log(PetInserter)

function App() {
  return (
    <div className='App'>
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
      <div style={{'padding': '30px', 'margin': '10px'}}>
      <Row>
        <Col offset={8} span={8}>
          <Card hoverable>
          <AppointmentInserter />
          </Card>
        </Col>
        <Col offset={8} span={8}>
          <Card>
          <StateTable table='pet' />
          </Card>
        </Col>
      </Row>
      </div>
      <Selector />
    </div>
  );
}

export default App;
