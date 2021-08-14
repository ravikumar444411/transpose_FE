import { Container,ArrowForwardIcon } from 'native-base';
import React, { useEffect, useState, Component } from 'react';
import axios from 'axios'
import{StyleSheet,Text,TouchableOpacity,View, ScrollView,TextInput,getPick} from 'react-native';
import {getShipments} from '../Config';
// import TabMenu from '../TabMenu';
// import Pie from 'react-native-pie';
// import SearchBar from './SearchBar';
// import TabMenuExample from './TabMenu';



//GET DATA from Pickup API

const PickupDashboard = () => {
  
    const [data,setData] = useState([]);
    useEffect(()=>{
        axios.get(getShipments)
            .then((res) => {
                setData(res.data)
        }, (error) => {
            // alert(error);
        }); 
    })


 
    //Main page
    
    return (


    <Container style={styles.containter}>
      
    <Text style={{marginTop:-20},styles.fontvalue}>PENDING()</Text>
    {/* <SearchBar /> */}



        <ScrollView style={styles.homepage} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
         {data.map((single,index)=>(
                <View key={index} style={styles.mainbox}>
                    <TouchableOpacity>
                      <View style={styles.innerup}>
                          <Text style={styles.fontvalue}>{single.code}</Text>
                          <ArrowForwardIcon style={{color:"#6DB1E1",marginLeft:180,marginTop:-5}} />
                      </View>
                      <View style={styles.innerdown}>
                          <Text style={styles.fontvalue}>Seller</Text>
                          <Text style={styles.fontvalue}>{single.seller}</Text>
                      </View>
                      <View style={styles.innerdown}>
                          <Text style={styles.fontvalue}>Address</Text>
                          <Text style={styles.fontvalue}>{single.address}</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.outerdown}>
                      <View style={styles.outer1}><Text style={{color:'#6DB1E1',fontWeight:'700'}}>CALL CUSTOMER</Text></View>
                      <View style={styles.outer1}><Text style={{color:'#6DB1E1',fontWeight:'700'}}>GET DIRECTIONS</Text></View>
                  </View>
              </View>
        ))}

        </ScrollView>
            </Container>
    );
};

export default PickupDashboard;

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
        height:'auto',
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
        justifyContent:'space-around',
        padding:10,
        
    },
    innerdown:{
        flexDirection:'row',
        justifyContent:'space-around',
        paddingVertical:10


    },
    outerdown:{
        flexDirection:'row',
        justifyContent:'space-around',
        paddingVertical:15,
        borderTopWidth:2,
        borderColor: '#F4F4F4',


    },
    fontvalue:{
        
        fontWeight:'700',
      
    },

    container69: { alignItems: 'center', justifyContent: 'center', height: 250 },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },
       
 
 });
