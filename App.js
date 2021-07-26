import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
import Login from './src/Login';
import Pickup from './src/Pickup';
import Dashboard from './src/Dashboard';


function App() {
  return (
    <NativeBaseProvider>
      <Pickup/>
    <Dashobard/>
    </NativeBaseProvider>
  );
}


export default App;

