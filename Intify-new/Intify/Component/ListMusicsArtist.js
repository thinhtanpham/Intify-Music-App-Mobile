import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Button, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import api from '../api'
import MusicItem from './MusicItem';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';

export default class ListMusicsArtist extends Component {

  constructor(){
    super()
    this.state={
      musicsOfArt: []
    }
  }

  async componentDidMount() {
    try {
      await fetch('http://'+ api +':3002/musics/'+this.props.route.params.id)
      .then(async res => {
        const resJson = await res.json()
        this.setState({
          musicsOfArt: resJson.musics
        })
      })
      .catch(error => console.error(error))
    } catch (error) {
      console.error(error);
    }
  }

  renderFullLyrics(params) {
    return (
      <>
        <LinearGradient
          colors={['#FFFFFF21', '#FFFFFF00']}
          style={styles.area_Lyric}>
          <View style={{flex: 1, }}>
            {params.imgArtist ? <Image source={{uri: params.imgArtist}} style={styles.img}></Image> :  <FontAwesomeIcon
            style={styles.img}
            icon={faUserCircle}
            size={150}
          />}
          <Text style={styles.name}>{params.nameApp}</Text>
          </View>
          <View style={styles.listMusics}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {this.state.musicsOfArt.map((music, index) => 
                <MusicItem key={index} music={music} navigation={this.props.navigation}  />
              )}
            </ScrollView>
          </View>
        </LinearGradient>
      </>
    );
  }

  render() {
    const {params} = this.props.route;
    return (
      <View style={styles.mainFullLyrics}>
        <View style={styles.mainTop}></View>
        <View style={styles.mainBot}>
          {this.renderFullLyrics(params)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainFullLyrics: {
    backgroundColor: '#364855',
    flex: 1,
  },
  mainTop: {
    flex: 1,
  },
  mainBot: {
    flex: 4,
  },
  img: {
    top: -100,
    height: 160,
    width: 160,
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#307ecc',
  },
  area_Lyric: {
    marginLeft: 'auto',
    marginRight: 'auto',
    flex: 1,
    width: '95%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  listMusics: {
    flex: 4
  },
  name: {
    color: "white",
    top: -90,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});
