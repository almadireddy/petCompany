import React, { Component } from 'react';
import './App.css';

const petInserter = React.lazy(() => import('./components/petInserter'))

function App() {
  return (
    <div>
      <petInserter />
    </div>
  );
}

export default App;
