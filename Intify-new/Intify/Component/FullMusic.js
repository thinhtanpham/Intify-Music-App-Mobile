import React, {Component} from 'react';
import {Text, Button, View, Image, StyleSheet, FlatList} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faStepBackward,
  faStepForward,
  faPauseCircle,
  faPlayCircle,
  faEllipsisV,
  faHeart,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons';
import Slider from '@react-native-community/slider';
import systemSetting from 'react-native-system-setting';
const Sound = require('react-native-sound');

Sound.setCategory('Playback');

export default class FullMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      music: this.props.route.params.music || this.props.music,
      newMusic: {},
      timeDurarion: 0,
      currentTime: 0,
      setTime: {},
      status: true,
    };
  }

  componentDidMount() {
    const newMusic = new Sound(this.state.music.mp3, Sound.MAIN_BUNDLE, err => {
      if (err) {
        consoloe.log(err);
      } else {
        this.setState({
          newMusic: newMusic,
          timeDurarion: newMusic.getDuration(),
        });
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.setTime);
  }

  convertTime(time) {
    const mn = Math.floor(time / 60);
    const sc = time % 60;
    return mn + ':' + sc;
  }
  changedVolume(index) {
    systemSetting
      .getVolume()
      .then(volume => systemSetting.setVolume(volume + index));
  }

  statusMusic(status, value) {
    this.setState({
        status: status,
      },
      () => {
        const {newMusic} = this.state;
        if (status) {
          clearInterval(this.state.setTime);
          newMusic.setCurrentTime(value);
          newMusic.play();
          this.state.setTime = setInterval(() => {
            newMusic.getCurrentTime(second => {
              this.setState({
                currentTime: second,
              });
            });
          }, 1000);
        } else {
          newMusic.pause();
          clearInterval(this.state.setTime);
          newMusic.setCurrentTime(value);
          newMusic.getCurrentTime(second => {
            this.setState({
              currentTime: second,
            });
          });
        }
      },
    );
  }

  renderBotView(music) {
    return (
      <>
        <View style={styled.botPlay}>
          <View style={{backgroundColor: "orange", flex: 2}}>

          </View>

          <View style={styled.sliderView}>
            <Slider
              style={styled.slider}
              minimumValue={0}
              maximumValue={this.state.timeDurarion}
              value={this.state.currentTime}
              onValueChange={value =>
                this.statusMusic(this.state.status, value)
              }
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
            <View style={styled.timeView}>
              <Text>{this.convertTime(parseInt(this.state.currentTime))}</Text>
              <Text>{this.convertTime(parseInt(this.state.timeDurarion))}</Text>
            </View>
          </View>

          {/* <Button title="+" onPress={() => this.changedVolume(0.1)} />
          <Button title="-" onPress={() => this.changedVolume(-0.1)} /> */}
          <View style={{flexDirection: 'row', flex: 2}}>
            <FontAwesomeIcon icon={faStepBackward} style={styled.iconPlayPause}
              size={30}
              />
            <FontAwesomeIcon
              icon={this.state.newMusic._playing ? faPauseCircle : faPlayCircle}
              onPress={() => {
                this.state.newMusic._playing
                  ? this.statusMusic(false, this.state.currentTime)
                  : this.statusMusic(true, this.state.currentTime);
              }}
              style={styled.iconPlayPause}
              size={40}
            />
            <FontAwesomeIcon icon={faStepForward} style={styled.iconPlayPause}
              size={30}
              />
          </View>

          <View style={{flex: 1, backgroundColor:"orange"}}>

          </View>
          {/* <FontAwesomeIcon icon={faPlayCircle}/> */}
        </View>
      </>
    );
  }

  renderTopView(music) {
    return (
      <>
        <View style={styled.header}>
          <Image source={{uri: music.img}} style={styled.img}></Image>
        </View>
        <View style={styled.title}>
          <FontAwesomeIcon icon={faEllipsisV} style={styled.icon} size={20} />
          <View>
            <Text style={styled.titleNameSong}>{music.nameSong}</Text>
            <Text style={styled.titleNameArtist}>{music.nameArtist}</Text>
          </View>
          <FontAwesomeIcon icon={faHeart} style={styled.icon} size={20} />
        </View>
      </>
    );
  }

  render() {
    const {music} = this.state;
    return (
      <View style={styled.main}>
        <View style={styled.viewTop}>{this.renderTopView(music)}</View>
        <View style={styled.viewBot}>{this.renderBotView(music)}</View>
      </View>
    );
  }
}

const styled = StyleSheet.create({
  header: {
    flex: 8,
    marginTop: 20,
  },
  title: {
    flex: 2,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  main: {
    flex: 1,
    backgroundColor: '#364855',
    justifyContent: 'space-around',
  },
  img: {
    height: '100%',
    width: 250,
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
  icon: {
    marginTop: 30,
    color: '#C4C4C4',
  },
  iconPlayPause: {
    marginTop: 30,
    color: '#C4C4C4',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titleNameSong: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  titleNameArtist: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  slider: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 319,
    height: 40,
  },
  sliderView:{
    flex:1,
  }
});

// import React, {useState, useEffect} from 'react';
// import {Text, Button, View, Image, StyleSheet} from 'react-native';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {
//   faArrowLeft,
//   faUserCircle,
//   faCommentDots,
//   faEllipsisV,
//   faHeart,
// } from '@fortawesome/free-solid-svg-icons';
// import Slider from '@react-native-community/slider';
// const Sound = require('react-native-sound');

// Sound.setCategory('Playback');

// export default function FullMusic(props) {
//   // const state = {
//   //  music: this.props.route.params.music,
//   //   newMusic: {},
//   //   timeDurarion: 0,
//   //   currentTime: 0
//   // }

//   const [music, setMusic] = useState(props.route.params.music);
//   const [newMusic, setNewMusic] = useState();
//   const [timeDurarion, setTimeDuration] = useState();
//   const [currentTime, setCurrentTime] = useState();

//   // const useVCo= () => {

//   // }

//   useEffect(() => {
//     const nMusic = new Sound(music.mp3, Sound.MAIN_BUNDLE, err => {
//       if (err) {
//         consoloe.log(err);
//         return err;
//       }
//     })
//     setNewMusic(nMusic)
//     console.log(newMusic)
//     setTimeDuration(newMusic)
//   }, [])

//   const renderBotView = (music) => {
//     return (
//       <>
//         <View style={styled.botPlay}>
//           <Button
//             title="Play"
//             onPress={() => {
//               newMusic._playing
//                 ? newMusic.stop()
//                 : newMusic.play();
//             }}
//           />
//           <Text>{timeDurarion}</Text>
//           <Text>{currentTime}</Text>
//           <Slider
//             style={{width: 200, height: 40}}
//             minimumValue={0}
//             maximumValue={timeDurarion}
//             minimumTrackTintColor="#FFFFFF"
//             maximumTrackTintColor="#000000"
//           />
//         </View>
//         <Button title="+" />
//         <Button title="-" />
//       </>
//     );
//   };

//   const renderTopView = music => {
//     return (
//       <>
//         <View style={styled.header}>
//           <Image source={{uri: music.img}} style={styled.img}></Image>
//         </View>
//         <View style={styled.title}>
//           <FontAwesomeIcon icon={faEllipsisV} style={styled.icon} size={20} />
//           <View>
//             <Text style={styled.titleNameSong}>{music.nameSong}</Text>
//             <Text style={styled.titleNameArtist}>{music.nameArtist}</Text>
//           </View>
//           <FontAwesomeIcon icon={faHeart} style={styled.icon} size={20} />
//         </View>
//       </>
//     );
//   };

//   return (
//     <View style={styled.main}>
//       <View style={styled.viewTop}>{renderTopView(music)}</View>
//       <View style={styled.viewBot}>{renderBotView(music)}</View>
//     </View>
//   );
// }

// const styled = StyleSheet.create({
//   header: {
//     flex: 8,
//     marginTop: 20,
//   },
//   title: {
//     flex: 2,
//     marginTop: 30,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   main: {
//     flex: 1,
//     backgroundColor: '#364855',
//     justifyContent: 'space-around',
//   },
//   img: {
//     height: '100%',
//     width: 250,
//     borderRadius: 5,
//     marginLeft: 'auto',
//     marginRight: 'auto',
//   },
//   viewTop: {
//     flex: 1,
//   },
//   viewBot: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     height: 335,
//   },
//   botPlay: {
//     width: '97%',
//     flex: 0.9,
//     marginRight: 'auto',
//     marginLeft: 'auto',
//     backgroundColor: 'rgba(96, 103, 109, 0.56)',
//     borderTopRightRadius: 10,
//     borderTopLeftRadius: 10,
//   },
//   icon: {
//     marginTop: 30,
//     color: '#C4C4C4',
//   },
//   titleNameSong: {
//     textAlign: 'center',
//     color: 'white',
//     fontSize: 20,
//   },
//   titleNameArtist: {
//     textAlign: 'center',
//     color: 'white',
//     fontSize: 15,
//   },
// });
