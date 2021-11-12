import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MusicItem from '../MusicItem';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import refreshToken from '../../refreshToken';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faWindowClose,
  faClosedCaptioning,
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';
import api from '../../api';

export default class MyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myMusic: [],
      status: false,
      musicChoose: {},
      refresh: false,
    };
  }

  async callApiMyList(){
    try {
      const asAccessTk = await AsyncStorage.getItem('@storage_accessToken');
      await fetch('http://'+api+':3002/account/mylist', {
        headers: {
          Authorization: 'Bearer ' + asAccessTk,
        },
      })
        .then(async response => {
          if (!response.ok) {
            refreshToken();
            try {
              const newAssTk = await AsyncStorage.getItem('@storage_accessToken');
              await fetch('http://'+api+':3002/account/mylist', {
                method: 'get',
                headers: {
                  Authorization: 'Bearer ' + newAssTk,
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

  async componentDidMount() {
    this.callApiMyList()
  }

  async deleteMusic(id) {
    Alert.alert('Delete', 'Do you want to delete this song?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: async () => {
          await fetch('http://'+api+':3002/delete/' + id, {
            method: 'delete',
          })
            .then(async () => this.callApiMyList()
              )
            .catch(error => console.log(error));
          this.setState({
            status: false,
            musicChoose: {},
          });
        },
      },
    ]);
  }

  renderSmallMusic(music) {
    this.setState({
      status: true,
      musicChoose: music,
    });
  }

  refreshList(){
    this.setState({
      refresh: !this.state.refresh
    })
    this.callApiMyList()
    setTimeout(() => {
      this.setState({
        refresh: !this.state.refresh
      })
    }, 2000);    
  }

  render() {
    return (
      <>
        <Modal
          isVisible={this.state.status}
          anmationType={'slide'}
          style={styles.modal}>
          <Image
            style={styles.imgDetail}
            source={{uri: this.state.musicChoose.img}}
          />
          <View style={styles.viewContent}>
            <View style={styles.areaInfo}>
              <Text style={styles.fieldInfo}>Name Song: </Text>
              <Text>{this.state.musicChoose.nameSong}</Text>
            </View>
            <View style={styles.areaInfo}>
              <Text style={styles.fieldInfo}>Name Artist: </Text>
              <Text>{this.state.musicChoose.nameArtist}</Text>
            </View>
            <View style={styles.areaInfo}>
              <Text style={styles.fieldInfo}>Day created: </Text>
              <Text>{this.state.musicChoose.createdAt}</Text>
            </View>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-around"}}>
            <TouchableOpacity
              style={styles.btnDelete}
              onPress={() => this.deleteMusic(this.state.musicChoose._id)}>
              <Text style={styles.textBtnDelete}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnClose}
              onPress={() =>
                this.setState({
                  status: false,
                })
              }>
              <Text style={styles.textBtnDelete}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Text style={styles.allList}>My Upload</Text>
          <View style={{flex: 0.95}}>
            <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={() => this.refreshList(this.state.refresh)}
              />
            }
            >
              {this.state.myMusic.length === 0 ? (
                <Text style={styles.nonMusic}>Oop : don't have upload</Text>
              ): (
                this.state.myMusic.map((music, index) => 
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
                )
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
  btnDelete: {
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#AD2A26',
    width: 100,
  },
  textBtnDelete: {
    textAlign: 'center',
    margin: 10,
    color: 'white',
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
    width: '93%',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 130,
    marginBottom: 130,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  viewContent: {
    marginTop: 20,
  },
  imgDetail: {
    height: 200,
    width: 200,
    marginBottom: 30,
    borderRadius: 10,
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
  areaInfo: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldInfo: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  btnClose: {
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    width: 100,
  },
});
