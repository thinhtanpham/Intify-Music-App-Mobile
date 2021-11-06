import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

export default class StatusModal extends Component {
  render() {
    const {status, stateUpload} = this.props;
    return (
      <View>
        <Modal isVisible={status} anmationType={'slide'} style={styles.modal}>
          {stateUpload ? (
            <View style={styles.viewContent}>
              <Text style={styles.success}>Upload Successfull</Text>
            </View>
          ) : (
            <View style={styles.viewContent}>
              <Text style={styles.fail}>Upload Failed</Text>
            </View>
          )}
        </Modal>
      </View>
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
  success:{
    color: "#548781",
    fontSize: 24
  },
  fail: {
    color: '#AD2A26',
    fontSize: 24,
  }
});
