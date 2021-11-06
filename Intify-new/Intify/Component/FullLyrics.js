import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Button, ScrollView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowUp,
  faBackward,
  faHeart,
  faIgloo,
} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import { getListMusic } from '../Server';

state={
  list:[]
}

export default class FullLyrics extends Component {

  componentDidMount(){
    getListMusic()
    .then(music => this.setState({list: music}))
    .catch(error => console.log(error))
  }

  renderImage() {
    return (
      <>
        <Image
          source={}
          style={style.img}></Image>
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={style.icon}></FontAwesomeIcon>
      </>
    );
  }

  renderFullLyrics() {
    return (
      <>
        <LinearGradient
          colors={['#FFFFFF21', '#FFFFFF00']}
          style={style.area_Lyric}>
          <View style={style.btn_area_lyric}>
            <Text></Text>
            <FontAwesomeIcon icon={faHeart} style={style.icon}>
              {' '}
            </FontAwesomeIcon>
          </View>
          <View style={style.lyric}>
            <ScrollView>
              <Text></Text>
            </ScrollView>
          </View>
        </LinearGradient>
      </>
    );
  }

  render() {
    return (
      <View style={style.mainFullLyrics}>
        <View style={style.mainTop}>{this.renderImage()}</View>
        <View style={style.mainBot}>{this.renderFullLyrics()}</View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  mainFullLyrics: {
    backgroundColor: '#414B53',
    height: '100%',
  },
  mainTop: {
    height: '35%',
  },
  mainBot: {
    height: '65%',
  },
  img: {
    height: 160,
    width: 160,
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  area_Lyric: {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%',
    width: '95%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  btn_area_lyric: {
    backgroundColor: 'orange',
  },
  lyric: {
    height: '70%',
    backgroundColor: 'red',
  },
  icon: {
    color: '#C4C4C4',
  },
});
