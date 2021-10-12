import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import refreshToken from '../../refreshToken';

export default class InfomationUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };
  }

  async componentDidMount() {
    try {
      const asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
      await fetch('http://10.0.2.2:3002/account/', {
        headers: {
          Authorization: 'Bearer ' + asAccessTk,
        },
      })
        .then(async response => {
          const json = await response.json();
            this.setState({
              user: json.user,
            })
          if (!response.ok) {
            console.log('token het han');
            refreshToken();
            console.log('Dang lay lai token');
            try {
              const asAccessTk = await AsyncStorage.getItem(
                '@storage_accessToken',
              );
              await fetch('http://10.0.2.2:3002/account/', {
                method: 'get',
                headers: {
                  Authorization: 'Bearer ' + asAccessTk,
                },
              }).then(async response => {
                const json = await response.json();
                this.setState({
                  user: json.user,
                });
              });
            } catch (error) {
              console.log(error);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }


  Logout = async () => {
    const {navigation} = this.props
    try {
      const response = await fetch('http://10.0.2.2:5000/logout', {
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
      console.log(await AsyncStorage.getItem('@storage_accessToken'));
      navigation.goBack()
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View>
        <Text>{this.state.user.username}</Text>
        <Text>{this.state.user.nameApp}</Text>
        <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={this.Logout}>
        <Text style={styles.buttonTextStyle}>Logout</Text>
      </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    buttonStyle: {
      backgroundColor: '#307ecc',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#307ecc',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 15,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
    textStyle: {
      backgroundColor: '#fff',
      fontSize: 15,
      marginTop: 16,
      marginLeft: 35,
      marginRight: 35,
      textAlign: 'center',
    },
    inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius: 30,
      borderBottomWidth: 1,
      width: 250,
      height: 45,
      marginBottom: 20,
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
  });
  