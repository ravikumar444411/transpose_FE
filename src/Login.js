import React, {useState} from 'react';
// import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { loginUrl } from './Config';

export default function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin=()=>{
    console.log(email,password)

    axios.post(loginUrl,{email:email, password:password})
    .then((response) => {
      navigation.navigate('dashboard');

   }, (error) => {
      // alert(error);
  }); 
  }

  
 return (

  //Native Base based Login Tab window

      <NativeBaseProvider>
          <Box flex={1}>
          {/* <Heading size="lg" color='dark.500'  > Login Tab</Heading>   */}
          </Box>
      <Box
        flex={3}
        p={2}
        w="90%"
        mx='auto'
      >
        <Heading size="lg" color='primary.500'>
          Welcome
        </Heading>
        <Heading color="muted.400" size="xs">
          Sign in to continue!
        </Heading>


        <VStack space={2} mt={5}>
          <FormControl>
            <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                Email ID
            </FormControl.Label>
            <Input value={email} onChangeText={setEmail} />
          </FormControl>
          <FormControl mb={5}>
            <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                Password
            </FormControl.Label>
            <Input type="password" value={password} onChangeText={setPassword} />
            <Link
              _text={{ fontSize: 'xs', fontWeight: '700', color:'cyan.500' }}
              alignSelf="flex-end"
              mt={1}
            >
              Forget Password?
            </Link>
          </FormControl>
          <VStack  space={2}>
          <Button colorScheme="cyan" _text={{color: 'white' }} onPress={handleLogin}>
              Login
          </Button>
          
          </VStack>
          <HStack justifyContent="center">
            <Text fontSize='sm' color='muted.700' fontWeight={400}>I'm a new user. </Text>
            <Link _text={{ color: 'cyan.500', bold: true, fontSize: 'sm' }} href="#">
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}