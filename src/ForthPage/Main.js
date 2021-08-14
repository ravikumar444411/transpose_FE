import { Container,ArrowForwardIcon } from 'native-base';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import{StyleSheet,Text,TouchableOpacity,View, ScrollView, TextInput,getPick,Image, Alert} from 'react-native';
import PickupDashboard  from './PickupDashboard';

const Main = () => {
    const [barcodeValue,setBarcodeValue] = useState("");
    const [otp,setOtp] = useState('');
    const [showline, setLine] = useState(true)

   
    return (
    <Container style={styles.containter}>
    <View style={styles.iconbar}>
        <TouchableOpacity style={[styles.scanbtn,{borderBottomColor:showline==true?'red':'white'}]}
        onPress={()=>setLine(true)} ><Text style={{color:'red'}}>Scan is</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.scanbtn2,{borderBottomColor:showline==false?'green':'white'}]} 
        onPress={()=>setLine(false)}><Text style={{color:'green'}}>Manually</Text></TouchableOpacity>
     </View>
     {showline==true && <PickupDashboard/>}

</Container>
    );
};

export default Main;

export const styles = StyleSheet.create({

    scanbtn:{
        width:140,
        height:50,
        color:'white',
        borderBottomColor:'red',
        borderBottomWidth:2,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    scanbtn2:{
        width:140,
        height:50,
        color:'white',
        borderBottomColor:'green',
        borderBottomWidth:2,
        color:'white',
        marginLeft:2,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },

    iconbar:{
        marginTop:10,
        flexDirection:'row',
        alignItems:'stretch',
        width:280,
        // backgroundColor:'green'
    },
    containter:{
        // backgroundColor:"black",
        // width:"100%",
        // margin:0,
        marginTop:10,
        marginVertical:0,
        alignSelf:'center',
    },
   
    });
