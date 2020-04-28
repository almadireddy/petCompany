import React from 'react';
import './App.css';

import PetInserter from './components/petInserter';
import AppointmentInserter from './components/appointmentInserter';
import ProductInserter from './components/productInserter';
import ClientInserter from './components/clientInserter';

console.log(PetInserter)

function App() {
  return (
    <div className='App'>
      <PetInserter />
      <AppointmentInserter />
      <ProductInserter />
      <ClientInserter />
    </div>
  );
}

export default App;
