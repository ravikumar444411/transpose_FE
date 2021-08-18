import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import Pie from 'react-native-pie'
import { postScan } from '../Config';
 
export const Graph = (props) =>{
    const [pending,setPending] = useState(0);
    const [complete,setComplete] = useState(0);
    const [cancel,setCancel] = useState(0);
    useEffect(()=>{
        axios.get(postScan)
            .then((res) => {
                console.log(res.data)
                var total = res.data.pending + res.data.completed + res.data.cancelled;
                setPending((res.data.pending*100)/total);
                setComplete((res.data.completed*100)/total);
                setCancel((res.data.cancelled*100)/total);
        }, (error) => {
            // alert(error);
        }); 
    },[])
    console.log(props)
    return (
           <View
            style={{
              paddingVertical: 15,
              flexDirection: 'row',
              width: 180,
              justifyContent: 'space-between',
              alignSelf:'center',
              alignItems:'center',
            //   backgroundColor:'blue'
            }}
          >
          
   {props.ispending==true && <Pie
              style={{alignSelf:'center',marginLeft:50}}
              radius={80}
              innerRadius={50}
              sections={[
                {
                  percentage: pending,
                  color: '#f02416',
                },
                {
                  percentage: 100-pending,
                  color: '#d4d4d4',
                },
              ]}
              strokeCap={'butt'}
            />}
   {props.ispending==false && <Pie
              style={{alignSelf:'center',marginLeft:50}}
              radius={80}
              innerRadius={50}
              sections={[
                {
                  percentage: complete,
                  color: 'green',
                },
                {
                  percentage: 100-complete,
                  color: '#d4d4d4',
                },
              ]}
              strokeCap={'butt'}
            />}
          </View>
    )
  
}
 
const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', height: 1050 },
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
})