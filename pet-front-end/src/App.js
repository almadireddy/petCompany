import React from 'react';
import './App.css';

import PetInserter from './components/petInserter';
import AppointmentInserter from './components/appointmentInserter';
import ProductInserter from './components/productInserter';
import ClientInserter from './components/clientInserter';
import Selector from './components/selector';
import { Typography } from 'antd';
import { Card, Col, Row } from 'antd';
import 'antd/es/card/style/css';
import 'antd/es/col/style/css';
import 'antd/es/row/style/css';

const { Title } = Typography;


//console.log(PetInserter)

function App() {
  return (
    <div className='App'>
      <div style={{'padding': '30px', 'margin': '10px'}}>
      <Row gutter={16}>
        <Col span={8}>
          <Card hoverable>
            <Title>
              Pet Inserter
            </Title>
            <PetInserter />
          </Card>
        </Col>
      </Row>
      </div>
      <AppointmentInserter />
      <ProductInserter />
      <ClientInserter />
      <Selector />
    </div>
  );
}

export default App;
