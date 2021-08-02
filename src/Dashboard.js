import React from "react"
import { Center, Text, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { fontSize, fontWeight, marginLeft, marginRight, paddingRight, right } from "styled-system";
import axios from 'axios'
import { Container,SmallCloseIcon,ArrowForwardIcon, NativeBaseProvider } from 'native-base';

import { useNavigation } from '@react-navigation/native';
  
const colors = {
  themeColor: "#4263ec",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49"
} 


const Example = () => {

  const[data, setData] = React.useState({})

  const navigation = useNavigation();


  axios.get('https://backend-api-application.herokuapp.com/menu/getMenu')
  .then((response) => {
    setData(response.data)

 }, (error) => {
    // alert(error);
}); 

  return (

    //Touch opacity
    <NativeBaseProvider>
      <TouchableOpacity style={styles.main} onPress={()=>navigation.navigate('pickup')}>
      <View style={styles.normal}>
        <Text style={styles.text}>Deliveries                  {data.deliveries} Pending</Text><ArrowForwardIcon style={{color:"#67a4f5",marginLeft:290,marginTop:-27}}/>
      </View></TouchableOpacity>
      <TouchableOpacity style={styles.main} onPress={()=>navigation.navigate('pickup')}>
      <View style={styles.normal}>
        <Text style={styles.text}>Pick Ups                      {data.pickUp} Pending</Text><ArrowForwardIcon style={{color:"#67a4f5",marginLeft:290,marginTop:-27}}/>
      </View></TouchableOpacity>
      <TouchableOpacity style={styles.main}>
      <View style={styles.normal}>
        <Text style={styles.text}>Handover                     {data.handOver} Pending</Text><ArrowForwardIcon style={{color:"#67a4f5",marginLeft:290,marginTop:-27}}/>
      </View></TouchableOpacity>
      <TouchableOpacity style={styles.main}>
      <View style={styles.normal}>
        <Text style={styles.text}>Manual Sync </Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.main}>
      <View style={styles.container}>
      <View style={styles.bt1}>
      <Text style={styles.text}>translate</Text>
          </View>
      <View style={styles.bt2}><Text style={styles.text}>logout</Text></View>
      </View>
</TouchableOpacity>
<TouchableOpacity style={styles.main}>
      <View style={styles.normal1}>
        <Text style={styles.text}>Cash Collected                     {data.price} ₹</Text>
      </View></TouchableOpacity>


  </NativeBaseProvider>
    
  )
    }


const styles = StyleSheet.create({
  normal:{
        fontFamily:'open sans',
        fontWeight:'normal',
        fontSize:20,
        color:'#323232',
        marginTop:27,
        paddingTop:30,
        marginLeft:30,
        marginRight:30,
        paddingBottom:30,
        backgroundColor:'white',
        width:'auto',
        borderRadius:10
    },
    normal1:{
      fontFamily:'open sans',
      fontWeight:'normal',
      fontSize:20,
      color:'#323232',
      lineHeight:24,
      marginTop:77,
      marginBottom:60,
      paddingTop:30,
      marginLeft:30,
      marginRight:30,
      paddingBottom:30,
      backgroundColor:'white',
      width:'auto',
      borderRadius:10
  },
    text:{
      paddingLeft:30,
      color:'#000000',
      fontWeight:'bold',
      fontSize:18

    },

    bt1:{
      fontFamily:'open sans',
      color:'#000000',
      fontWeight:'bold',
      fontSize:18,
      lineHeight:10,
      marginTop:27,
      paddingTop:30,
      paddingBottom:30,
      backgroundColor:'white',
      width:125,
      borderRadius:10,
      paddingLeft:5,
      marginLeft:30


    },

    bt2:{
      fontFamily:'open sans',
      color:'#000000',
      fontWeight:'bold',
      fontSize:18,
      lineHeight:10,
      marginTop:-83,
      paddingTop:30,
      paddingBottom:30,
      backgroundColor:'white',
      width:125,
      borderRadius:10,
      paddingLeft:8,
      marginLeft:230


    },

    main:{
      backgroundColor:'#43557D'
    }
});

export default Example;