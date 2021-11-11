import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';

export default class UserItem extends Component {
  render() {
    const {artist, navigation} = this.props;
    return (
      <TouchableOpacity onPress={()=> {
        navigation.push('ListMusicsArtist', artist)
        }} >
      <View style={styles.view}>
        {artist.imgArtist ? (
          <Image
            style={styles.imgAvaBac}
            source={{uri: artist.imgArtist}}
            blurRadius={100}></Image>
        ) : (
          <FontAwesomeIcon
            style={styles.avatar}
            icon={faUserCircle}
            size={150}
          />
        )}
        <Image style={styles.imgAvaBac2} source={{uri: artist.imgArtist}} blurRadius={20}></Image>
        <Image style={styles.imgAva} source={{uri: artist.imgArtist}}></Image>
        <Text style={styles.name}>{artist.nameApp}</Text>
      </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    marginBottom: 'auto',
    marginTop: 'auto',
    height: 200,
    width: 200,
    marginLeft: 20,
    marginRight: 10,
  },
  avatar: {
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#307ecc',
  },
  name: {
    position: 'absolute',
    marginTop: -13,
    shadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius:10,
    marginLeft: 20,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imgAva: {
    height: 152,
    width: 152,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 50,
    marginRight: 'auto',
  },
  imgAvaBac: {
    position: 'absolute',
    height: 172,
    width: 172,
    top: -10,
    left: 10,
    opacity: 0.2,
    borderWidth: 2,
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  imgAvaBac2: {
    position: 'absolute',
    height: 162,
    width: 162,
    top: 5,
    left: 30,
    opacity: 0.3,
    borderWidth: 2,
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
