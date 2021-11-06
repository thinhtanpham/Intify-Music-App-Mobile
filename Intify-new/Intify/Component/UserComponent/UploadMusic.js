import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableHighlight,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import refreshToken from '../../refreshToken';
import fs from 'react-native-fs';
import StatusModal from './StatusModal';

const UploadMusic = () => {
  const [imgUpload, setImgUpload] = useState(null);
  const [mp3Upload, setMp3Upload] = useState(null);
  const [nameSong, setNameSong] = useState('');
  const [nameArtist, setNameArtist] = useState('');
  const [stateUpload, setStateUpload] = useState(false);
  const [status, setStatus] = useState(false);
  const [nullField, setNullField] = useState(false);

  const uploadSong = async (e) => {
    if (imgUpload != null && mp3Upload != null && nameSong != null && nameArtist!= null) {
      const data = new FormData();
      data.append('nameSong', nameSong.nameSong);
      data.append('nameArtist', nameArtist.nameArtist);
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
          .then(async response => {
            setStateUpload(true);
            setStatus(true)
            e.persist()
            setTimeout(() => setStatus(false)
            , 5000)
          })
          .catch(async () => {
            console.log('token het han');
            refreshToken();
            console.log('Dang lay lai token');
            try {
              const asAccessTk = await AsyncStorage.getItem(
                '@storage_accessToken',
              );
              await fetch('http://10.0.2.2:3002/add/newSong', {
                method: 'post',
                headers: {
                  Accept: 'application/json',
                  type: 'formData',
                  authorization: 'Bearer ' + asAccessTk,
                },
                body: data,
              }).then(() => {
                setStateUpload(true);
                setStatus(true)
                e.persist()
                setTimeout(() => setStatus(false)
                , 3000)
              });
            } catch (error) {
              setStateUpload(false);
              setStatus(true)
              e.persist()
              setTimeout(() => setStatus(false)
              , 5000)
            }
          });
      } catch (error) {
        setStateUpload(false);
              setStatus(true)
              e.persist()
              setTimeout(() => setStatus(false)
              , 5000)
      }
    }
    else{
      setNullField(true)
      e.persist()
      setTimeout(() => setNullField(false)
      , 5000)
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
      {stateUpload ? <StatusModal status={status} stateUpload={stateUpload}/> : <StatusModal status={status} stateUpload={stateUpload}/>}
      <View style={{justifyContent:'center'}}>
        {nullField ? <Text style={styles.textErr}>* Not null field</Text> : <Text style={styles.textErr}></Text>}
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
        onPress={uploadSong}>
        <Text style={styles.buttonTextStyle}>Upload File</Text>
      </TouchableOpacity>
    </View>
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
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 10,
    flexDirection: 'row',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  inputs: {
    height: 45,
    marginLeft: 12,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  textErr: {
    height: 20,
    color: 'red',
    marginLeft: 'auto',
    marginRight:'auto'
  }
});

export default UploadMusic;
