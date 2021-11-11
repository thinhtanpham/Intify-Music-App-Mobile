import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

export default class StatusModal extends Component {
  render() {
    const {status, stateUpload} = this.props;
    return (
     
        <Modal isVisible={status} animationIn="fadeIn" style={styles.modal}>
          <View style={styles.viewContent}>
            {stateUpload === 'Upload Failed' ? (
              <Text style={styles.fail}>{stateUpload}</Text>
            ) : (
              <Text style={styles.success}>{stateUpload}</Text>
            )}
          </View>
        </Modal>
      
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    width: 350,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 250,
    marginBottom: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  viewContent: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  success: {
    color: '#548781',
    fontSize: 24,
  },
  fail: {
    color: '#AD2A26',
    fontSize: 24,
  },
});
