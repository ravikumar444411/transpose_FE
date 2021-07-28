import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
import Login from './src/Login';
import Pickup from './src/Pickup';
import Dashboard from './src/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator  initialRouteName={'Login'}>
      <Stack.Screen name="Login" component={Login}   
        options={{ 
            header:()=>null         
          }} />
      <Stack.Screen name="dashboard" component={Dashboard}   
        options={{ 
            header:()=>null         
          }} />
    </Stack.Navigator>
  </NavigationContainer>

  );
}


export default App;

