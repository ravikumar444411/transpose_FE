import { Container,ArrowForwardIcon } from 'native-base';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import{StyleSheet,Text,TouchableOpacity,View, ScrollView, TextInput,getPick,Image} from 'react-native';
import {getPickup} from './Config'
import { width } from 'styled-system';
import { Option } from './ScanBorcode/Option';
import { OtpPopup } from './ScanBorcode/OtpPopup';
import { Button, Modal, Center,Input, NativeBaseProvider } from "native-base"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee,faCheckCircle,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import ScanQrCode from './ScanBorcode/ScanQrCode';

const Scanbarcode = () => {
    const [data,setData] = useState("");
    // useEffect(()=>{
    //     const reqdata = {
    //         "barcodeData" : "123-456-789"
    //     }
    //     axios.post(getPickup,reqdata)
    //         .then((res) => {
    //             setData("scan data is successfully")
    //     }, (error) => {
    //         setData("Something went wring");
    //     }); 
    // })


    const handleScan=()=>{
        setData("scan data is successfully")
    }
    const handleScan2=()=>{
        setData("scan data is successfully again")
    }
    return (
    <Container style={styles.containter}>
        <View style={styles.iconbar}>
     <Image style={styles.photo1} source={require('./file/close2.png')} />
     <Image style={styles.photo2} source={require('./file/reload2.png')} />
     </View>
    <View style={styles.iconbar}>
        <TouchableOpacity style={styles.scanbtn} onPress={handleScan}><Text style={{color:'white'}}>Scan is</Text></TouchableOpacity>
        <TouchableOpacity style={styles.scanbtn2} onPress={handleScan2}><Text style={{color:'#549ee3'}}>Manually</Text></TouchableOpacity>
     </View>
     <View style={{flex: 1,backgroundColor:'green',width:280,height:500,marginTop:20,overflow:'hidden'}}>
      <ScanQrCode/>
      </View>

      {/* content start */}
      <View style={styles.mainbox}>
              <View style={styles.smallbox}>
                <Text style={styles.text1}>PEDDING</Text>
                <Text style={styles.text1}>15</Text>
              </View>
              <View style={styles.smallbox}>
                <Text style={styles.text2}>COMPLETED</Text>
                <Text style={styles.text2}>15</Text>
              </View>
              <View style={styles.smallbox}>
                <Text style={styles.text3}>CANCEL</Text>
                <Text style={styles.text3}>15</Text>
              </View>
            </View>
           {/* content end */}

      <OtpPopup/>
      <Option/>
      {/* save button */}
      <View style={styles.iconbar}>
 
        <Button  startIcon={<FontAwesomeIcon icon={faMapMarkerAlt } color="red" size={20} />} colorScheme="dark" >
         515 m
      </Button>
        <Button ml={1} startIcon={<FontAwesomeIcon icon={ faCheckCircle } color="white" size={20} />} >
         SAVE PICKUP LIST
      </Button>
     
     </View>
        {/* save button end */}
</Container>
    );
};

export default Scanbarcode;

export const styles = StyleSheet.create({
    photo1:{
        width:40,
        height:40
    },
    photo2:{
        width:30,
        height:30,
        alignSelf:'flex-end',
        marginLeft:200
    },
    scanbtn:{
        width:140,
        height:50,
        borderRadius:10,
        color:'white',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#549ee3'
    },
    scanbtn2:{
        width:160,
        height:50,
        borderRadius:10,
        color:'white',
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
    // homepage:{
    //     backgroundColor:'white',  
    //     width:300
       
    // },

    innerup:{
        flexDirection:'row',
        padding:10,
        
    },
    innerdown:{
        flexDirection:'row',
        justifyContent:'space-around',

    },
    fontvalue:{
        
        fontWeight:'700',
      
    },
    mainbox:{
        flexDirection:'row',
        marginTop:10,
        alignItems:'stretch'
      },
      smallbox:{
        flexDirection:'column',
        justifyContent:'center',
        textAlign:'justify',
        alignItems:'center',
        margin:20
      },
      text1:{
        color:'#e3bf0e'
      },
      text2:{
        color:'#1cab00'
      },
      text3:{
        color:'#ab0000'
      },
  
    });
