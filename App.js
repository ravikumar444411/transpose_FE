import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
import Login from './src/Login';
import Pickup from './src/Pickup';
import Dashboard from './src/Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Scanbarcode from './src/Scanbarcode';
import PickupDashboard from './src/ForthPage/PickupDashboard';
import Main from './src/ForthPage/Main';
import FinalScreen from './src/FinalScreen';

const Stack = createStackNavigator();

function App() {
  return (

  <NativeBaseProvider>
    <NavigationContainer>
    <Stack.Navigator  initialRouteName={'main'}>
      <Stack.Screen name="Login" component={Login}   
        options={{ 
            header:()=>null         
          }} />
      <Stack.Screen name="dashboard" component={Dashboard}   
        options={{ 
            header:()=>null         
          }} />
      <Stack.Screen name="pickup" component={Pickup}   
        options={{ 
            header:()=>null         
          }} />
      <Stack.Screen name="barcode" component={Scanbarcode}   
        options={{ 
            header:()=>null         
          }} />
      <Stack.Screen name="main" component={Main}   
        options={{ 
            header:()=>null         
          }} />
      <Stack.Screen name="sign" component={FinalScreen}   
        options={{ 
            header:()=>null         
          }} />
    </Stack.Navigator>
  </NavigationContainer>
</NativeBaseProvider>    



  );
}


export default App;
