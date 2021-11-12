import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const refreshToken = async () => {
  try {
    const asRefTk = await AsyncStorage.getItem('@storage_refreshToken')
    const ref = asRefTk
    await fetch('http://192.168.0.18:5000/refreshToken', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: ref
      })
    })
      .then(async response => {
        const resJson = await response.json();
        const newAccessTk = await resJson.accessToken;
        await AsyncStorage.setItem('@storage_accessToken',await newAccessTk);
      })
      // .catch(error => console.log('errr:' + error))
  } catch (error) {
    console.log(error);
  }
};

export default refreshToken;
