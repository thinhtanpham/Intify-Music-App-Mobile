import React, { Component } from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'

export default class SplashScreen extends Component {

    render() {
        return (
            <View style={styles.screen}>
                <Image style={styles.logo} source={require('./src/img/logo1.png')}></Image>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    screen:{
        flex: 1,
        backgroundColor: '#364855'
    },
    logo:{
        height: 300,
        width: 300,
        marginBottom: "auto",
        marginTop: "auto",
        marginLeft: "auto",
        marginRight: "auto"
    }
})