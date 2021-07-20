import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
import Login from './src/Login';

function App() {
  return (
    <NativeBaseProvider>
      <Login/>
    </NativeBaseProvider>
  );
}


export default App;

