import React, {useState} from 'react';
import {StyleSheet, StatusBar, Button, Text} from 'react-native';
import ListMusics from './Component/ListMusics';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FullMusic from './Component/FullMusic';
import ListMusicsArtist from './Component/ListMusicsArtist'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import LoginView from './Component/Login';
import UploadMusic from './Component/UserComponent/UploadMusic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from './Component/User';
import {Provider as StoreProvider} from 'react-redux';
import rootStore from './Redux/store';
import Context from './Component/Context'

const Stack = createNativeStackNavigator();


function App() {
  const [isPlaying, setPlaying] = useState({});
  return (
    <StoreProvider store={rootStore}>
      <NavigationContainer>
        <Context.Provider
          value={{
            isPlaying: isPlaying,
            setMusicPlaying: isPlaying => { 
              setPlaying(isPlaying)
            }
          }}>
          <StatusBar hidden={true} />
          <Stack.Navigator initialRouteName="ListMusics">
            <Stack.Screen
              name="ListMusics"
              component={ListMusics}
              isPlaying={({params}) => params}
              options={({navigation}) => ({
                headerTitle: '',
                headerRight: () => (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    onPress={async () => {
                      try {
                        const asAccessTk = await AsyncStorage.getItem(
                          '@storage_accessToken',
                        );
                        asAccessTk
                          ? navigation.navigate('User')
                          : navigation.navigate('Login');
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    style={styles.icon}
                    size={25}
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
                headerTitle: "",
                headerTintColor: "white",
                headerRight: () => (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    onPress={async () => {
                      try {
                        const asAccessTk = await AsyncStorage.getItem(
                          '@storage_accessToken',
                        );
                        asAccessTk
                          ? navigation.navigate('User')
                          : navigation.navigate('Login');
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    style={styles.icon}
                    size={25}
                  />
                ),
                headerStyle: {
                  backgroundColor: '#243039',
                },
              })}
            />
            <Stack.Screen
              name="Login"
              component={LoginView}
              options={{headerStyle: {backgroundColor: '#243039'},
              headerTitleStyle: {color: "white"},
              headerTintColor: "white"
            }}
            />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="ListMusicsArtist" component={ListMusicsArtist}
            options={{headerStyle: {backgroundColor: '#243039'}, headerTitle: "", headerTintColor: "white"}}
            />
          </Stack.Navigator>
        </Context.Provider>
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
    backgroundColor: '#587788',
  },
  icon: {
    color: 'white',
  },
});
