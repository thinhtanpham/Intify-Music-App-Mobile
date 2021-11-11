import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import api from '../api';

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      success: true,
    };
  }

  async Login(navigation) {
    try {
      const response = await fetch('http://'+api+':5000/account/checkLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });
      if (response.status === 500) {
        this.setState({
          success: !this.state.success,
        });
        setTimeout(() => {
          this.setState({
            success: !this.state.success,
          });
        }, 4000);
      } else {
        const json = await response.json();
        try {
          await AsyncStorage.setItem(
            '@storage_accessToken',
            json.message.accessToken,
          );
          await AsyncStorage.setItem(
            '@storage_refreshToken',
            json.message.refreshToken,
          );
          navigation.replace('User');
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async Logout() {
    try {
      const response = await fetch('http://'+api+':5000/logout', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: await AsyncStorage.getItem('@storage_refreshToken'),
        }),
      });
      await AsyncStorage.removeItem('@storage_refreshToken');
      await AsyncStorage.removeItem('@storage_accessToken');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {navigation} = this.props;
    return (
      <LinearGradient colors={['#52697A', '#5A6C91']} style={{flex: 1}}>
        <Image style={styles.imgLogo} source={require('./src/img/logo2.png')} />
        <View style={styles.container}>
          <Text style={styles.warningText}>
            {' '}
            {this.state.success ? '' : '*Wrong Username or Password'}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Username"
              underlineColorAndroid="transparent"
              onChangeText={username => this.setState({username})}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({password})}
            />
          </View>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.Login(navigation)}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>

          {/* <TouchableHighlight
          style={styles.buttonContainer}
          onPress={}>
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={}>
          <Text>Register</Text>
        </TouchableHighlight> */}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  imgLogo: {
    height: 200,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
  },
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
    width: 250,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#F7FA43',
  },
  loginText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  warningText: {
    color: 'red',
    marginBottom: 5,
    fontSize: 12,
  },
});
