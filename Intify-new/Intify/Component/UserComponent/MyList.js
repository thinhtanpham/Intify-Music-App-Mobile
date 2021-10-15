import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native';
import MusicItem from '../MusicItem';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import refreshToken from '../../refreshToken'

export default class MyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myMusic: [],
    };
  }

  async componentDidMount() {
    try {
      const asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
      await fetch('http://10.0.2.2:3002/account/mylist', { //  http://10.0.2.2:3002/account/mylist
        headers: {
          Authorization: 'Bearer ' + asAccessTk,
        },
      })
        .then(async response => {
          if (!response.ok) {
            console.log('token het han');
            refreshToken();
            console.log('Dang lay lai token');
            try {
              asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
              await fetch('http://10.0.2.2:3002/account/mylist', {
                method: 'get',
                headers: {
                  Authorization: 'Bearer ' + asAccessTk,
                },
              }).then(async response => {
                const json = await response.json();
                this.setState({
                  myMusic: json.music,
                });
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            const json = await response.json();
            this.setState({
              myMusic: json.music,
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
          <Text style={styled.allList}>My List</Text>
          {/* <LinearGradient colors={['#FFFFFF15', '#FFFFFF01']} style={styled.scrollView}> */}
          <ScrollView>
            {(this.state.mymusic ? <Text>Ban chua dang bai nao</Text> :  this.state.myMusic.map((music, index) => (
              <MusicItem music={music} key={index} />
            )))}
          </ScrollView>
          {/* </LinearGradient> */}
        </View>
      </View>
    );
  }
}

const styled = StyleSheet.create({
  bottomArea: {
    flex: 6,
    marginLeft: 5,
    marginRight: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  topArea: {
    flex: 5,
  },
  scrollView: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '99.5%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  allList: {
    fontSize: 30,
    color: 'black',
  },
});
