import { Container,ArrowForwardIcon } from 'native-base';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import{StyleSheet,Text,TouchableOpacity,View, ScrollView, TextInput,getPick,Image, Alert} from 'react-native';
import PickupDashboard  from './PickupDashboard';
import { Search } from './Search';
import { SearchBar } from 'react-native-screens';
import { Graph } from './Graph';
import { faBarcode,faQrcode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native';
import Filter from './Filter';


const Main = () => {
    const [barcodeValue,setBarcodeValue] = useState("");
    const [otp,setOtp] = useState('');
    const [showline, setLine] = useState(true)
    const navigation = useNavigation();

   
    return (
    <Container style={styles.containter}>
         <ScrollView style={styles.homepage} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <View style={styles.searchbar}> 
         <Search/>    
        </View>
        <TouchableOpacity style={{width:40,height:40,backgroundColor:'white',marginTop:10}} onPress={()=>navigation.navigate('barcode')} > 
            <FontAwesomeIcon icon={faQrcode } color="black" size={25} style={{marginLeft:8,marginTop:8}} />
        </TouchableOpacity>
        <View style={styles.searchbar}> 
         <Graph ispending={showline}/>
        </View>
      
    <View style={styles.iconbar}>
        <TouchableOpacity style={[styles.scanbtn,{borderBottomColor:showline==true?'red':'white'}]}
        onPress={()=>setLine(true)} ><Text style={{color:'red'}}>Pending</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.scanbtn2,{borderBottomColor:showline==false?'green':'white'}]} 
        onPress={()=>setLine(false)}><Text style={{color:'green'}}>Completed</Text></TouchableOpacity>
     </View>
     {showline==true && <PickupDashboard/>}
     </ScrollView>

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
    searchbar:{
        width:280
    }
   
    });
