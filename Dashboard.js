import React from "react"
import { Center, Text, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { fontSize, fontWeight } from "styled-system";


  
const colors = {
  themeColor: "#4263ec",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49"
} 


const Example = () => {
  return (

    //Touch opacity
    <TouchableOpacity style={styles.main}>
      <View style={styles.normal}>
        <Text style={styles.text}>Deliveries </Text>
      </View>
      <View style={styles.normal}>
        <Text style={styles.text}>Pick Ups </Text>
      </View>
      <View style={styles.normal}>
        <Text style={styles.text}>Handover </Text>
      </View>
      <View style={styles.normal}>
        <Text style={styles.text}>Manual Sync </Text>
      </View>
      

      <View style={styles.container}>
      <View style={styles.bt1}>
      <Text style={styles.text}>Logout </Text>
          </View>
      <View style={styles.bt2}><Text style={styles.text}>Logout </Text></View>
        
      </View>

      <View style={styles.normal}>
        <Text style={styles.text}>Cash Collected </Text>
      </View>


  </TouchableOpacity>
    
  )
    }



const styles = StyleSheet.create({
  normal:{
        fontFamily:'open sans',
        fontWeight:'normal',
        fontSize:20,
        color:'#323232',
        lineHeight:24,
        marginTop:27,
        paddingTop:30,
        marginLeft:30,
        paddingBottom:30,
        backgroundColor:'white',
        width:350,
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
      paddingLeft:8,
      marginLeft:30


    },

    bt2:{
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
      paddingLeft:8,
      marginRight:30


    },

    container:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'flex-end',
    },

    main:{
      backgroundColor:'#43557D'
    }
});

export default Example;