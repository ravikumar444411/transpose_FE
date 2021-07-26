import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
import Login from './src/Login';
import Pickup from './src/Pickup';

function App() {
  return (
    <NativeBaseProvider>
      <Pickup/>
    </NativeBaseProvider>
  );
}


export default App;

