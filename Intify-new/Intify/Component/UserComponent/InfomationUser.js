import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import refreshToken from '../../refreshToken';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';

export default class InfomationUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  async componentDidMount() {
    try {
      const asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
      await fetch('http://10.0.2.2:3002/account/', { //http://10.0.2.2:3002/account/
        headers: {
          Authorization: 'Bearer ' + asAccessTk,
        },
      })
        .then(async response => {
          if (!response.ok) {
              refreshToken();
              try {
                asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
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
            } else {
              const json = await response.json();
                  this.setState({
                    user: json.user,
                  });
            }
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error);
    }
  }


  Logout = async () => {
    const {navigation} = this.props
    const reAccessTk= await AsyncStorage.getItem('@storage_refreshToken')
    try {
      const response = await fetch('http://10.0.2.2:5000/logout', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: reAccessTk,
        }),
      });
      await AsyncStorage.removeItem('@storage_refreshToken');
      await AsyncStorage.removeItem('@storage_accessToken');
      navigation.navigate('ListMusics')
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View>
        {/* <Image style={styles.avatar}/> */}
        <FontAwesomeIcon style={styles.avatar} icon={faUserCircle} size={120}/>
        <Text style={styles.name}>{this.state.user.nameApp}</Text>
        <ScrollView style={{height: 300}}>
          <View style={styles.areaInfo}>
            <Text style={styles.fieldInfo}>Account:</Text>
            <Text>{this.state.user.username}</Text>
          </View>
          <View style={styles.areaInfo}>
            <Text style={styles.fieldInfo}>Day Created:</Text>
            <Text>{this.state.user.dayCreate}</Text>
          </View>
          
          
        </ScrollView>
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
    name: {
      marginBottom: 30,
      fontSize: 30,
      fontWeight: "bold",
      textAlign: 'center',
    },
    avatar: {
      height: 150,
      width: 150,
      marginTop: 50,
      marginBottom: 50,
      marginLeft: "auto",
      marginRight: "auto",
      color: "#5A8991"
    },
    fieldInfo: {
      marginBottom: 10,
      fontSize: 15,
      fontWeight: "bold"
    },
    areaInfo:{
      marginLeft: 30,
      marginRight: 30,
      marginBottom: 30,
      borderBottomWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between"
    }
  });
  