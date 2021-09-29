import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native';
import getListMusic from '../Server';
import MusicItem from './MusicItem';
import LinearGradient from 'react-native-linear-gradient';

export default class ListMusics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicsList: [],
    };
  }

    componentDidMount(){
        getListMusic()
        .then(json => {
          this.setState({ musicsList: json.musics}
          )})
        .catch(err => consoloe.log(err))
    }

  render() {
    const {navigation} = this.props   
    return (
      <View style={{height: "100%", backgroundColor:"#243039"}}>
      <View style={styled.bottomArea}>
      <Text>All List</Text>
      <LinearGradient colors={['#FFFFFF15', '#FFFFFF01']} style={styled.scrollView}>
      <ScrollView >
        {this.state.musicsList.map((music, index) => <MusicItem navigation={navigation}  music={music} key={index}/>
        )}
      </ScrollView>
      </LinearGradient>
      </View>
      </View>
    );
  }
}

const styled = StyleSheet.create({
  bottomArea: {
        top: 330,
        marginLeft: "auto",
        marginRight: "auto",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    scrollView: {
      height: 475,
      width: 400,
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5
    }
})