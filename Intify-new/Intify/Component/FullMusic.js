import React, {Component} from 'react';
import {Text, Button, View, Image, StyleSheet, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import {Overlay} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faStepBackward,
  faStepForward,
  faPauseCircle,
  faPlayCircle,
  faEllipsisV,
  faHeart,
  faVolumeUp,
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
      visible: false,
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
    systemSetting.setVolume(index);
  }

  statusMusic(status, value) {
    this.setState(
      {
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
          <View style={{flex: 2, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'row', marginLeft: 50}}>
              <FontAwesomeIcon
                icon={faVolumeUp}
                size={20}
                onPress={() => {
                  this.setState({
                    visible: !this.state.visible,
                  });
                  setTimeout(() => {
                    this.setState({
                      visible: !this.state.visible,
                    });
                  }, 4000);
                }}
                style={styled.iconVolume}
              />
              {this.state.visible ? (
                <View
                  style={styled.modal}
                  animationType={'fade'}
                  transparent={true}
                  visible={this.state.visible}
                >
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: 30,
                      width: 175,
                      borderRadius: 15,
                    }}>
                    <Slider
                      style={styled.sliderVolume}
                      minimumValue={0}
                      maximumValue={1}
                      value={0.5}
                      step={0.1}
                      onValueChange={value => this.changedVolume(value)}
                      minimumTrackTintColor="#243039"
                      maximumTrackTintColor="#000000"
                    />
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
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

         
          <View style={{flexDirection: 'row', flex: 2}}>
            <FontAwesomeIcon
              icon={faStepBackward}
              style={styled.iconPlayPause}
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
            <FontAwesomeIcon
              icon={faStepForward}
              style={styled.iconPlayPause}
              size={30}
            />
          </View>
          <View style={{flex: 1, backgroundColor: 'orange'}}></View>
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
  iconVolume:{
    marginTop: 30,
    color: '#C4C4C4',
    marginTop: 'auto',
    marginBottom: 'auto',
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
  sliderVolume: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    width: 150,
    height: 40,
  },
  sliderView: {
    flex: 1,
  },
  modal: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 10,
    height: 30,
    margin: 0,
  },
});
