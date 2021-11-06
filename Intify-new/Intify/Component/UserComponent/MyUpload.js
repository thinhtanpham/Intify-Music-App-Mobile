import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import MusicItem from '../MusicItem';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import refreshToken from '../../refreshToken';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';

export default class MyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myMusic: [],
      status: false,
      musicChoose: {},
    };
  }

  async componentDidMount() {
    try {
      const asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
      await fetch('http://10.0.2.2:3002/account/mylist', {
        headers: {
          Authorization: 'Bearer ' + asAccessTk,
        },
      })
        .then(async response => {
          if (!response.ok) {
            refreshToken();
            try {
              asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
              await fetch('http://10.0.2.2:3002/account/mylist', {
                method: 'get',
                headers: {
                  Authorization: 'Bearer ' + asAccessTk,
                },
              }).then(async response => {
                const json = await response.json();
                this.setState({
                  myMusic: json.music,
                });
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            const json = await response.json();
            this.setState({
              myMusic: json.music,
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMusic(id) {
    await fetch('http://10.0.2.2:3002/delete/' + id, {
      method: 'delete',
    })
      .then(async () => {
        try {
          const asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
          await fetch('http://10.0.2.2:3002/account/mylist', {
            headers: {
              Authorization: 'Bearer ' + asAccessTk,
            },
          })
            .then(async response => {
              if (!response.ok) {
                refreshToken();
                try {
                  asAccessTk = await AsyncStorage.getItem(
                    '@storage_accessToken',
                  );
                  await fetch('http://10.0.2.2:3002/account/mylist', {
                    method: 'get',
                    headers: {
                      Authorization: 'Bearer ' + asAccessTk,
                    },
                  }).then(async response => {
                    const json = await response.json();
                    this.setState({
                      myMusic: json.music,
                    });
                  });
                } catch (error) {
                  console.log(error);
                }
              } else {
                const json = await response.json();
                this.setState({
                  myMusic: json.music,
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      })
      .catch(error => console.log(error));
    this.setState({
      status: false,
      musicChoose: {},
    });
  }

  renderSmallMusic(music) {
    this.setState({
      status: true,
      musicChoose: music,
    });
  }

  render() {
    return (
      <>
        <Modal
          isVisible={this.state.status}
          anmationType={'slide'}
          style={styles.modal}>
          <FontAwesomeIcon
            icon={faWindowClose}
            onPress={() =>
              this.setState({
                status: false,
              })
            }
          />
          <Image
            style={styles.imgDetail}
            source={{uri: this.state.musicChoose.img}}
          />
          <View style={styles.viewContent}>
            <Text>Name Song: {this.state.musicChoose.nameSong}</Text>
            <Text>Name Artist: {this.state.musicChoose.nameArtist}</Text>
            <Text>Day created: {this.state.musicChoose.createdAt}</Text>
          </View>
          <Button
            title="delete"
            onPress={() =>
              this.deleteMusic(this.state.musicChoose._id)
            }></Button>
        </Modal>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Text style={styles.allList}>My Upload</Text>
          <View style={{flex: 0.95}}>
            <ScrollView>
              {this.state.myMusic.length === 0 ? (
                <Text style={styles.nonMusic}>Oop : U don't have upload</Text>
              ) : (
                this.state.myMusic.map((music, index) => (
                  <TouchableOpacity
                    key={index}
                    onLongPress={() => this.renderSmallMusic(music)}
                    delayLongPress={1000}>
                    <View style={styles.itemView}>
                      <View>
                        <Image
                          source={{uri: music.img}}
                          style={styles.img}></Image>
                      </View>
                      <View style={styles.itemContent}>
                        <Text style={styles.titleNameSong}>
                          {music.nameSong}
                        </Text>
                        <Text style={styles.titleNameArtist}>
                          {music.nameArtist}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  bottomArea: {
    flex: 6,
    marginLeft: 5,
    marginRight: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  topArea: {
    flex: 5,
  },
  scrollView: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '99.5%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  allList: {
    fontSize: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    marginTop: 20,
    color: 'black',
  },
  itemView: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 3,
    width: 378,
    height: 90,
  },
  itemContent: {
    flexDirection: 'column',
    margin: 5,
    top: 14,
    left: 14,
  },
  img: {
    top: 8,
    left: 10,
    height: 80,
    width: 80,
    borderRadius: 5,
  },
  titleNameSong: {
    color: 'black',
    fontSize: 20,
  },
  titleNameArtist: {
    color: 'black',
    fontSize: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
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
  imgDetail: {
    height: 200,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  closeModal: {
    height: 20,
    width: 20,
    backgroundColor: 'red',
  },
  nonMusic: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 20,
  },
});
