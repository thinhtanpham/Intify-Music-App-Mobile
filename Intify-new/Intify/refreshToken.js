import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api'
const refreshToken = async () => {
  try {
    const asRefTk = await AsyncStorage.getItem('@storage_refreshToken')
    await fetch('http://'+api+':5000/refreshToken', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     token: asRefTk,
    }),
  })
    .then(async response => {
      const resJson = await response.json()
      const newAccessTk = resJson.accessToken
      try {
        await AsyncStorage.setItem('@storage_accessToken', newAccessTk)
      } catch (error) {
        console.log(error)
      }
    })
  .catch(error => console.log(error))
  } catch (error) {
    console.log(error)
  }
  
};

export default refreshToken;
