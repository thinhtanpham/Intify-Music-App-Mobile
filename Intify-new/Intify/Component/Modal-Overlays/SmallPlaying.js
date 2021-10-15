import React, {Component} from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPauseCircle,
  faPlayCircle,
} from '@fortawesome/free-solid-svg-icons';
import Context from '../Context';

export default class SmallPlaying extends Component {

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return true;
    }
    return false;
  }

  render() {
    const {music} = this.props
    if (this.isEmpty(music)) {
      return (
          <View style={style.itemView}>
            <View style={{marginBottom: 'auto',marginTop: 'auto'}}>
              <Image source={{uri: music.img}} style={style.img}></Image>
            </View>
            <View style={style.itemContent}>
              <View style={{flexDirection:'row', flex: 1}}>
                <Text style={style.titleNameSong}>{music.nameSong}</Text>
                <Text style={style.titleNameSong}> - </Text>
                <Text style={style.titleNameArtist}>{music.nameArtist}</Text>
              </View>
              <View style={{flexDirection:'row', flex: 1}}>
              <Context.Consumer>{(context) =>
                <FontAwesomeIcon
                  icon={
                    music._playing
                      ? faPlayCircle
                      : faPauseCircle
                  }
                  onPress={async () => {
                    music._playing
                      ? (music.pause(), context.setMusicPlaying(music))
                      : (music.play(), context.setMusicPlaying(music))
                  }}
                  style={style.iconPlayPause}
                  size={30}
                />
            }</Context.Consumer>
              </View>
            </View>
          </View>
      );
    } else {
      return <></>;
    }
  }
}

const style = StyleSheet.create({
  itemView: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 82,
    zIndex: 3
  },
  itemContent: {
    flexDirection: 'column',
    marginLeft:'auto',
    marginRight: 'auto',
  },
  img: {
    marginLeft: 20,
    height: 75,
    width: 75,
    borderRadius: 5,
  },
  titleNameSong: {
    marginTop: 'auto',
    marginBottom: 'auto',
    color: 'black',
    fontSize: 15,
  },
  titleNameArtist: {
    marginTop: 'auto',
    marginBottom: 'auto',
    color: 'black',
    fontSize: 15,
  },
  iconPlayPause: {
   
    color: '#C4C4C4',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});
