import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar,TouchableOpacity,Animated, Pressable} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import {NativeBaseProvider,Box, Text} from 'native-base';
import Constants from 'expo-constants';

//Tab Routes

const FirstRoute = () => (
  <Box flex={1} bg="pink.400" />
);

const SecondRoute = () => (
  <Box flex={1} bg="violet.400"  />
);

const ThirdRoute = () => (
  <Box flex={1} bg="red.400"  />
);

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export default function TabViewExample() {

//Setting const routes/tabs



  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third' },
  ]);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            //Primary Function that will export in every tab i.e. Dynamic
            <Box
             flex = {1}
              alignItems= 'center'
              p= {2}
              
             >
            <Pressable

              onPress={() => {
                console.log(i);
                setIndex(i);}}>
               <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </Pressable>
            </Box>

          );
        })}
      </Box>
    );
  };

  return (
    //TabView Overview
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{marginTop: StatusBar.currentHeight}}
    />
    </NativeBaseProvider>
  );
}
