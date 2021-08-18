import { Container,ArrowForwardIcon } from 'native-base';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import{StyleSheet,Text,TouchableOpacity,View, ScrollView, TextInput,getPick,Image, Alert} from 'react-native';
import {getPickup, getValidate, postScan} from './Config'
import { width } from 'styled-system';
import { Option } from './ScanBorcode/Option';
import { OtpPopup } from './ScanBorcode/OtpPopup';
import { Button, Center,Input, Modal } from "native-base"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee,faCheckCircle,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import ScanQrCode from './ScanBorcode/ScanQrCode';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

const Scanbarcode = () => {
    const [barcodeValue,setBarcodeValue] = useState("");
    const [otp,setOtp] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [pending, setPending] = useState(0)
    const [complete, setComplete] = useState(0)
    const [cancel, setCancel] = useState(0)
    const navigation = useNavigation();


    
    useEffect(()=>{
        axios.get(postScan)
            .then((res) => {
                console.log(res.data)
                setPending(res.data.pending)
                setComplete(res.data.completed)
                setCancel(res.data.cancelled)
        }, (error) => {
            console.log(error);
        }); 
    },[refresh])

// for otp
const reSendHandle=()=>{
console.log(otp)

    axios.post(getValidate,{barcodeData:barcodeValue,otp:otp})
    .then((response) => {
    console.log(response)
    if(response.status==200){
      setShowModal(false);
      alert(response.data.msg)
      setRefresh(refresh)
    }
    }, (error) => {
      console.log(error);
    });
}

    //POST Backend API

   const onSuccess = e => {
        console.log(e.data)
      
        
    axios.post(postScan,{barcodeData:e.data})
    .then((response) => {
     console.log(response.data.otp)

     if(response.status==201){
         setBarcodeValue(e.data)
         setShowModal(true)
         navigation.navigate('sign');

     }

   }, (error) => {
      console.log(error);
  }); 
      };
    return (
    <Container style={styles.containter}>
        <View style={styles.iconbar}>
     <Image style={styles.photo1} source={require('./file/close2.png')} />
     <Image style={styles.photo2} source={require('./file/reload2.png')} />
     </View>
    <View style={styles.iconbar}>
        <TouchableOpacity style={styles.scanbtn} ><Text style={{color:'white'}}>Scan is</Text></TouchableOpacity>
        <TouchableOpacity style={styles.scanbtn2} ><Text style={{color:'#549ee3'}}>Manually</Text></TouchableOpacity>
     </View>
     <View style={{flex: 1,width:280,height:500,marginTop:20,overflow:'hidden'}}>
     <QRCodeScanner
        onRead={onSuccess}
        containerStyle={{flex: 1,width:280,height:500,marginTop:20}}
        // flashMode={false}
        // flashMode={RNCamera.Constants.FlashMode.torch}

      />
      </View>

      {/* content start */}
      <View style={styles.mainbox}>
              <View style={styles.smallbox}>
                <Text style={styles.text1}>PEDDING</Text>
                <Text style={styles.text1}>{pending}</Text>
              </View>
              <View style={styles.smallbox}>
                <Text style={styles.text2}>COMPLETED</Text>
                <Text style={styles.text2}>{complete}</Text>
              </View>
              <View style={styles.smallbox}>
                <Text style={styles.text3}>CANCEL</Text>
                <Text style={styles.text3}>{cancel}</Text>
              </View>
            </View>
           {/* content end */}

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



        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Otp</Modal.Header>
          <Modal.Body>
          <Input
                w="100%"
                mx={3}
                placeholder="Enter otp here"
                _light={{
                    placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                    placeholderTextColor: "blueGray.50",
                }}
                onChangeText={(text)=>setOtp(text)}
                />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button  colorScheme="danger">Resend Otp</Button>
              <Button  colorScheme="success" onPress={reSendHandle } >  Save </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

</Container>
    );
};

export default Scanbarcode;

//Styles CSS

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
