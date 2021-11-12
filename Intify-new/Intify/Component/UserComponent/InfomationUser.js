import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import refreshToken from '../../refreshToken';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import DocumentPicker from 'react-native-document-picker';
import api from '../../api';

export default class InfomationUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      imgUpload: {},
    };
  }

  async callApiInfo() {
    try {
      const asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
      await fetch('http://' + api + ':3002/account/', {
        headers: {
          Authorization: 'Bearer ' + asAccessTk,
        },
      })
        .then(async response => {
          const json = await response.json();
                this.setState({
                  user: json.user,
                });
        })
        .catch(async error => {
            await refreshToken();
            try {
              const newAssTk = await AsyncStorage.getItem('@storage_accessToken');
              await fetch('http://' + api + ':3002/account/', {
                method: 'get',
                headers: {
                  Authorization: 'Bearer ' + newAssTk,
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
          });
    } catch (error) {
      console.log(error);
    }
  }
  
  async componentDidMount() {
    this.callApiInfo();
  }

  async chooseImgAvatar() {
    try {
      const res = await DocumentPicker.pick({
        type: DocumentPicker.types.images,
      });
      const data = new FormData();
      data.append('imgArtist', {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
      });
      try {
        const asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
        await fetch('http://' + api + ':3002/account/add/imgArtist', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            type: 'formData',
            Authorization: 'Bearer ' + asAccessTk,
          },
          body: data,
        })
          .then(async response => {
            if (!response.ok) {
              refreshToken();
              try {
                const asAccessTk = await AsyncStorage.getItem(
                  '@storage_accessToken',
                );
                await fetch('http://' + api + ':3002/account/add/imgArtist', {
                  method: 'post',
                  headers: {
                    Accept: 'application/json',
                    type: 'formData',
                    Authorization: 'Bearer ' + asAccessTk,
                  },
                  body: data,
                }).then();
              } catch (err) {
                console.log(err);
              }
            }
          })
          .catch(error => console.log(error));
      } catch (error) {
        console.log(error);
      }
      this.callApiInfo();
    } catch (error) {
      console.log(error);
    }
  }

  Logout = async () => {
    const {navigation} = this.props;
    const reAccessTk = await AsyncStorage.getItem('@storage_refreshToken');
    try {
      await fetch('http://' + api + ':5000/logout', {
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
      navigation.navigate('ListMusics');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View>
        <StatusBar hidden={false}  animated={true}
        backgroundColor="white"
        barStyle="dark-content"/>
        {this.state.user.imgArtist ? (
          <TouchableOpacity style={styles.touch}  onPress={() => this.chooseImgAvatar()}>
            <Image
              style={styles.imgAva}
              source={{uri: this.state.user.imgArtist}}/>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.touch} onPress={() => this.chooseImgAvatar()}>
            <FontAwesomeIcon
              style={styles.avatar}
              icon={faUserCircle}
              size={200}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.name}>{this.state.user.nameApp}</Text>
        <ScrollView style={{height: 250}}>
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
  touch:{
    height: 200,
    width: 200,
    borderRadius: 200 / 2,
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    height: 45,
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#52697A',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#307ecc',
  },
  imgAva: {
    height: 200,
    width: 200,
    borderWidth: 2,
    borderRadius: 200 / 2,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  fieldInfo: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  areaInfo: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
