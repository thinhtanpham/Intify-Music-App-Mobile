import AsyncStorage from '@react-native-async-storage/async-storage';

const refreshToken = async () => {
  try {
    const asRefTk = await AsyncStorage.getItem('@storage_refreshToken')
    await fetch('http://10.0.2.2:5000/refreshToken', {
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
    .catch(error => console.log(error));
  } catch (error) {
    console.log(error)
  }
  
};

export default refreshToken;
