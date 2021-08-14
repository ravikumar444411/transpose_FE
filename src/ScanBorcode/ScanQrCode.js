import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { View } from 'native-base';


export default class ScanQrCode extends Component {
  onSuccess = e => {
    console.log(e.data)
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };

  render() {
    return (
      <View >
      <QRCodeScanner
        onRead={this.onSuccess}
        containerStyle={{flex: 1,backgroundColor:'green',width:280,height:500,marginTop:20}}
        // flashMode={false}
        // flashMode={RNCamera.Constants.FlashMode.torch}

      />
      </View>
  
    );
  }
}

