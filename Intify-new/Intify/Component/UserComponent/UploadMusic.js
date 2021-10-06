import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import refreshToken from '../../refreshToken';

const UploadMusic = () => {
  const [imgUpload, setImgUpload] = useState(null);
  const [mp3Upload, setMp3Upload] = useState(null);
  const [nameSong, setNameSong] = useState('');
  const [nameArtist, setNameArtist] = useState('');

  const uploadImage = async () => {
    if (imgUpload != null && mp3Upload != null) {
      const data = new FormData();
      data.append('nameSong', nameSong.nameSong);
      data.append('nameArtist', nameArtist.nameArtist );
      data.append('img', {
        uri: imgUpload[0].uri,
        type: imgUpload[0].type,
        name: imgUpload[0].name,
      });
      data.append('mp3', {
        uri: mp3Upload[0].uri,
        type: mp3Upload[0].type,
        name: mp3Upload[0].name,
      });
      try {
        const asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
        await fetch('http://10.0.2.2:3002/add/newSong', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          type: 'formData',
          authorization: 'Bearer ' + asAccessTk,
        },
        body: data,
      })
        .then(async response =>  {
        console.log("res1 :" + await response)
        })
        .catch(async () => { 
          console.log("token het han")
          refreshToken()
          console.log("Dang lay lai token")
          try {
            const asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
            await fetch('http://10.0.2.2:3002/add/newSong', {
            method: 'post',
            headers: {
              Accept: 'application/json',
              type: 'formData',
              authorization: 'Bearer ' + asAccessTk,
            },
            body: data,
          })
          .then(async response =>  {
            console.log("res2 :" + await response)
          })}
          catch(error){
            console.log(error)
          }
        }
        )
      } catch (error) {
        console.log(error);
      }
    }
  };

  const Logout = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/logout', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: await AsyncStorage.getItem('@storage_refreshToken'),
        }),
      });
      await AsyncStorage.removeItem('@storage_refreshToken');
      await AsyncStorage.removeItem('@storage_accessToken');
      console.log(await AsyncStorage.getItem('@storage_accessToken'));
    } catch (error) {
      console.log(error);
    }
  };

  const selectImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: DocumentPicker.types.images,
      });
      setImgUpload(res);
    } catch (err) {
      console.log(err);
    }
  };

  const selectMp3 = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: DocumentPicker.types.audio,
      });
      setMp3Upload(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.mainBody}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="name-song"
          underlineColorAndroid="transparent"
          onChangeText={nameSong => setNameSong({nameSong})}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="name-artist"
          underlineColorAndroid="transparent"
          onChangeText={nameArtist => setNameArtist({nameArtist})}
        />
      </View>

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
      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={() => Logout()}>
        <Text>Logout</Text>
      </TouchableHighlight>
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
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
});

export default UploadMusic;
