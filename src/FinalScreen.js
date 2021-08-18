

// import React in our code
import React, {createRef} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import SignatureCapture from 'react-native-signature-capture';
import { useNavigation } from '@react-navigation/native';

const FinalScreen = () => {
  const sign = createRef();
  const navigation = useNavigation();

  const saveSign = () => {
    sign.current.saveImage();
  }

  const resetSign = () => {
    sign.current.resetImage();
  };

  const _onSaveEvent = (result) => {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    alert('Signature Captured Successfully and verified');
    setTimeout(()=>{
      navigation.navigate('barcode');
    },3000)
    console.log(result.encoded);
  };

  const _onDragEvent = () => {
    // This callback will be called when the user enters signature
    console.log('dragged');
  };

  return (

    //SignatureCapture Canvas
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
         Please Signature for final verification
        </Text>
        <SignatureCapture
          style={styles.signature}
          ref={sign}
          onSaveEvent={_onSaveEvent}
          onDragEvent={_onDragEvent}
          showNativeButtons={false}
          showTitleLabel={false}
          viewMode={'portrait'}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={saveSign}>
            <Text>Save</Text>
          </TouchableOpacity>
          <TouchableHighlight
            style={styles.buttonStyle}
            onPress={resetSign}>
            <Text>Reset</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default FinalScreen;

//Styles CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#eeeeee',
    margin: 10,
  },
});