import React from 'react'
import {StyleSheet, StatusBar, Button} from 'react-native'
import ListMusics from './Component/ListMusics'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import FullMusic from './Component/FullMusic';

const Stack = createNativeStackNavigator();
function App() {
    return (
    <NavigationContainer>
        <StatusBar hidden={true} />
        <Stack.Navigator initialRouteName="ListMuics" options={{  headerShown: false}}  >
        <Stack.Screen name="ListMuics" component={ListMusics} options={{headerShown: false}} />
        <Stack.Screen name="FullMusic" component={FullMusic}  options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
    );
}

export default App;

// const style= StyleSheet.create({
//     header:{
//         height: 200,
//         backgroundColor: "orange",
//     }
// })
