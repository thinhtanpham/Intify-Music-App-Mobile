import React from 'react';
import {StyleSheet, StatusBar, Button, Text} from 'react-native';
import ListMusics from './Component/ListMusics';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FullMusic from './Component/FullMusic';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import LoginView from './Component/Login';
import UploadMusic from './Component/UploadMusic';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Stack.Navigator initialRouteName="ListMuics">
        <Stack.Screen
          name="ListMuics"
          component={ListMusics}
          options={({navigation}) => ({
            headerTitle: '',
            headerRight: () => (
              <FontAwesomeIcon
                icon={faUserCircle}
                onPress={async () => {
                  try {
                    const asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
                    (asAccessTk ? navigation.navigate('UploadMusic') : navigation.navigate('Login') )
                  } catch (error) {
                    console.log(error)
                  }
                }}
              />
            ),
            headerStyle: {
              backgroundColor: '#243039',
            },
          })}
        />
        <Stack.Screen
          name="FullMusic"
          component={FullMusic}
          options={({navigation}) => ({
            headerTitle: '',
            headerRight: () => (
              <FontAwesomeIcon
              icon={faUserCircle}
              onPress={async () => {
                try {
                  const asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
                  (asAccessTk ? navigation.navigate('UploadMusic') : navigation.navigate('Login') )
                } catch (error) {
                  console.log(error)
                }
              }}
            />
            ),
            headerStyle: {
              backgroundColor: '#243039',
            },
          })}
        />
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="UploadMusic" component={UploadMusic} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styled = StyleSheet.create({
  header: {
    backgroundColor: '#243039',
  },
});
