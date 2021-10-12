import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import { rePlaying } from '../Redux/Action/isPlayingAction';


function MusicItem (props) {

    const {music, navigation} = props;
    return (
      <TouchableOpacity onPress={()=> {
        props.addRePlaying(music)
        navigation.push('FullMusic')
        }} >
      <View style={style.itemView} >
        <View>
          <Image source={{uri: music.img}} style={style.img}></Image>
        </View>
        <View style={style.itemContent}>
          <Text style={style.titleNameSong}>{music.nameSong}</Text>
          <Text style={style.titleNameArtist}>{music.nameArtist}</Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  
    
}

const mapDispatchToProps=(dispatch) => {
  return{
    addRePlaying: (music) => {
      dispatch(rePlaying(music))
    }
  }
}

const style = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 3,
    width: 378,
    height: 90,
  },
  itemContent: {
    flexDirection: 'column',
    margin: 5,
    top: 14,
    left: 14
  },
  img: {
    top: 8,
    left: 10,
    height: 80,
    width: 80,
    borderRadius: 5,
  },
  titleNameSong:{
    color: "white",
    fontSize: 20
  },
  titleNameArtist:{
    color: "white",
    fontSize: 15
  }
});

export default connect(null, mapDispatchToProps)(MusicItem)