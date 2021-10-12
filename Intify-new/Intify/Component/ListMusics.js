import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native';
import getListMusic from '../Server';
import MusicItem from './MusicItem';
import LinearGradient from 'react-native-linear-gradient';
import FullMusic from './FullMusic';
import {connect} from 'react-redux';
import {thisExpression} from '@babel/types';
import SmallPlaying from './Modal-Overlays/SmallPlaying';

class ListMusics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicsList: [],
    };
  }

  componentDidMount() {
    getListMusic()
      .then(json => {
        this.setState({musicsList: json.musics});
      })
      .catch(err => consoloe.log(err));
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#364855', zIndex: 0}}>
        <View style={styled.topArea}></View>
        <View style={styled.bottomArea}>
          <Text style={styled.allList}>All List</Text>
          <LinearGradient
            colors={['#FFFFFF15', '#FFFFFF01']}
            style={styled.scrollView}>
            <ScrollView>
              {this.state.musicsList.map((music, index) => (
                <MusicItem navigation={navigation} music={music} key={index} />
              ))}
            </ScrollView>
          </LinearGradient>
          <SmallPlaying isPlaying={this.props.isPlaying}/>
        </View>
      </View>
    );
  }
}

const styled = StyleSheet.create({
  bottomArea: {
    flex: 6,
    marginLeft: 5,
    marginRight: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  topArea: {
    flex: 5,
    //backgroundColor: "orange"
  },
  scrollView: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '99.5%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  allList: {
    fontSize: 30,
    color: 'white',
  },
});

const mapStateToProps = state => {
  return {
    isPlaying: state.isPlayingReducer.isPlaying,
  };
};



export default connect(mapStateToProps)(ListMusics);
