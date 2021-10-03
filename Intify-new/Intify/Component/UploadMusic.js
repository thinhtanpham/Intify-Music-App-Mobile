import React, {useState} from 'react';
// Import core components
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

// Import Document Picker
import DocumentPicker from 'react-native-document-picker';

const UploadMusic = () => {
  const [imgUpload, setImgUpload] = useState(null);
  const [mp3Upload, setMp3Upload] = useState(null);

  const uploadImage = async () => {
    if (imgUpload != null && mp3Upload !=null) {
      const data = new FormData();
      data.append('nameSong', "Chung ta khong thuoc ve nhau")
      data.append('nameArtist', "asdasdas")
      data.append('img', {
        'uri': imgUpload[0].uri,
        'type': imgUpload[0].type,
        'name': imgUpload[0].name
      });
      data.append('mp3',{
        'uri': mp3Upload[0].uri,
        'type': mp3Upload[0].type,
        'name': mp3Upload[0].name
      });
      try {
        const res= await fetch('http://10.0.2.2:3002/add/newSong', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            "type": "formData",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJha2FiYWthIiwiaWF0IjoxNjMzMjM2MjIzLCJleHAiOjE2MzMyMzY4MjN9.V3MVdPjPXvlSUfAVBmgsBwMyZJ5K_uby8kQpgAAmQSU',
          },
          body: data,
        })
        console.log(await res.json())
      } catch (error) {
        console.log(error)
      }
  }}

  const selectImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: DocumentPicker.types.images,
      });
      console.log('res : ' + JSON.stringify(res));
      setImgUpload(res);
    } catch (err) {
      console.log(err)
      }
    }

  const selectMp3 = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: DocumentPicker.types.audio,
      });
      console.log('res : ' + JSON.stringify(res));
      setMp3Upload(res);
    } catch (err) {
    console.log(err)
    }
  };
  return (
    <View style={styles.mainBody}>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectImage}>
        <Text style={styles.buttonTextStyle}>Select Image</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectMp3}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={uploadImage}>
        <Text style={styles.buttonTextStyle}>Upload File</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});

export default UploadMusic;
