import React from 'react';
import {StyleSheet, StatusBar, Button, Text} from 'react-native';
import ListMusics from './Component/ListMusics';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FullMusic from './Component/FullMusic';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserCircle, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import LoginView from './Component/Login';
import UploadMusic from './Component/UserComponent/UploadMusic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from './Component/User';
import { Provider as StoreProvider } from 'react-redux'
import rootStore from './Redux/store';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <StoreProvider store={rootStore}>
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
                    (asAccessTk ? navigation.navigate('User') : navigation.navigate('Login') )
                  } catch (error) {
                    console.log(error)
                  }
                }}
                style={styles.icon}
                size={15}
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
            headerBackVisible: true,
            headerTitle: () => (
              <FontAwesomeIcon
              title=""
              icon={faArrowLeft}
              onPress={() => navigation.goBack()}
              style={styles.icon}
              size={15}
            />
            ),
            headerRight: () => (
              <FontAwesomeIcon
              icon={faUserCircle}
              onPress={async () => {
                try {
                  const asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
                  (asAccessTk ? navigation.navigate('User') : navigation.navigate('Login') )
                } catch (error) {
                  console.log(error)
                }
              }}
              style={styles.icon}
              size={15}
            />
            ),
            headerStyle: {
              backgroundColor: '#243039',
            },
          })}
        />
        <Stack.Screen name="Login" component={LoginView} options={{headerStyle:{ backgroundColor: '#364855'} }}/>
        <Stack.Screen name="User" component={User}/>
      </Stack.Navigator>
    </NavigationContainer>
    </StoreProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#243039',
  },
  headerLogin: {
    backgroundColor: '#587788'
  },
  icon: {
    color: '#C4C4C4',
  }
});
