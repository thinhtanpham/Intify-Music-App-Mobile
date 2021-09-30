import React from 'react';
import {StyleSheet, StatusBar, Button, Text} from 'react-native';
import ListMusics from './Component/ListMusics';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FullMusic from './Component/FullMusic';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';

const Stack = createNativeStackNavigator();

function App() {
return (
    <NavigationContainer>
    <StatusBar hidden={true} />
    <Stack.Navigator initialRouteName="ListMuics">
        <Stack.Screen
        name="ListMuics"
        component={ListMusics}
        options={{ headerTitle: '', headerRight: () => <FontAwesomeIcon icon={faUserCircle}/> , headerStyle: {
            backgroundColor: '#243039',
          }}}
        />
        <Stack.Screen
        name="FullMusic"
        component={FullMusic}
        options={{headerTitle: '', headerRight: () => <FontAwesomeIcon icon={faUserCircle} />, headerStyle: {
            backgroundColor: '#243039',
          }}}
        />
    </Stack.Navigator>
    </NavigationContainer>
);
}

export default App;

const optionHeader = {};

const styled = StyleSheet.create({
header: {
    backgroundColor: '#243039',
},
});
