import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import { rePlaying } from '../Redux/Action/isPlayingAction';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

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
          <Text style={style.titleNameSong}>{music.nameSong.length > 18 ? music.nameSong.slice(0,18).concat("...") : music.nameSong}</Text>
          <Text style={style.titleNameArtist}>{music.nameArtist.length > 30 ? music.nameArtist.slice(0,30).concat("...") : music.nameArtist}</Text>
        </View>
        <FontAwesomeIcon icon={faHeart} style={style.icon} size={18} />
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
    justifyContent: 'space-between',
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 3,
    width: 378,
    height: 90,
  },
  itemContent: {
    marginBottom: "auto",
    marginTop: "auto",
    flexDirection: 'column',
    textAlign: 'center',
  },
  img: {
    top: 8,
    left: 10,
    height: 80,
    width: 80,
    borderRadius: 5,
  },
  titleNameSong:{
    textAlign:"center",
    color: "white",
    fontSize: 19,
    fontWeight: "bold"
  },
  titleNameArtist:{
    textAlign:"center",
    color: "white",
    fontSize: 15
  },
  icon:{
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: 20,
    color: '#C4C4C4',
  }
});

export default connect(null, mapDispatchToProps)(MusicItem)