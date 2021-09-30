import React, {Component, useEffect} from 'react';
import {Text, Button, View, Image, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faUserCircle,
  faCommentDots,
  faEllipsisV,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import Slider from '@react-native-community/slider';
import { thisExpression } from '@babel/types';
const Sound = require('react-native-sound');

Sound.setCategory('Playback');

export default class FullMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      music: this.props.route.params.music,
      newMusic: {},
      timeDurarion: 0,
      currentTime: 0
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

  renderBotView(music) {
    return (
      <>
        <View style={styled.botPlay}>
          <Button title="Play" onPress={() => {
            this.state.newMusic._playing ? this.state.newMusic.stop() : this.state.newMusic.play()}
          }/>
          <Text>{this.state.timeDurarion}</Text>
          <Text>{this.state.currentTime}</Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={this.state.timeDurarion}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
        <Button title="+" />
        <Button title="-" />
      </>
    );
  }

  renderTopView(music) {
    console.log(this.state.newMusic);
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
    //const {music} = this.props.route.params;
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

