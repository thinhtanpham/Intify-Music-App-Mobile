import React, {Component} from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';

export default class SmallPlaying extends Component {

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return true;
    }
    return false;
  }

  render() {
    const music = this.props.isPlaying;
    if (this.isEmpty(music)) {
      return (
        <TouchableOpacity
          onPress={() => {
            //   props.addRePlaying(music);
            //   navigation.navigate('FullMusic');
          }}
          style={{zIndex: 2, backgroundColor: 'red'}}>
          <View style={style.itemView}>
            <View>
              {/* <Image source={{uri: music.img}} style={style.img}></Image> */}
            </View>
            <View style={style.itemContent}>
              <Text style={style.titleNameSong}>{music.nameSong}</Text>
              <Text style={style.titleNameArtist}>{music.nameArtist}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <></>;
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
    left: 14,
  },
  img: {
    top: 8,
    left: 10,
    height: 80,
    width: 80,
    borderRadius: 5,
  },
  titleNameSong: {
    color: 'white',
    fontSize: 20,
  },
  titleNameArtist: {
    color: 'white',
    fontSize: 15,
  },
});
