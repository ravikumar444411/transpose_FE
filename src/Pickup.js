import { Container,ArrowForwardIcon } from 'native-base';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import{StyleSheet,Text,TouchableOpacity,View, ScrollView, TextInput,getPick} from 'react-native';
import {getPickup} from './Config'
import { useNavigation } from '@react-navigation/native';

//Main Box or Pickup Window container-Static

const Mainbox =()=>{
    return <TouchableOpacity style={styles.mainbox}>
    <View style={styles.innerup}>
        <Text style={styles.fontvalue}>PRS/PCOKHBAB/1222/001888</Text>
        <ArrowForwardIcon style={{color:"#67a4f5",marginLeft:40,marginTop:-5}} />
    </View>
    <View style={styles.innerdown}>
        <Text style={styles.fontvalue}>Seller</Text>
        <Text style={styles.fontvalue}>4</Text>
        <Text style={styles.fontvalue}>Shipment</Text>
        <Text style={styles.fontvalue}>164</Text>
    </View>
</TouchableOpacity>
}
const Pickup = () => {
    const [data,setData] = useState([]);
    const navigation = useNavigation();
    useEffect(()=>{
        axios.get(getPickup)
            .then((res) => {
                setData(res.data)
        }, (error) => {
            // alert(error);
        }); 
    })

    //Pickup Dashboard Dyanmic tab and data allocation

    return (
    <Container style={styles.containter}>
      
    <Text style={{marginTop:-20},styles.fontvalue}>please select a pickup to work on</Text>
        <ScrollView style={styles.homepage} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            {data.map(single=>(
            <TouchableOpacity style={styles.mainbox} onPress={()=> navigation.navigate('main')}>
            <View style={styles.innerup}>
                <Text style={styles.fontvalue}>{single.title}</Text>
                <ArrowForwardIcon style={{color:"#67a4f5",marginLeft:180,marginTop:-5}} />
            </View>
            <View style={styles.innerdown}>
                <Text style={styles.fontvalue}>Seller</Text>
                <Text style={styles.fontvalue}>{single.date.substr(0,10)}</Text>
                <Text style={styles.fontvalue}>Shipment</Text>
                <Text style={styles.fontvalue}>{single.shipments}</Text>
            </View>
        </TouchableOpacity>
        ))}
            
        </ScrollView>
            </Container>
    );
};

export default Pickup;

//Styles CSS

export const styles = StyleSheet.create({
    containter:{
        // backgroundColor:"black",
        // width:"100%",
        // margin:0,
        marginTop:30,
        marginVertical:0,
        alignSelf:'center',
    },
    // homepage:{
    //     backgroundColor:'white',  
    //     width:300
       
    // },
    mainbox:{
        width: 280,
        height:80,
        backgroundColor:'white',
        alignSelf:'center',
        marginVertical:20,
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 1,
        // marginHorizontal:500
    },
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
      
    }
  
    });
