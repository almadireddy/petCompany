import React from 'react';
import './App.css';

import PetInserter from './components/petInserter';
import AppointmentInserter from './components/appointmentInserter';
import ProductInserter from './components/productInserter';
import ClientInserter from './components/clientInserter';
import Selector from './components/selector';
import { Card, Col, Row } from 'antd';
import 'antd/es/card/style/css';
import 'antd/es/col/style/css';
import 'antd/es/row/style/css';



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
      <AppointmentInserter />
      </div>
      <Selector />
    </div>
  );
}

export default App;
