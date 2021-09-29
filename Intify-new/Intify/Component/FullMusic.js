import React, {Component} from 'react';
import {Text, Button, View, Image, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faUserCircle,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';

// import TrackPlayer, {
//   Capability,
//   Event,
//   RepeatMode,
//   State,
//   usePlaybackState,
//   useProgress,
//   useTrackPlayerEvents,
// } from 'react-native-track-player';

export default class FullMusic extends Component {
  //   constructor(props){
  //       super(props)
  //       this.state({
  //           music: this.props.music
  //       })
  //   }
  // setupPlayer = async () => {
  //   await TrackPlayer.setupPlayer();
  //   await TrackPlayer.add();
  // };

  // togglePlayBack = async playbackState => {
  //   const currentTrack = await TrackPlayer.getCurrentTrack();
  //   if (currentTrack !== null) {
  //     if (playbackState === State.Paused) {
  //       await TrackPlayer.play();
  //     } else {
  //       await TrackPlayer.pause();
  //     }
  //   }
  // };

  renderBotView(music) {
    return (
      <>
        <View style={styled.botPlay}></View>
      </>
    );
  }

  renderTopView(music) {
    return (
      <>
        <View style={styled.header}>
          <FontAwesomeIcon icon={faArrowLeft} style={styled.icon}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faUserCircle} style={styled.icon}></FontAwesomeIcon>
        </View>
        <Image source={{uri: music.img}} style={styled.img}></Image>
        <View style={{flex:1, backgroundColor:"orange"}}>
          <FontAwesomeIcon icon={faCommentDots} />
            <Text>{music.nameSong}</Text>
            <Text>{music.nameArtist}</Text>
          {/* <FontAwesomeIcon icon={fa} /> */}
        </View>
      </>
    );
  }

  render() {
    const {music} = this.props.route.params;
    return (
      <View style={styled.main}>
        <View style={styled.viewTop}>{this.renderTopView(music)}</View>
        <View style={styled.viewBot}>{this.renderBotView(music)}</View>
      </View>
    );
  }
}

const styled = StyleSheet.create({
  header:{
    flex: 1,
    flexDirection: "row",
    backgroundColor:"orange"
  },
  main: {
    flex: 1,
    backgroundColor: '#243039',
    justifyContent: 'space-around',
  },
  img: {
    flex: 2,
    // height: 300,
    width: 300,
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  viewTop: {
    flex: 1,
  },
  viewBot: {
    flex: 1,
    justifyContent: 'flex-end',
    height: 335,
  },
  botPlay: {
    width: '97%',
    flex: 0.9,
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: 'rgba(96, 103, 109, 0.56)',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  icon:{
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 50,
    color: "black"
  }
});
