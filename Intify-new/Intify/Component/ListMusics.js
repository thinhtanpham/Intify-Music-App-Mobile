import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Text, RefreshControl, StatusBar} from 'react-native';
import getListMusic from '../Server';
import MusicItem from './MusicItem';
import LinearGradient from 'react-native-linear-gradient';
import FullMusic from './FullMusic';
import {connect} from 'react-redux';
import {thisExpression} from '@babel/types';
import SmallPlaying from './Modal-Overlays/SmallPlaying';
import Context from './Context'
import SplashScreen from './SplashScreen';
import UserItem from './UserItem';
import { combineReducers } from 'redux';
import api from '.././api'

export default class ListMusics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicsList: [],
      artistsList: [],
      music: {},
      refresh: false
    };
  }

  callApiMyList() {
    getListMusic()
    .then(json => {
      this.setState({musicsList: json.musics});
    })
    .catch(err => consoloe.log(err));
  }

  async componentDidMount() {
    this.callApiMyList()
    try {
      await fetch('http://'+ api +':3002/artists')
      .then(async res => {
        const resJson = await res.json()
        this.setState({
          artistsList: resJson.artists
        })
      })
      .catch(error => console.error(error))
    } catch (error) {
      console.error(error);
    }
  }

  refreshList(){
    this.setState({
      refresh: !this.state.refresh
    })
    this.callApiMyList()
    setTimeout(() => {
      this.setState({
        refresh: !this.state.refresh
      })
    }, 2000);    
  }

  render() {
    const {navigation} = this.props;
    return (
      this.state.musicsList.length > 0 ? 
      <View style={{flex: 1, backgroundColor: '#364855'}}>
        <StatusBar hidden={false}  animated={true}
        backgroundColor="#243039"/>
        <View style={styled.topArea}>
          <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
            {this.state.artistsList.map((artist, index) => 
              <UserItem navigation={navigation} key={index} artist={artist}/>
            )}
          </ScrollView>
        </View>
        <View style={styled.bottomArea}>
          <Text style={styled.allList}>All List</Text>
          <LinearGradient
            colors={['#FFFFFF15', '#FFFFFF01']}
            style={styled.scrollView}>
            <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={() => this.refreshList(this.state.refresh)}
              />
            }>
              {this.state.musicsList.map((music, index) => (
                <MusicItem navigation={navigation} music={music} key={index} />
              ))}
            </ScrollView>
          </LinearGradient>
        </View>
        <Context.Consumer>{context => <SmallPlaying music={context.isPlaying}/>}
        </Context.Consumer>
      </View>
      :
      <SplashScreen></SplashScreen>
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
    flex: 4,
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


