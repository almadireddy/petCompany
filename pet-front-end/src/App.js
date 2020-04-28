import React from 'react';
import './App.css';

import PetInserter from './components/petInserter'
import AppointmentInserter from './components/appointmentInserter'

console.log(PetInserter)

function App() {
  return (
    <div className='App'>
      <PetInserter />
      <AppointmentInserter />
    </div>
  );
}

export default App;
