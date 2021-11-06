import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import InfomationUser from './UserComponent/InfomationUser';
import UploadMusic from './UserComponent/UploadMusic';
import {StatusBar} from 'react-native';
import MyUpload from './UserComponent/MyUpload';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faUserCircle, faUpload, faClipboardList, faList} from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();
export default class User extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          options={{
            headerShown: false,
            title: "User",
            tabBarIcon: () => <FontAwesomeIcon icon={faUserCircle} size={20} style={{color:"#5A8991"}}/>
          }}
          name="InformationUser"
          component={InfomationUser}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            title: "Upload",
            tabBarIcon: () => <FontAwesomeIcon icon={faUpload} size={20} style={{color:"#5A8991"}}/>
          }}
          name="UploadMusic"
          component={UploadMusic}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            title: "My List",
            tabBarIcon: () => <FontAwesomeIcon icon={faList} size={20} style={{color:"#5A8991"}}/>
          }}
          name="MyList"
          component={MyUpload}
        />
      </Tab.Navigator>
    );
  }
}
